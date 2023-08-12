import json


file_path = 'jsons/attacks/security_attacks.json'

with open(file_path, 'r') as json_file:
    security_attacks = json.load(json_file)
    
file_path = 'data/new_data.json'

with open(file_path, 'r') as json_file:
    instances = json.load(json_file)
    
instance=instances['instance_0']
    


def context_gen(instance):

    explanation_paragraph = (
    f"The information displayed in the 'client' field is denoted as '{instance['client']}' and the timestamp is indicated by 'datetime' as '{instance['datetime']}'. The method used was '{instance['method']}' with a link labeled 'request' pointing to '{instance['request']}'.The source that referred the request is captured in 'referer' as '{instance['referer']}' and the originating device is identified by 'user_agent' as '{instance['user_agent']}'."

    f"Categorized as '{instance['type']}', this instance's two-factor authentication is {'enabled' if instance['two_factor_authentication'] else 'disabled'}, and multi-factor authentication is {'enabled' if instance['multi_factor_authentication'] else 'disabled'}. The utilization of 'security_monitoring' is {'enabled' if instance['secure_file_uploads'] else 'disabled'}, along with a data privacy policy that is {'enabled' if instance['data_privacy_policy'] else 'disabled'}. The setting for 'secure_file_uploads' is {'enabled' if instance['secure_file_uploads'] else 'disabled'}. The specified 'secure_file_name' is '{instance['secure_file_uploads_policies__properties__secure_file_name']}' and the malware scan feature is {'enabled' if instance['secure_file_uploads_policies__properties__malware_scan'] else 'disabled'}. The option for 'audit_logging' is {'enabled' if instance['secure_file_uploads_policies__properties__audit_logging'] else 'disabled'}."

    f"The status of 'Encryption in transit' is {'enabled' if instance['secure_file_uploads_policies__properties__encryption__in_transit'] else 'disabled'}, and 'encryption at rest' is {'enabled' if instance['secure_file_uploads_policies__properties__encryption__at_rest'] else 'disabled'}. Additionally, 'SSL encryption' is {'enabled' if instance['ssl_encryption_required'] else 'disabled'}. The permissions are listed as '{instance['permissions']}' and the explicitly allowed resources are '{instance['explicite_allowed_resources']}'. The availability of 'other_resources' is {'enabled' if instance['other_resources'] else 'disabled'}. The HTTP 'status_code' '{instance['status']}' reflects the specific status of the HTTP request."

    f"Notably, the 'violated_polices' section highlights that '{instance['violated_policies']}' policies were breached.")
    
    return explanation_paragraph


def find_violated_polices(instance):
   
    violated_policies = instance['violated_policies']
    return violated_policies

#print(summarizer(instance))

def rule_gen(instance):
    keys=find_violated_polices(instance).keys()
    rules={}
    for key in keys:
        rules[key]=security_attacks[key]
    return rules

