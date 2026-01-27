<?php
/**
 * OpenAI-Compatible Chat Completions API with Streaming Support
 * Powered by Ollama
 * 
 * Endpoint: POST /v1/chat/completions
 * Supports streaming via Server-Sent Events (SSE)
 */

error_reporting(0);
ini_set('display_errors', 0);
ini_set('log_errors', 1);

// CORS headers
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type, Authorization');

// Handle preflight
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit;
}

// Only allow POST
if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    header('Content-Type: application/json; charset=utf-8');
    echo json_encode([
        'error' => [
            'message' => 'Method not allowed. Use POST.',
            'type' => 'invalid_request_error'
        ]
    ]);
    exit;
}

try {
    // Parse request body
    $body = file_get_contents('php://input');
    $request = json_decode($body, true);
    
    if (json_last_error() !== JSON_ERROR_NONE) {
        throw new Exception('Invalid JSON in request body');
    }
    
    // Extract parameters
    $messages = $request['messages'] ?? [];
    $model = $request['model'] ?? 'gpt-3.5-turbo';
    $temperature = $request['temperature'] ?? 0.7;
    $max_tokens = $request['max_tokens'] ?? null;
    $stream = $request['stream'] ?? false;
    
    if (empty($messages)) {
        throw new Exception('messages parameter is required');
    }
    
    // Map OpenAI models to Ollama models
    $modelMap = [
        'gpt-3.5-turbo' => 'llama3.2',
        'gpt-3.5-turbo-instruct' => 'llama3.2',
        'gpt-3.5-turbo-16k' => 'llama3.2',
        'gpt-4' => 'llama3.2:70b',
        'gpt-4-turbo' => 'llama3.2:70b',
        'gpt-4-turbo-preview' => 'llama3.2:70b',
        'gpt-4o' => 'llama3.2:70b',
        'gpt-4o-mini' => 'llama3.2',
        'text-davinci-003' => 'llama3.2',
    ];
    
    $ollamaModel = $modelMap[$model] ?? 'llama3.2';
    
    // Convert messages to prompt format
    $prompt = convertMessagesToPrompt($messages);
    
    // Prepare Ollama request
    $ollamaRequest = [
        'model' => $ollamaModel,
        'prompt' => $prompt,
        'stream' => $stream, // Enable streaming if requested
        'options' => [
            'temperature' => floatval($temperature)
        ]
    ];
    
    if ($max_tokens !== null) {
        $ollamaRequest['options']['num_predict'] = intval($max_tokens);
    }
    
    if ($stream) {
        // Handle streaming response
        handleStreamingResponse($ollamaRequest, $model);
    } else {
        // Handle non-streaming response
        handleNonStreamingResponse($ollamaRequest, $model);
    }
    
} catch (Exception $e) {
    if ($stream ?? false) {
        // Send error as SSE
        header('Content-Type: text/event-stream; charset=utf-8');
        echo "data: " . json_encode([
            'error' => [
                'message' => $e->getMessage(),
                'type' => 'server_error',
                'code' => 'internal_error'
            ]
        ], JSON_UNESCAPED_SLASHES | JSON_UNESCAPED_UNICODE) . "\n\n";
        echo "data: [DONE]\n\n";
    } else {
        http_response_code(500);
        header('Content-Type: application/json; charset=utf-8');
        echo json_encode([
            'error' => [
                'message' => $e->getMessage(),
                'type' => 'server_error',
                'code' => 'internal_error'
            ]
        ], JSON_UNESCAPED_SLASHES | JSON_UNESCAPED_UNICODE);
    }
}

/**
 * Handle streaming response
 */
function handleStreamingResponse($ollamaRequest, $openaiModel) {
    // Set SSE headers
    header('Content-Type: text/event-stream; charset=utf-8');
    header('Cache-Control: no-cache');
    header('Connection: keep-alive');
    header('X-Accel-Buffering: no'); // Disable nginx buffering
    
    // Generate unique ID for this completion
    $completionId = 'chatcmpl-' . generateId();
    $created = time();
    
    // Initialize counters
    $promptTokens = 0;
    $completionTokens = 0;
    $fullResponse = '';
    
    // Call Ollama with streaming
    $ch = curl_init('http://127.0.0.1:11434/api/generate');
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, false);
    curl_setopt($ch, CURLOPT_POST, true);
    curl_setopt($ch, CURLOPT_POSTFIELDS, json_encode($ollamaRequest));
    curl_setopt($ch, CURLOPT_HTTPHEADER, ['Content-Type: application/json']);
    curl_setopt($ch, CURLOPT_TIMEOUT, 180);
    curl_setopt($ch, CURLOPT_CONNECTTIMEOUT, 10);
    curl_setopt($ch, CURLOPT_WRITEFUNCTION, function($ch, $data) use (&$fullResponse, &$promptTokens, &$completionTokens, $completionId, $created, $openaiModel) {
        // Parse each chunk from Ollama
        $lines = explode("\n", $data);
        
        foreach ($lines as $line) {
            $line = trim($line);
            if (empty($line)) continue;
            
            $chunk = json_decode($line, true);
            if (json_last_error() !== JSON_ERROR_NONE) continue;
            
            // Extract token count from first chunk
            if (isset($chunk['prompt_eval_count']) && $promptTokens === 0) {
                $promptTokens = $chunk['prompt_eval_count'];
            }
            
            // Extract response text
            $delta = $chunk['response'] ?? '';
            if (!empty($delta)) {
                $fullResponse .= $delta;
                $completionTokens++;
                
                // Format as OpenAI SSE
                $sseData = [
                    'id' => $completionId,
                    'object' => 'chat.completion.chunk',
                    'created' => $created,
                    'model' => $openaiModel,
                    'choices' => [
                        [
                            'index' => 0,
                            'delta' => [
                                'content' => $delta
                            ],
                            'finish_reason' => null
                        ]
                    ]
                ];
                
                echo "data: " . json_encode($sseData, JSON_UNESCAPED_SLASHES | JSON_UNESCAPED_UNICODE) . "\n\n";
                
                // Flush output immediately
                if (ob_get_level() > 0) {
                    ob_flush();
                }
                flush();
            }
            
            // Check if done
            if (isset($chunk['done']) && $chunk['done'] === true) {
                // Send final chunk with finish_reason
                $finalData = [
                    'id' => $completionId,
                    'object' => 'chat.completion.chunk',
                    'created' => $created,
                    'model' => $openaiModel,
                    'choices' => [
                        [
                            'index' => 0,
                            'delta' => [],
                            'finish_reason' => 'stop'
                        ]
                    ]
                ];
                
                echo "data: " . json_encode($finalData, JSON_UNESCAPED_SLASHES | JSON_UNESCAPED_UNICODE) . "\n\n";
                
                // Send usage information
                $usageData = [
                    'id' => $completionId,
                    'object' => 'chat.completion.chunk',
                    'created' => $created,
                    'model' => $openaiModel,
                    'choices' => [],
                    'usage' => [
                        'prompt_tokens' => $promptTokens,
                        'completion_tokens' => $completionTokens,
                        'total_tokens' => $promptTokens + $completionTokens
                    ]
                ];
                
                echo "data: " . json_encode($usageData, JSON_UNESCAPED_SLASHES | JSON_UNESCAPED_UNICODE) . "\n\n";
                
                // Send done marker
                echo "data: [DONE]\n\n";
                
                if (ob_get_level() > 0) {
                    ob_flush();
                }
                flush();
                
                return strlen($data);
            }
        }
        
        return strlen($data);
    });
    
    $result = curl_exec($ch);
    $httpCode = curl_getinfo($ch, CURLINFO_HTTP_CODE);
    $curlError = curl_error($ch);
    $curlErrno = curl_errno($ch);
    curl_close($ch);
    
    if ($curlErrno !== 0) {
        throw new Exception('Failed to connect to Ollama service: ' . $curlError);
    }
    
    if ($httpCode !== 200) {
        throw new Exception('Ollama returned error (HTTP ' . $httpCode . ')');
    }
}

/**
 * Handle non-streaming response
 */
function handleNonStreamingResponse($ollamaRequest, $openaiModel) {
    // Call Ollama
    $ch = curl_init('http://127.0.0.1:11434/api/generate');
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
    curl_setopt($ch, CURLOPT_POST, true);
    curl_setopt($ch, CURLOPT_POSTFIELDS, json_encode($ollamaRequest));
    curl_setopt($ch, CURLOPT_HTTPHEADER, ['Content-Type: application/json']);
    curl_setopt($ch, CURLOPT_TIMEOUT, 180);
    curl_setopt($ch, CURLOPT_CONNECTTIMEOUT, 10);
    
    $response = curl_exec($ch);
    $httpCode = curl_getinfo($ch, CURLINFO_HTTP_CODE);
    $curlError = curl_error($ch);
    $curlErrno = curl_errno($ch);
    curl_close($ch);
    
    if ($curlErrno !== 0) {
        throw new Exception('Failed to connect to Ollama service: ' . $curlError);
    }
    
    if ($httpCode !== 200) {
        throw new Exception('Ollama returned error (HTTP ' . $httpCode . '): ' . $response);
    }
    
    $ollamaResponse = json_decode($response, true);
    
    if (json_last_error() !== JSON_ERROR_NONE) {
        throw new Exception('Invalid JSON response from Ollama');
    }
    
    // Extract response text
    $responseText = trim($ollamaResponse['response'] ?? '');
    
    // Convert to OpenAI format
    $openaiResponse = [
        'id' => 'chatcmpl-' . generateId(),
        'object' => 'chat.completion',
        'created' => time(),
        'model' => $openaiModel,
        'choices' => [
            [
                'index' => 0,
                'message' => [
                    'role' => 'assistant',
                    'content' => $responseText
                ],
                'finish_reason' => 'stop'
            ]
        ],
        'usage' => [
            'prompt_tokens' => $ollamaResponse['prompt_eval_count'] ?? 0,
            'completion_tokens' => $ollamaResponse['eval_count'] ?? 0,
            'total_tokens' => ($ollamaResponse['prompt_eval_count'] ?? 0) + ($ollamaResponse['eval_count'] ?? 0)
        ]
    ];
    
    http_response_code(200);
    header('Content-Type: application/json; charset=utf-8');
    echo json_encode($openaiResponse, JSON_UNESCAPED_SLASHES | JSON_UNESCAPED_UNICODE);
}

/**
 * Convert OpenAI messages format to a single prompt
 */
function convertMessagesToPrompt($messages) {
    $prompt = '';
    $systemMessages = [];
    $conversationMessages = [];
    
    // Separate system messages from conversation
    foreach ($messages as $msg) {
        $role = $msg['role'] ?? 'user';
        $content = $msg['content'] ?? '';
        
        if ($role === 'system') {
            $systemMessages[] = $content;
        } else {
            $conversationMessages[] = $msg;
        }
    }
    
    // Add system messages at the top
    if (!empty($systemMessages)) {
        $prompt .= "System: " . implode("\n", $systemMessages) . "\n\n";
    }
    
    // Add conversation with proper formatting
    foreach ($conversationMessages as $msg) {
        $role = $msg['role'] ?? 'user';
        $content = $msg['content'] ?? '';
        
        if ($role === 'user') {
            $prompt .= "Human: " . $content . "\n\n";
        } elseif ($role === 'assistant') {
            $prompt .= "Assistant: " . $content . "\n\n";
        }
    }
    
    // Prompt for next response
    $prompt .= "Assistant:";
    
    return $prompt;
}

/**
 * Generate unique ID
 */
function generateId() {
    return bin2hex(random_bytes(12));
}
?>

