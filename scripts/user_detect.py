import pandas as pd
import numpy as np
import json

rules= {
  "users": [
    {
      "type": "admin",
      "two_factor_authentication": True,
      "multi_factor_authentication": True,
      "security_monitoring": True,
      "data_privacy_policy": True,
      "secure_file_uploads": True,
      "secure_file_uploads_policies": {
        "properties": {
          "secure_file_name": [".txt", ".csv", ".xlsx", ".pdf",".img",".png",".jpeg",".mp4"],
          "malware_scan": True,
          "audit_logging": True,
          "encryption": {
            "in_transit": True,
            "at_rest": True
          }
        }
      },
      "ssl_encryption_required": True,
      "permissions": ["read", "write", "delete", "create"],
      "explicite_allowed_resources": [
        "sensitve_data.txt",
        "sales.txt",
        "reports.txt",
        "product_info.txt"
      ],
      "other_resources": True
    },
    {
      "type": "employee",

      "two_factor_authentication": True,
      "multi_factor_authentication": False,
      "security_monitoring": True,
      "data_privacy_policy": True,
      "secure_file_uploads": True,
      "secure_file_uploads_policies": {
        "properties": {
          "secure_file_name": [".txt", ".csv", ".xlsx", ".pdf",".img",".png",".jpeg",".mp4"],
          "malware_scan": True,
          "audit_logging": True,
          "encryption": {
            "in_transit": True,
            "at_rest": True
          }
        }
      },
      "ssl_encryption_required": True,
      "permissions": ["read", "write", "create"],
      "explicite_allowed_resources": [
        "sales.txt",
        "reports.txt",
        "product_info.txt"
      ],
      "other_resources": False
    },
    {
      "type": "customer",

      "two_factor_authentication": True,
      "multi_factor_authentication": True,
      "security_monitoring": True,
      "data_privacy_policy": True,
      "secure_file_uploads": False,
      "secure_file_uploads_policies": {
        "properties": {
          "secure_file_name": [".txt", ".csv", ".xlsx", ".pdf",".img",".png",".jpeg",".mp4"],
          "malware_scan": True,
          "audit_logging": True,
          "encryption": {
            "in_transit": True,
            "at_rest": True
          }
        }
      },
      "ssl_encryption_required": True,
      "permissions": ["read"],
      "explicite_allowed_resources": ["product_info.txt", "userId_info.txt"],
      "other_resources": False
    }
  ]
}

old_data = pd.read_csv('data/data_main.csv',low_memory=False)

# file_name = "scripts/LLM/SOURCE_DOCUMENTS/new_train_data.json"
new_json = {}
# with open(file_name, "w") as json_file:
#     json.dump(new_json, json_file)
    
# print(old_data.shape)
old_data=old_data.drop_duplicates()

def check_policy_violation(instance):
    violations = {}
    k=instance["type"]
    desired_users = [user for user in rules["users"] if user["type"] == k]
 
    
    # Iterate over the rules for each user type
    for user_rule in desired_users:
            if user_rule["two_factor_authentication"] != instance["two_factor_authentication"]:
                violations["two_factor_authentication"]=instance["two_factor_authentication"]
            if user_rule["multi_factor_authentication"] != instance["multi_factor_authentication"]:
                violations["multi_factor_authentication"]=instance["multi_factor_authentication"]    
            if user_rule["security_monitoring"] != instance["security_monitoring"]:
                violations["security_monitoring"]=instance["security_monitoring"]
            if user_rule["data_privacy_policy"] != instance["data_privacy_policy"]:
                violations["data_privacy_policy"]=instance["data_privacy_policy"]
            
            
            
            for i in user_rule["secure_file_uploads_policies"]:
                for j in user_rule["secure_file_uploads_policies"][i]:
                    fname="secure_file_uploads_policies"
                    fname=fname+"__"+i
                    fname=fname+"__"+j

                    if(j=="secure_file_name"):
                      last_exe=instance[fname].split('.')
                      for k in user_rule["secure_file_uploads_policies"][i][j]:
                        if k not in last_exe:
                            violations[fname]=instance[fname]
                    if(j=="malware_scan" and user_rule["secure_file_uploads_policies"][i][j]!=instance[fname]):
                        violations[fname]=instance[fname]
                    if(j=="audit_logging" and user_rule["secure_file_uploads_policies"][i][j]!=instance[fname]):
                        violations[fname]=instance[fname]
                    if(j=="encryption"):
                      for k in user_rule["secure_file_uploads_policies"][i][j]:
                        fname="secure_file_uploads_policies"
                        fname=fname+"__"+i
                        fname=fname+"__"+j
                        fname=fname+"__"+k
                        if(user_rule["secure_file_uploads_policies"][i][j][k]!=instance[fname]):
                            violations[fname]=instance[fname]
    
            if "ssl_encryption_required" in user_rule and user_rule["ssl_encryption_required"] != instance["ssl_encryption_required"]:
                violations["ssl_encryption_required"]=instance["ssl_encryption_required"]
            
            if "permissions" in user_rule and any(permission not in user_rule["permissions"] for permission in instance["permissions"]):
                violations["permissions"]=instance["permissions"]
            if "explicite_allowed_resources" in user_rule and any(resource not in user_rule["explicite_allowed_resources"] for resource in instance["explicite_allowed_resources"]):
                violations["explicite_allowed_resources"]=instance["explicite_allowed_resources"]
   
    return violations
    

for i in range(old_data.shape[0]):
    instance=old_data.iloc[i].to_dict()
    #print(instance)
    
    new_instance={}
    new_instance["client"]=instance["client"]
    new_instance["type"]=instance["type"]
    new_instance["datetime"]=instance["datetime"]
    new_instance["request"]=instance["request"]
    new_instance["size"]=instance["size"]
    new_instance["referer"]=instance["referer"]
    new_instance["user_agent"]=instance["user_agent"]
    new_instance["user_system_specs"]=instance["user_system_specs"]
    
    violated_polices={}
    violations=check_policy_violation(instance)
    
    new_instance["violated_polices"]=violations
    name=f"instance_{i}"
    new_json[name]=new_instance
    
output_file_path = "data/new_data.json"  # Replace with your desired file path
with open(output_file_path, "w") as json_file:
    json.dump(new_json, json_file, indent=2)

print(f"JSON data saved to {output_file_path}")
    
    
    


