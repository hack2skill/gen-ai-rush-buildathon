
aws_access_key_id = 'AKIAVTINSJFII2GZXYJB'
aws_secret_key = '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'

session = boto3.Session(
    aws_access_key_id=aws_access_key_id,
    aws_secret_access_key=aws_secret_key
)

dynamodb = session.resource('dynamodb')

table_name = 'MyTable'


table = dynamodb.create_table(
    TableName="HexaDCP",
    KeySchema=[
        {
            'AttributeName': 'CustomerID',
            'KeyType': 'HASH'  # Partition key
        },
        {
            'AttributeName': 'Rule_ID',
            'KeyType': 'RANGE'  # Sort key
        }
    ],
    AttributeDefinitions=[
        {
            'AttributeName': 'CustomerID',
            'AttributeType': 'S' 
        },
        {
            'AttributeName': 'Rule_ID',
            'AttributeType': 'S'
        }
        
        
    ],
    ProvisionedThroughput={
        'ReadCapacityUnits': 5,   
        'WriteCapacityUnits': 5    
    }
)


table.meta.client.get_waiter('table_exists').wait(TableName=table_name)
