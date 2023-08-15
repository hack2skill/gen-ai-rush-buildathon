import boto3



aws_access_key_id = 'AKIAVTINSJFICHEJXH6N'
aws_secret_key = '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'

session = boto3.Session(
    aws_access_key_id=aws_access_key_id,
    aws_secret_access_key=aws_secret_key
)

dynamodb = session.resource('dynamodb')

table_name = 'Country-Wise-Records1'

def fetch_records_by_country(country_name):
    table = dynamodb.Table(table_name)

    try:
        response = table.get_item(Key={'Country': country_name})
        item = response.get('Item')
        print(item)
    except Exception as e:
        print("Error fetching records:", e)
        return None


