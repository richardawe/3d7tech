<?php
/**
 * Save Strategy Submission API
 * Saves user email and strategy data
 * 
 * Endpoint: POST /v1/save-strategy.php
 */

error_reporting(0);
ini_set('display_errors', 0);
ini_set('log_errors', 1);

// CORS headers
header('Content-Type: application/json; charset=utf-8');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');

// Handle preflight
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit;
}

// Only allow POST
if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
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
    
    // Extract data
    $email = $request['email'] ?? '';
    $businessName = $request['businessName'] ?? '';
    $industry = $request['industry'] ?? '';
    $targetMarket = $request['targetMarket'] ?? '';
    $strategy = $request['strategy'] ?? '';
    $timestamp = date('Y-m-d H:i:s');
    
    // Validate email
    if (empty($email) || !filter_var($email, FILTER_VALIDATE_EMAIL)) {
        throw new Exception('Valid email is required');
    }
    
    // Prepare data
    $data = [
        'email' => $email,
        'businessName' => $businessName,
        'industry' => $industry,
        'targetMarket' => $targetMarket,
        'strategy' => $strategy,
        'timestamp' => $timestamp,
        'ip' => $_SERVER['REMOTE_ADDR'] ?? 'unknown'
    ];
    
    // Save to file (CSV format for easy viewing)
    $csvFile = __DIR__ . '/../../data/strategy-submissions.csv';
    $csvDir = dirname($csvFile);
    
    // Create directory if it doesn't exist
    if (!is_dir($csvDir)) {
        mkdir($csvDir, 0755, true);
    }
    
    // Check if file exists, if not create with headers
    $fileExists = file_exists($csvFile);
    $fp = fopen($csvFile, 'a');
    
    if (!$fileExists) {
        // Write CSV headers
        fputcsv($fp, ['Timestamp', 'Email', 'Business Name', 'Industry', 'Target Market', 'IP Address']);
    }
    
    // Write data row
    fputcsv($fp, [
        $timestamp,
        $email,
        $businessName,
        $industry,
        $targetMarket,
        $data['ip']
    ]);
    
    fclose($fp);
    
    // Also save full strategy to JSON file (optional, for detailed records)
    $jsonFile = __DIR__ . '/../../data/strategy-submissions.json';
    $submissions = [];
    
    if (file_exists($jsonFile)) {
        $existingData = file_get_contents($jsonFile);
        $submissions = json_decode($existingData, true) ?: [];
    }
    
    $submissions[] = $data;
    
    // Keep only last 1000 submissions to prevent file from growing too large
    if (count($submissions) > 1000) {
        $submissions = array_slice($submissions, -1000);
    }
    
    file_put_contents($jsonFile, json_encode($submissions, JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE));
    
    // Return success
    http_response_code(200);
    echo json_encode([
        'success' => true,
        'message' => 'Strategy saved successfully'
    ], JSON_UNESCAPED_SLASHES | JSON_UNESCAPED_UNICODE);
    
} catch (Exception $e) {
    http_response_code(400);
    echo json_encode([
        'error' => [
            'message' => $e->getMessage(),
            'type' => 'validation_error'
        ]
    ], JSON_UNESCAPED_SLASHES | JSON_UNESCAPED_UNICODE);
}
?>

