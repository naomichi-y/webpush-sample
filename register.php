<?php
ini_set('display_errors', '1');
ini_set('error_reporting', E_ALL);

$json_body = file_get_contents('php://input');
$body = json_decode($json_body, true);
$data = [];

if (isset($body['endpoint'])) {
  $path = 'storage/endpoints.dat';

  if (is_writable($path)) {
    file_put_contents($path, $body['endpoint'] . PHP_EOL, FILE_APPEND);

    $data = [
      'status' => 201
    ];

  } else {
    $data = [
      'status' => 500,
      'errors' => [
        [
          'message' => 'Failed write to storage.'
        ]
      ]
    ];
  }
} else {
  $data = [
    'status' => 400,
    'errors' => [
      [
        'message' => 'Endpoint not specified.'
      ]
    ]
  ];
}

echo json_encode($data);
