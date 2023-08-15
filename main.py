import pandas as pd
import boto3
import csv
import time

csv_file = "final-output.csv"

data = pd.read_csv(csv_file)
hashmap = data.set_index('Customer ID').to_dict()['Rule_ID']

df = pd.DataFrame(list(hashmap.items()), columns=['Customer ID', 'Rule_ID'])


# aws_access_key_id = 'AKIAVTINSJFII2GZXYJB'
# aws_secret_key = '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'

# session = boto3.Session(
#     aws_access_key_id=aws_access_key_id,
#     aws_secret_access_key=aws_secret_key
# )

# dynamodb = session.resource('dynamodb')

# table = dynamodb.create_table(
#     TableName="HexaDCP4",
#     KeySchema=[
#         {
#             'AttributeName': 'CustomerID',
#             'KeyType': 'HASH'  # Partition key
#         },
#         {
#             'AttributeName': 'Rule_ID',
#             'KeyType': 'RANGE'  # Sort key
#         }
#     ],
#     AttributeDefinitions=[
#         {
#             'AttributeName': 'CustomerID',
#             'AttributeType': 'S' 
#         },
#         {
#             'AttributeName': 'Rule_ID',
#             'AttributeType': 'S'
#         }
        
        
#     ],
#     ProvisionedThroughput={
#         'ReadCapacityUnits': 5,   
#         'WriteCapacityUnits': 5    
#     }
# )


# # table.meta.client.get_waiter('table_exists').wait(TableName=table_name)

# time.sleep(15)



# dynamodb = boto3.resource('dynamodb', aws_access_key_id=aws_access_key_id,
#                           aws_secret_access_key=aws_secret_key)

# table_name = "HexaDCP4"

# table = dynamodb.Table(table_name)

# for _, row in df.iterrows():
#     item = {
#         "CustomerID": str(row["Customer ID"]),
#         "Rule_ID": str(row["Rule_ID"])
#     }
#     table.put_item(Item=item)


# print("Data loaded into DynamoDB table successfully!")