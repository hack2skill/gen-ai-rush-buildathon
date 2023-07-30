import pandas as pd
import numpy as np

import json

json_data_list = []


customer_data = 'age.csv'

dframe =  pd.read_csv(customer_data)

for index, row in dframe.iterrows():

    user_data = {}
    
    for column_name , value in row.items():

        user_data[column_name] = value

    json_data_list.append(user_data)


json_output_path = 'customer_details.json'

with open(json_output_path, 'w') as json_file:
    json.dump(json_data_list, json_file, indent=5)
