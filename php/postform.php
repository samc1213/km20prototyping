<?php
    require $_SERVER['DOCUMENT_ROOT'].'/vendor/autoload.php';
    use Aws\DynamoDb\DynamoDbClient;
    
    $jsondata = $_POST['data'];
    $data = json_decode($jsondata);
    echo var_dump($data);

    $client = DynamoDbClient::factory(array(
        'profile' => 'default',
        'region' => 'us-west-2', #replace with your desired region
        'endpoint' => 'http://localhost:8000'
    ));
    
    $time = time();

    $result = $client->putItem(array(
        'TableName' => 'papers',
        'Item' => array(
            'timestamp' => array('N' => $time),
        ),
        'Expected' => array(
        // Associative array of custom 'AttributeName' key names
        'AttributeValueList' => array(
            'N' => array(
                    // Associative array of custom 'AttributeName' key names
                    'AttributeName' => array(
                        'timestamp' => $time
                        // Associative array of custom key value pairs
                    ),
            ),
        'ComparisonOperator' => 'NULL',
    ))));

    $result = $client->getItem(array(
        'ConsistentRead' => true,
        'TableName' => 'papers',
        'Key'       => array(
            'timestamp' => array('N' => $time)
        )
    ));

    echo var_dump($result);
    echo time();
?>