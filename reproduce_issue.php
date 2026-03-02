<?php
// reproduce_issue.php

// Mock data
$_GET['action'] = 'create_pix';
$_SERVER['REQUEST_METHOD'] = 'POST';
$_SERVER['REMOTE_ADDR'] = '127.0.0.1';
$_SERVER['HTTP_HOST'] = 'localhost';
$_SERVER['PHP_SELF'] = '/api.php';

// Mock input with UTMs
$inputData = [
    'amount' => 1990,
    'utms' => [
        'src' => 'test_src',
        'utm_source' => 'test_source',
        'utm_campaign' => 'test_campaign'
    ]
];

// Capture output
ob_start();

// Valid JSON input simulation for file_get_contents('php://input')
// Since we can't easily mock php://input in CLI without specific extensions or piping,
// we will modify api.php temporarily OR we can use a wrapper that defines the variables
// and includes api.php, but api.php reads file_get_contents('php://input').
//
// A better way for CLI test is to use `php -r` with pipe.
// But for this file, let's just use `stream_wrapper_register` or write a temporary file?
// Simpler: We will run this script via `php` command and pipe input.

// Wait, this file IS the reproduction script. I will run it with:
// echo '{"amount":...}' | php reproduce_issue.php
// But inside here I need to include api.php.

// Let's just do the pipe command in the tool call.
if (file_exists('api.php')) {
    include 'api.php';
} else {
    echo "api.php not found";
}
?>