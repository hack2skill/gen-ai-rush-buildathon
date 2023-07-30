import pandas as pd
import json
import base64

columns = ["Customer ID", "Name", "Address", "Email", "Phone Number", "Date of Birth", "Social-Security-Number",
           "Account-Number", "Transaction-history", "Financial-Information", "Cookies", "IP-Address", "Device-Information" ,"Country","Age","Gender"]

def is_base64_encoded(value):
    try:
        base64.b64decode(value)
        return True
    except Exception:
        return False

def check_encrypted_values_in_json_file(json_file_path):
    data_frame = pd.DataFrame(columns=columns)

    with open(json_file_path, 'r') as json_file:
        json_data = json.load(json_file)

    rows_list = []

    for entry in json_data:
        row_data = {}

    
        ignore_columns = ["Customer ID", "Country", "Age", "Gender"]

        for column in columns:
            if column in ignore_columns:
                row_data[column] = entry.get(column)
            else:
                value = entry.get(column)
                if value is not None:
                    if str(value).startswith("b'") or str(value).startswith("g"):
                        row_data[column] = 0
                    else:
                        row_data[column] = 1
                else:
                    row_data[column] = None

        rows_list.append(row_data)

    data_frame = pd.DataFrame(rows_list)

    data_frame.to_csv('output.csv', index=False)

if __name__ == "__main__":
    json_file_path = 'customer_details.json'
    check_encrypted_values_in_json_file(json_file_path)
