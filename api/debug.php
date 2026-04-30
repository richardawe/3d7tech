<?php
// TEMPORARY DIAGNOSTIC — DELETE THIS FILE AFTER USE
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');

$key = getenv('OPENROUTER_API_KEY');

$result = [
    'env_key_set'    => !empty($key),
    'env_key_prefix' => $key ? substr($key, 0, 10) . '...' : null,
];

if (!$key) {
    $result['diagnosis'] = 'OPENROUTER_API_KEY is not visible to PHP. Check your .htaccess SetEnv directive.';
    echo json_encode($result, JSON_PRETTY_PRINT);
    exit;
}

// Make a minimal test call to OpenRouter
$payload = json_encode([
    'model'      => 'openai/gpt-oss-120b:free',
    'messages'   => [['role' => 'user', 'content' => 'Reply with valid JSON only: {"status":"ok"}']],
    'response_format' => ['type' => 'json_object'],
    'max_tokens' => 50,
]);

$ch = curl_init();
curl_setopt_array($ch, [
    CURLOPT_URL            => 'https://openrouter.ai/api/v1/chat/completions',
    CURLOPT_POST           => true,
    CURLOPT_POSTFIELDS     => $payload,
    CURLOPT_RETURNTRANSFER => true,
    CURLOPT_TIMEOUT        => 60,
    CURLOPT_HTTPHEADER     => [
        'Content-Type: application/json',
        'Authorization: Bearer ' . $key,
        'HTTP-Referer: https://3d7tech.com',
        'X-Title: 3D7 Debug',
    ],
]);
$response = curl_exec($ch);
$curlErr  = curl_error($ch);
$httpCode = curl_getinfo($ch, CURLINFO_HTTP_CODE);
curl_close($ch);

$result['openrouter_http_status'] = $httpCode;
$result['curl_error']             = $curlErr ?: null;
$result['openrouter_raw']         = json_decode($response, true) ?? $response;

echo json_encode($result, JSON_PRETTY_PRINT);
