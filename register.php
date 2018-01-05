<?php
ini_set('display_errors', '1');
ini_set('error_reporting', E_ALL);

$data = [];

if (isset($_POST['endpoint'])) {
  $path = 'storage/endpoints.dat';

  if (is_writable($path)) {
    file_put_contents($path, $_POST['endpoint'] . PHP_EOL, FILE_APPEND);

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
