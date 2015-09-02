<?php
    require $_SERVER['DOCUMENT_ROOT'].'/vendor/autoload.php';
    use Aws\S3\S3Client;

    $bucket = getenv(S3_COREDATA_BUCKET);

    $client = S3Client::factory();

    $result = $client->getObject(array(
        'Bucket' => $bucket,
        'Key'    => 'hierarchy.json',
        'SaveAs' => 'hierarchy.json'
    ));

    echo file_get_contents('hierarchy.json');
?>