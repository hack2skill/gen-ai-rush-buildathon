import pandas as pd

input_csv_file = "final-output.csv"
df = pd.read_csv(input_csv_file)

age_bins = [18, 31, 46, 61, 76]
age_labels = ["18-30", "31-45", "46-60", "61-75"]

df["Age Group"] = pd.cut(df["Age"], bins=age_bins, labels=age_labels, right=False)

count_columns = ["Name", "Email", "Account-Number", "Financial-Information"]

for column in count_columns:
    df[column] = df[column].astype(str).apply(lambda x: x.count('1'))

grouped_df = df.groupby(["Age Group", "Country", "Gender"])[[column for column in count_columns]].sum().reset_index()


total_records = df.groupby(["Age Group", "Country", "Gender"]).size().reset_index(name="Total-Records")


grouped_df = pd.merge(grouped_df, total_records, on=["Age Group", "Country", "Gender"])

output_csv_file = "new.csv"
grouped_df.to_csv(output_csv_file, index=False)


