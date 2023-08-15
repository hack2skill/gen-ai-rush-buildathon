import pandas as pd
import seaborn as sns
import matplotlib.pyplot as plt

# Read the CSV file
df = pd.read_csv('new.csv')

Country = 'UK'
Gender = 'male'

# Filter data for 'Country' Australia and 'Gender' female
australia_female_data = df[(df['Country'] == 'UK') & (df['Gender'] == 'male')]

# Create a double-bar graph using Seaborn
sns.set(style='whitegrid')
plt.figure(figsize=(12, 8))

# Plot 'Name Breach' count
sns.barplot(x='Age Group', y='Name Breach', data=australia_female_data, color='black', label='Name Breach')

# Plot 'Total Records'
sns.barplot(x='Age Group', y='Total Records', data=australia_female_data, color='red', alpha=0.8, label='Total Records')

# Add data labels on the bars
for index, value in enumerate(australia_female_data['Account-Number Breach']):
    plt.text(index, value, str(value), ha='center', va='bottom', fontweight='bold', fontsize=10, color='black')

for index, value in enumerate(australia_female_data['Total Records']):
    plt.text(index, value, str(value), ha='center', va='bottom', fontweight='bold', fontsize=10, color='black')

# Add labels and title
plt.xlabel('Age Group')
plt.ylabel('Count')
plt.title(f'Account-Number Breach vs. Total Records in {Country} for {Gender} by Age Group')
plt.legend()

# Show the plot
plt.tight_layout()
plt.show()
