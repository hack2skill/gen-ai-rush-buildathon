import pandas as pd

input_csv_file = "output.csv"
data = pd.read_csv(input_csv_file)


rule_mapping = {
    (1, 0, 0): 1,
    (1, 1, 0): 12,
    (1, 0, 1): 13,
    (1, 1, 1): 123,
    (0, 0, 0): 0,
    (0, 1, 0): 2,
    (0, 0, 1): 3,
    (0, 1, 1): 23,
}


def get_rule_id(row):
    key = (
        row[["Name", "Address", "Email", "Phone Number", "Date of Birth", "Social-Security-Number", "Account-Number", "Transaction-history"]].any(),
        bool(row["Financial-Information"]),
        row[["Cookies", "IP-Address", "Device-Information"]].any()
    )
    return rule_mapping.get(key, 0)  

data["Rule_ID"] = data.apply(get_rule_id, axis=1)

output_csv_file = "final-output.csv"
data.to_csv(output_csv_file, index=False)
