<?php

    $jsondata = $_POST['data'];
    $data = json_decode($jsondata);
    echo var_dump($data);

    $client = DynamoDbClient::factory(array(
        'profile' => 'default',
        'region' => 'us-west-2', #replace with your desired region
        'endpoint' => 'http://localhost:8000'
    ));

    $client->createTable(array(
        'TableName' => 'errors',
        'AttributeDefinitions' => array(
            array(
                'AttributeName' => 'id',
                'AttributeType' => 'N'
            ),
            array(
                'AttributeName' => 'time',
                'AttributeType' => 'N'
            )
        ),
        'KeySchema' => array(
            array(
                'AttributeName' => 'id',
                'KeyType'       => 'HASH'
            ),
            array(
                'AttributeName' => 'time',
                'KeyType'       => 'RANGE'
            )
        ),
        'ProvisionedThroughput' => array(
            'ReadCapacityUnits'  => 10,
            'WriteCapacityUnits' => 20
        )
    ));

?>