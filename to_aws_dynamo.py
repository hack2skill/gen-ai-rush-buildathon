import pandas as pd
import boto3

aws_access_key_id = 
aws_secret_key = 


input_csv_file = "total_records_by_country.csv"
df = pd.read_csv(input_csv_file)

session = boto3.Session(
    aws_access_key_id=aws_access_key_id,
    aws_secret_access_key=aws_secret_key
)

dynamodb = session.resource('dynamodb')

table_name = "Country-Wise-Records1"
# Create the DynamoDB table (only if it doesn't exist)
table = dynamodb.create_table(
    TableName=table_name,
    KeySchema=[
        {
            'AttributeName': 'Country',
            'KeyType': 'HASH'  # Partition key
        }
    ],
    AttributeDefinitions=[
        {
            'AttributeName': 'Country',
            'AttributeType': 'S'  # String data type
        }
    ],
    ProvisionedThroughput={
        'ReadCapacityUnits': 5,  # Adjust according to your needs
        'WriteCapacityUnits': 5  # Adjust according to your needs
    }
)


table.meta.client.get_waiter('table_exists').wait(TableName=table_name)


# Wait for the table to be created (important step)
table.meta.client.get_waiter('table_exists').wait(TableName=table_name)

# Convert DataFrame to a list of dictionaries (JSON-like format)
records = df.to_dict(orient='records')

# Batch write the data into DynamoDB (max 25 items per batch)
with table.batch_writer() as batch:
    for record in records:
        batch.put_item(Item=record)

print("Data has been successfully stored in DynamoDB table:", table_name)
