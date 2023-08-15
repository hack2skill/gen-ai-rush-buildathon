import pymongo
import json


json_file_path = 'customer_details.json'

with open(json_file_path, 'r') as file:
    json_data = json.load(file)


mongo_connection_string = "mongodb+srv://hexa:hexadcp@hexadcp.xhtnvjk.mongodb.net/?retryWrites=true&w=majority"
database_name = "HexaDCP"


client = pymongo.MongoClient(mongo_connection_string)
db = client[database_name]


collection_name = "customer_details"
collection = db[collection_name]


if isinstance(json_data, list):
    collection.insert_many(json_data)
else:
  
    collection.insert_one(json_data)

client.close()
