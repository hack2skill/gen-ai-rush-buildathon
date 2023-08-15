import pandas as pd

input_csv_file = "final-output.csv"
df = pd.read_csv(input_csv_file)

count_columns = ["Name", "Email", "Account-Number", "Financial-Information"]

for column in count_columns:
    df[column] = df[column].astype(str).apply(lambda x: x.count('1'))

# Grouping by "Country" only and calculating the total records for each country
total_records_by_country = df.groupby(["Country"])[[column for column in count_columns]].sum().reset_index()

output_csv_file = "total_records_by_country.csv"
total_records_by_country.to_csv(output_csv_file, index=False)
