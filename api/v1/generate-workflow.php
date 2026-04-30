<?php
error_reporting(0);
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');
header('Content-Type: application/json');

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit;
}

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(['error' => 'Method not allowed']);
    exit;
}

$raw   = file_get_contents('php://input');
$input = json_decode($raw, true);

if (!$input) {
    http_response_code(400);
    echo json_encode(['error' => 'Invalid request body']);
    exit;
}

$url          = trim($input['url']          ?? '');
$description  = trim($input['description']  ?? '');
$businessName = trim($input['businessName'] ?? '');
$businessType = trim($input['businessType'] ?? '');
$revenueGoal  = trim($input['revenueGoal']  ?? 'more_leads');
$notes        = trim($input['notes']        ?? '');

if ($url === '' && $description === '') {
    http_response_code(400);
    echo json_encode(['error' => 'Provide a website URL or business description']);
    exit;
}

// Data directory setup
$dataDir = __DIR__ . '/../../data/';
if (!is_dir($dataDir)) {
    mkdir($dataDir, 0755, true);
}

// Simple per-IP rate limiting: max 10 requests per hour
$ip            = $_SERVER['REMOTE_ADDR'] ?? 'unknown';
$rateLimitFile = $dataDir . 'workflow_rate_limits.json';
$limits        = [];
if (file_exists($rateLimitFile)) {
    $limits = json_decode(file_get_contents($rateLimitFile), true) ?: [];
}
$now         = time();
$windowStart = $now - 3600;
$limits      = array_values(array_filter($limits, fn($e) => $e['time'] > $windowStart));
$ipCount     = count(array_filter($limits, fn($e) => $e['ip'] === $ip));
if ($ipCount >= 10) {
    http_response_code(429);
    echo json_encode(['error' => 'Rate limit exceeded. Please try again in an hour.']);
    exit;
}
$limits[] = ['ip' => $ip, 'time' => $now];
file_put_contents($rateLimitFile, json_encode($limits));

// Fetch website text if URL provided
$websiteContent = '';
if ($url !== '') {
    $ch = curl_init();
    curl_setopt_array($ch, [
        CURLOPT_URL            => $url,
        CURLOPT_RETURNTRANSFER => true,
        CURLOPT_TIMEOUT        => 12,
        CURLOPT_FOLLOWLOCATION => true,
        CURLOPT_MAXREDIRS      => 3,
        CURLOPT_USERAGENT      => 'Mozilla/5.0 (compatible; RevenueWorkflowBot/1.0)',
        CURLOPT_SSL_VERIFYPEER => false,
        CURLOPT_HTTPHEADER     => ['Accept-Language: en-US,en;q=0.9'],
    ]);
    $html = curl_exec($ch);
    curl_close($ch);

    if ($html && strlen($html) > 100) {
        $text = preg_replace('/<script[^>]*>.*?<\/script>/si', '', $html);
        $text = preg_replace('/<style[^>]*>.*?<\/style>/si', '', $text);
        $text = preg_replace('/<!--.*?-->/s', '', $text);
        $text = strip_tags($text);
        $text = preg_replace('/\s+/', ' ', $text);
        $websiteContent = trim(substr($text, 0, 4000));
    }
}

// Build context
$parts = [];
if ($businessName !== '') $parts[] = "Business name: {$businessName}";
if ($businessType !== '') $parts[] = "Industry/type: {$businessType}";
if ($websiteContent !== '') {
    $parts[] = "Website content extracted from {$url}:\n{$websiteContent}";
} elseif ($description !== '') {
    $parts[] = "Business description: {$description}";
}
if ($notes !== '') $parts[] = "Additional notes: {$notes}";
$context = implode("\n\n", $parts);

$goalLabels = [
    'more_leads'          => 'generate more qualified leads',
    'more_bookings'       => 'convert more enquiries to booked jobs',
    'more_quotes'         => 'increase quote volume and close rate',
    'more_repeat_revenue' => 'grow repeat revenue and customer lifetime value',
];
$goalText = $goalLabels[$revenueGoal] ?? 'generate more revenue';

$prompt = <<<PROMPT
You are a senior revenue operations consultant. Analyse the business below and design their optimal revenue workflow to achieve the goal: {$goalText}.

BUSINESS CONTEXT:
{$context}

Return ONLY a valid JSON object — no surrounding text, no markdown fences. Use exactly this structure:
{
  "business_name": "inferred or provided business name",
  "current_workflow_summary": "one paragraph describing the apparent current lead-to-cash flow based on the website or description",
  "recommended_workflow_summary": "one paragraph describing the improved revenue workflow you recommend",
  "mermaid_code": "complete Mermaid flowchart using flowchart LR syntax with 6-10 nodes and alphanumeric-only node IDs",
  "revenue_levers": ["lever 1", "lever 2", "lever 3", "lever 4"],
  "implementation_notes": "2-3 sentences on the highest-priority first steps to implement this workflow",
  "email_subject": "cold outreach subject line referencing their specific workflow gap",
  "email_body": "150-word personalised cold outreach email offering the workflow audit as value, written as a revenue consultant"
}

Mermaid example:
flowchart LR
    A[Website Visitor] --> B[Lead Capture]
    B --> C[Auto Email Sequence]
    C --> D[Discovery Call]
    D --> E[Quote Sent]
    E --> F[Booking Confirmed]
    F --> G[Service Delivered]
    G --> H[Review Request]
    H --> I[Retention Campaign]
    I --> B

Rules: mermaid_code must use only alphanumeric node IDs; revenue_levers must be an array of 3-5 strings; output nothing outside the JSON object.
PROMPT;

$apiKey = getenv('OPENROUTER_API_KEY');
if (!$apiKey) {
    http_response_code(500);
    echo json_encode(['error' => 'AI service not configured (missing OPENROUTER_API_KEY)']);
    exit;
}

$openRouterPayload = json_encode([
    'model'           => 'openai/gpt-oss-120b:free',
    'messages'        => [['role' => 'user', 'content' => $prompt]],
    'response_format' => ['type' => 'json_object'],
    'max_tokens'      => 4096,
    // temperature omitted — gpt-oss is a reasoning model and rejects it
]);

$ch = curl_init();
curl_setopt_array($ch, [
    CURLOPT_URL            => 'https://openrouter.ai/api/v1/chat/completions',
    CURLOPT_POST           => true,
    CURLOPT_POSTFIELDS     => $openRouterPayload,
    CURLOPT_RETURNTRANSFER => true,
    CURLOPT_TIMEOUT        => 120,
    CURLOPT_HTTPHEADER     => [
        'Content-Type: application/json',
        'Authorization: Bearer ' . $apiKey,
        'HTTP-Referer: https://3d7tech.com',
        'X-Title: 3D7 Tech Revenue Workflow Generator',
    ],
]);
$apiResponse = curl_exec($ch);
$curlErr     = curl_error($ch);
curl_close($ch);

if ($curlErr || !$apiResponse) {
    http_response_code(502);
    echo json_encode(['error' => 'AI service unavailable. Please try again shortly.']);
    exit;
}

$apiData = json_decode($apiResponse, true);
if (!$apiData || !isset($apiData['choices'][0]['message']['content'])) {
    http_response_code(502);
    $apiError = $apiData['error']['message'] ?? $apiData['error'] ?? 'Unknown error';
    echo json_encode(['error' => 'AI service error: ' . $apiError]);
    exit;
}

$rawResponse = $apiData['choices'][0]['message']['content'];

// Strip markdown code fences (reasoning models sometimes wrap output)
$cleaned = preg_replace('/^```(?:json)?\s*/m', '', $rawResponse);
$cleaned = preg_replace('/^```\s*$/m', '', $cleaned);
$cleaned = trim($cleaned);

$workflow = json_decode($cleaned, true);

// Fallback: extract outermost JSON object if model added surrounding prose
if (!$workflow) {
    if (preg_match('/\{[\s\S]*\}/m', $cleaned, $m)) {
        $workflow = json_decode($m[0], true);
    }
}

if (!$workflow) {
    http_response_code(422);
    echo json_encode(['error' => 'Could not parse workflow output. Please try again.']);
    exit;
}

// Persist submission (latest 500)
$storageFile = $dataDir . 'workflow-submissions.json';
$stored      = [];
if (file_exists($storageFile)) {
    $stored = json_decode(file_get_contents($storageFile), true) ?: [];
}
array_unshift($stored, [
    'timestamp'    => date('c'),
    'url'          => $url,
    'businessName' => $businessName,
    'businessType' => $businessType,
    'revenueGoal'  => $revenueGoal,
    'result'       => $workflow,
]);
if (count($stored) > 500) $stored = array_slice($stored, 0, 500);
file_put_contents($storageFile, json_encode($stored, JSON_PRETTY_PRINT));

echo json_encode($workflow);
