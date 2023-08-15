import csv
from cryptography.fernet import Fernet
import base64
import os
import random
from faker import Faker


def encrypt_data(data, key):
    fernet = Fernet(key)
    encrypted_data = fernet.encrypt(data.encode())
    return encrypted_data

fake = Faker()


data = []
num_rows = 10000  

for _ in range(num_rows):
    row = [
        str(random.randint(100000, 999999)),                  # Customer ID (random UUID)
        fake.name(),                   
        fake.street_address(),         
        fake.email(),                  
        fake.phone_number(),           
        fake.date_of_birth().isoformat(),  
        fake.ssn(),                    
        fake.credit_card_number(),     
        random.choice(["Yes", "No"]),
        fake.country(),
        fake.random_element(elements=('Male', 'Female')),
        fake.random_int(min=18, max=80)


    ]
    data.append(row)


encryption_key = base64.urlsafe_b64encode(os.urandom(32))


all_column_indices = list(range(1,len(data[0])))  

percentage_to_encrypt = 70  

num_rows_to_encrypt = int(num_rows * percentage_to_encrypt / 100)


rows_to_encrypt = random.sample(range(num_rows), num_rows_to_encrypt)

for row_idx in rows_to_encrypt:
    row = data[row_idx]
    num_columns_to_encrypt = random.randint(1, min(len(row), len(all_column_indices)))
    columns_to_encrypt = random.sample(all_column_indices, num_columns_to_encrypt)
    for col_idx in columns_to_encrypt:
        row[col_idx] = encrypt_data(str(row[col_idx]), encryption_key)


csv_file_path = 'data1.csv'
with open(csv_file_path, 'w', newline='') as csvfile:
    csv_writer = csv.writer(csvfile)
    csv_writer.writerow(["Customer ID", "Name", "Address", "Email", "Phone Number", "Date of Birth", "Social-Security-Number", "Account-Number", "Transaction-history"])
    csv_writer.writerows(data)

print(f"CSV file '{csv_file_path}' with {num_rows} random encrypted data rows has been created.")
