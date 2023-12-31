import numpy as np
import pandas as pd
import random 

from numpy.random import choice

import warnings
warnings.filterwarnings("ignore")

columns=[]

class true_data_generation:
    def __init__(self,store_path,columns):
        self.store_path = store_path
        self.columns = columns
        
    def column_names(self,columns):
        self.columns = columns

        df=pd.DataFrame(columns=self.columns)
        #save df at store_path
        complete_file_path = self.store_path + "/" + "true_data.csv"
        df.to_csv(complete_file_path,index=False)
    
    def fill_column_with_random_values(self,dataframe, column_name, unique_values, percentages):
        
        randomList = choice(unique_values, len(dataframe),p=percentages)
        dataframe.loc[:,column_name] = randomList
        
        return dataframe[column_name]
    def generate_meaningful_filename(self,dataframe,column_name):
        adjectives = ["beautiful", "clever", "happy", "creative", "brave", "sunny"]
        nouns = ["world", "day", "sun", "flower", "bird", "ocean"]
        extensions_harmful = ['.exe', '.bat', '.cmd', '.vbs', '.js', '.jar', '.msi', '.py', '.ps1', '.sh']
        extensions_non_harmful = [".txt", ".csv", ".xlsx", ".pdf",".img",".png",".jpeg",".mp4"]
    
        adjective = random.choice(adjectives)
        noun = random.choice(nouns)
    
        percentage_harmful = 0
        filenames = []
        for _ in range(len(dataframe)):
           adjective = random.choice(adjectives)
           noun = random.choice(nouns)
           is_harmful = random.randint(1, 100) <= percentage_harmful

           if is_harmful:
              extension = random.choice(extensions_harmful)
           else:
              extension = random.choice(extensions_non_harmful)

           filename = f"{adjective}_{noun}{extension}"
           filenames.append(filename)
        
        dataframe[column_name] = filenames
        return dataframe[column_name]
    
    def data_fill(self,columns):
        data = {'Idx': list(range(1, 10001))}
        df = pd.DataFrame(data)
        df_2=pd.DataFrame(columns=self.columns)
        df=pd.concat([df, df_2], axis=1)
        print(df.shape)
        
        
    
        df.loc["type"]=self.fill_column_with_random_values(df,"type",["customer","admin","employee"],[0.4,0.3,0.3])
        print()
        customer_df = df[df["type"] == "customer"]
        
        customer_df.loc[:,"method"] = self.fill_column_with_random_values(customer_df,"method",["GET","POST"],[0.5,0.5])
        customer_df.loc[:,"status_code"] = self.fill_column_with_random_values(customer_df,"status_code",["200","201","204","400","409","429","451"],[0.15,0.15,0.15,0.15,0.15,0.15,0.1])
        customer_df.loc[:,"size"] = np.random.randint(10,1000,size=customer_df.shape[0])
        customer_df.loc[:,"referer"] = self.fill_column_with_random_values(customer_df,"referer",["https://www.google.com/","https://www.facebook.com/","https://www.youtube.com/","https://www.amazon.com/","https://www.wikipedia.org/","https://www.twitter.com/","https://www.instagram.com/","https://www.reddit.com/","https://www.yahoo.com/","https://www.ebay.com/"],[0.1,0.1,0.1,0.1,0.1,0.1,0.1,0.1,0.1,0.1])
        customer_df.loc[:,"user_system_specs"] = self.fill_column_with_random_values(customer_df,"user_system_specs",["Windows","Mac","Linux","Android","iOS"],[0.2,0.2,0.2,0.2,0.2])
        customer_df.loc[:,"two_factor_authentication"] = self.fill_column_with_random_values(customer_df,"two_factor_authentication",["true"],[1])
        customer_df.loc[:,"multi_factor_authentication"] = self.fill_column_with_random_values(customer_df,"multi_factor_authentication",["false"],[1])
        customer_df.loc[:,"security_monitoring"] = self.fill_column_with_random_values(customer_df,"security_monitoring",["true"],[1])
        customer_df.loc[:,"data_privacy_policy"] = self.fill_column_with_random_values(customer_df,"data_privacy_policy",["true"],[1])
        customer_df.loc[:,"secure_file_uploads"] = self.fill_column_with_random_values(customer_df,"secure_file_uploads",["false"],[1])
        customer_df.loc[:,"secure_file_uploads_policies__properties__secure_file_name"] = self.generate_meaningful_filename(customer_df,"secure_file_uploads_policies__properties__secure_file_name")
        customer_df.loc[:,"secure_file_uploads_policies__properties__malware_scan"] = self.fill_column_with_random_values(customer_df,"secure_file_uploads_policies__properties__malware_scan",["true"],[1])
        customer_df.loc[:,"secure_file_uploads_policies__properties__audit_logging"] = self.fill_column_with_random_values(customer_df,"secure_file_uploads_policies__properties__audit_logging",["true"],[1])  
        customer_df.loc[:,"secure_file_uploads_policies__properties__sandboxing"] = self.fill_column_with_random_values(customer_df,"secure_file_uploads_policies__properties__sandboxing",["true"],[1])
        customer_df.loc[:,"secure_file_uploads_policies__properties__encryption__in_transit"] = self.fill_column_with_random_values(customer_df,"secure_file_uploads_policies__properties__encryption__in_transit",["true"],[1])
        customer_df.loc[:,"secure_file_uploads_policies__properties__encryption__at_rest"] = self.fill_column_with_random_values(customer_df,"secure_file_uploads_policies__properties__encryption__at_rest",["true"],[1])
        customer_df.loc[:,"ssl_encryption_required"] = self.fill_column_with_random_values(customer_df,"ssl_encryption_required",["true"],[1])
        customer_df.loc[:,"permissions"] = self.fill_column_with_random_values(customer_df,"permissions",["read"],[1])
        customer_df.loc[:,"other_resources"] = self.fill_column_with_random_values(customer_df,"other_resources",["false"],[1])
        customer_df.loc[:,"explicite_allowed_resources"] = self.fill_column_with_random_values(customer_df, "explicite_allowed_resources",["product_info.txt", "userId_info.txt"], [0.5, 0.5])
        
        df.update(customer_df)
        
        customer_df = df[df["type"] == "employee"]
        
        customer_df.loc[:,"method"] = self.fill_column_with_random_values(customer_df,"method",["GET","POST","PUT"],[0.3,0.3,0.4])
        customer_df.loc[:,"status_code"] = self.fill_column_with_random_values(customer_df,"status_code",["200","201","204","400","409","429","451"],[0.15,0.15,0.15,0.15,0.15,0.15,0.1])
        customer_df.loc[:,"size"] = np.random.randint(10,1000,size=customer_df.shape[0])
        customer_df.loc[:,"referer"] = self.fill_column_with_random_values(customer_df,"referer",["https://www.google.com/","https://www.facebook.com/","https://www.youtube.com/","https://www.amazon.com/","https://www.wikipedia.org/","https://www.twitter.com/","https://www.instagram.com/","https://www.reddit.com/","https://www.yahoo.com/","https://www.ebay.com/"],[0.1,0.1,0.1,0.1,0.1,0.1,0.1,0.1,0.1,0.1])
        customer_df.loc[:,"user_system_specs"] = self.fill_column_with_random_values(customer_df,"user_system_specs",["Windows","Mac","Linux","Android","iOS"],[0.2,0.2,0.2,0.2,0.2])
        customer_df.loc[:,"two_factor_authentication"] = self.fill_column_with_random_values(customer_df,"two_factor_authentication",["true"],[1])
        customer_df.loc[:,"multi_factor_authentication"] = self.fill_column_with_random_values(customer_df,"multi_factor_authentication",["false"],[1])
        customer_df.loc[:,"security_monitoring"] = self.fill_column_with_random_values(customer_df,"security_monitoring",["true"],[1])
        customer_df.loc[:,"data_privacy_policy"] = self.fill_column_with_random_values(customer_df,"data_privacy_policy",["true"],[1])
        customer_df.loc[:,"secure_file_uploads"] = self.fill_column_with_random_values(customer_df,"secure_file_uploads",["true"],[1])
        customer_df.loc[:,"secure_file_uploads_policies__properties__secure_file_name"] = self.generate_meaningful_filename(customer_df,"secure_file_uploads_policies__properties__secure_file_name")
        customer_df.loc[:,"secure_file_uploads_policies__properties__malware_scan"] = self.fill_column_with_random_values(customer_df,"secure_file_uploads_policies__properties__malware_scan",["true"],[1])
        customer_df.loc[:,"secure_file_uploads_policies__properties__audit_logging"] = self.fill_column_with_random_values(customer_df,"secure_file_uploads_policies__properties__audit_logging",["true"],[1])  
        customer_df.loc[:,"secure_file_uploads_policies__properties__sandboxing"] = self.fill_column_with_random_values(customer_df,"secure_file_uploads_policies__properties__sandboxing",["true"],[1])
        customer_df.loc[:,"secure_file_uploads_policies__properties__encryption__in_transit"] = self.fill_column_with_random_values(customer_df,"secure_file_uploads_policies__properties__encryption__in_transit",["true"],[1])
        customer_df.loc[:,"secure_file_uploads_policies__properties__encryption__at_rest"] = self.fill_column_with_random_values(customer_df,"secure_file_uploads_policies__properties__encryption__at_rest",["true"],[1])
        customer_df.loc[:,"ssl_encryption_required"] = self.fill_column_with_random_values(customer_df,"ssl_encryption_required",["true"],[1])
        customer_df.loc[:,"permissions"] = self.fill_column_with_random_values(customer_df,"permissions",["read", "write", "create"],[0.3,0.3,0.4])
        customer_df.loc[:,"other_resources"] = self.fill_column_with_random_values(customer_df,"other_resources",["false"],[1])
        customer_df.loc[:,"explicite_allowed_resources"] = self.fill_column_with_random_values(customer_df, "explicite_allowed_resources",["product_info.txt", "reports.txt","sales.txt"], [0.3, 0.3, 0.4])
        
        df.update(customer_df)
        
        customer_df = df[df["type"] == "admin"]
        
        customer_df.loc[:,"method"] = self.fill_column_with_random_values(customer_df,"method",["GET","POST","PUT","DELETE"],[0.3,0.3,0.2,0.2])
        customer_df.loc[:,"status_code"] = self.fill_column_with_random_values(customer_df,"status_code",["200","201","204","400","403","409","429","451"],[0.2,0.15,0.15,0.1,0.1,0.1,0.1,0.1])
        customer_df.loc[:,"size"] = np.random.randint(10,1000,size=customer_df.shape[0])
        customer_df.loc[:,"referer"] = self.fill_column_with_random_values(customer_df,"referer",["https://www.google.com/","https://www.facebook.com/","https://www.youtube.com/","https://www.amazon.com/","https://www.wikipedia.org/","https://www.twitter.com/","https://www.instagram.com/","https://www.reddit.com/","https://www.yahoo.com/","https://www.ebay.com/"],[0.1,0.1,0.1,0.1,0.1,0.1,0.1,0.1,0.1,0.1])
        customer_df.loc[:,"user_system_specs"] = self.fill_column_with_random_values(customer_df,"user_system_specs",["Windows","Mac","Linux","Android","iOS"],[0.2,0.2,0.2,0.2,0.2])
        customer_df.loc[:,"two_factor_authentication"] = self.fill_column_with_random_values(customer_df,"two_factor_authentication",["true"],[1])
        customer_df.loc[:,"multi_factor_authentication"] = self.fill_column_with_random_values(customer_df,"multi_factor_authentication",["true"],[1])
        customer_df.loc[:,"security_monitoring"] = self.fill_column_with_random_values(customer_df,"security_monitoring",["true"],[1])
        customer_df.loc[:,"data_privacy_policy"] = self.fill_column_with_random_values(customer_df,"data_privacy_policy",["true"],[1])
        customer_df.loc[:,"secure_file_uploads"] = self.fill_column_with_random_values(customer_df,"secure_file_uploads",["true"],[1])
        customer_df.loc[:,"secure_file_uploads_policies__properties__secure_file_name"] = self.generate_meaningful_filename(customer_df,"secure_file_uploads_policies__properties__secure_file_name")
        customer_df.loc[:,"secure_file_uploads_policies__properties__malware_scan"] = self.fill_column_with_random_values(customer_df,"secure_file_uploads_policies__properties__malware_scan",["true"],[1])
        customer_df.loc[:,"secure_file_uploads_policies__properties__audit_logging"] = self.fill_column_with_random_values(customer_df,"secure_file_uploads_policies__properties__audit_logging",["true"],[1])  
        customer_df.loc[:,"secure_file_uploads_policies__properties__sandboxing"] = self.fill_column_with_random_values(customer_df,"secure_file_uploads_policies__properties__sandboxing",["true"],[1])
        customer_df.loc[:,"secure_file_uploads_policies__properties__encryption__in_transit"] = self.fill_column_with_random_values(customer_df,"secure_file_uploads_policies__properties__encryption__in_transit",["true"],[1])
        customer_df.loc[:,"secure_file_uploads_policies__properties__encryption__at_rest"] = self.fill_column_with_random_values(customer_df,"secure_file_uploads_policies__properties__encryption__at_rest",["true"],[1])
        customer_df.loc[:,"ssl_encryption_required"] = self.fill_column_with_random_values(customer_df,"ssl_encryption_required",["true"],[1])
        customer_df.loc[:,"permissions"] = self.fill_column_with_random_values(customer_df,"permissions",["read", "write", "delete", "create"],[0.3,0.2,0.2,0.3])
        customer_df.loc[:,"other_resources"] = self.fill_column_with_random_values(customer_df,"other_resources",["true"],[1])
        customer_df.loc[:,"explicite_allowed_resources"] = self.fill_column_with_random_values(customer_df, "explicite_allowed_resources",["product_info.txt", "reports.txt","sales.txt","sensitive_data.txt"], [0.2, 0.3, 0.3,0.2])
        
        df.update(customer_df)
       
        #df = df.drop('Idx', axis=1)
        df.to_csv("data/true_data.csv",index=False)
        
columns=["client_id","date_time","method","request","status_code","size","referer","user_system_specs",	
         "type","two_factor_authentication","multi_factor_authentication","security_monitoring","data_privacy_policy",
         "secure_file_uploads","secure_file_uploads_policies__properties__secure_file_name",
         "secure_file_uploads_policies__properties__malware_scan","secure_file_uploads_policies__properties__audit_logging",
         "secure_file_uploads_policies__properties__sandboxing","secure_file_uploads_policies__properties__encryption__in_transit",
         "secure_file_uploads_policies__properties__encryption__at_rest","ssl_encryption_required","permissions","explicite_allowed_resources",
         "other_resources"]
        
        
data_gen=true_data_generation(store_path="data/",columns=columns)       
#data_gen.column_names(columns)
data_gen.data_fill(columns=columns)