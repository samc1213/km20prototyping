<?php
    require $_SERVER['DOCUMENT_ROOT'].'/vendor/autoload.php';
    use Aws\S3\S3Client;

    file_put_contents('hierarchy.json', $_POST['data']);

    $bucket = getenv(S3_COREDATA_BUCKET);

    $client = S3Client::factory();
    $result = $client->putObject(array(
        'Bucket'     => $bucket,
        'Key'        => 'hierarchy.json',
        'SourceFile' => 'hierarchy.json',
    ));

    echo 'saved';
?>