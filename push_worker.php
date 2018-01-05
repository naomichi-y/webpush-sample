<?php
ini_set('display_errors', '1');
ini_set('error_reporitng', E_ALL);

define('SERVER_KEY', getenv('SERVER_KEY'));

$path = 'storage/endpoints.dat';
$data = [];

if (file_exists($path)) {
  $lines = file($path, FILE_IGNORE_NEW_LINES);
  $headers = [
    'Authorization: key=' . SERVER_KEY,
    'Content-Type: application/json'
  ];
  $targets = [];

  foreach ($lines as $line) {
    // Support GCM  (Simple Push is not implemented yet...)
    preg_match('/\/gcm\/send\/(.+)/', $line, $matches);

    if (isset($matches[1])) {
      $targets[] = $matches[1];
    }
  }

  $post_data = ['registration_ids' => $targets];

  $curl = curl_init('https://android.googleapis.com/gcm/send');
  curl_setopt($curl, CURLOPT_POST, true);
  curl_setopt($curl, CURLOPT_HTTPHEADER, $headers);
  curl_setopt($curl, CURLOPT_POSTFIELDS, json_encode($post_data));
  curl_setopt($curl, CURLOPT_RETURNTRANSFER, true);

  $response = curl_exec($curl);
  curl_close($curl);

  $data = [
    'status' => 201,
    'message' => $response
  ];

} else {
  echo "Endpoints does not exist.\n";
}

echo json_encode($data);
