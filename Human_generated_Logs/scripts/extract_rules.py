import json
import re

pattern = r"([A-Za-z]+( [A-Za-z]+)+)"


file_path = 'Human_generated_Logs/data/json/customer_data.json'

with open(file_path, 'r') as json_file:
    call_data = json.load(json_file)
    
log_rules={}
    
for i in call_data:
    data=i["log_rules"]
    print(data)
    match = re.search(pattern, data)
    start, end = match.span()
    log_rules[match.group(1)]=data[end+1:]
    

file_path = "Human_generated_Logs/data/json/log_rules.json"

with open(file_path, 'w') as json_file:
    json.dump(log_rules, json_file, indent=4)  
    print("JSON data saved to:", file_path)   
    
    