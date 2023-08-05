import numpy as np
import pandas as pd
import random 

from numpy.random import choice

class data_generation:
    def __init__(self,store_path):
        self.store_path = store_path
        
    def column_names(self,columns):
        self.columns = columns 

        df=pd.DataFrame(columns=self.columns)
        #save df at store_path
        complete_file_path = self.store_path + "/" + "data.csv"
        df.to_csv(complete_file_path,index=False)

    def fill_column_with_random_values(self,dataframe, column_name, unique_values, percentages):
        
        randomList = choice(unique_values, len(dataframe),p=percentages)
        dataframe[column_name] = randomList
        
        return dataframe[column_name]
    
    def generate_meaningful_filename(self,dataframe,column_name):
        adjectives = ["beautiful", "clever", "happy", "creative", "brave", "sunny"]
        nouns = ["world", "day", "sun", "flower", "bird", "ocean"]
        extensions_harmful = ['.exe', '.bat', '.cmd', '.vbs', '.js', '.jar', '.msi', '.py', '.ps1', '.sh']
        extensions_non_harmful = [".txt", ".csv", ".xlsx", ".pdf",".img",".png",".jpeg",".mp4"]
    
        adjective = random.choice(adjectives)
        noun = random.choice(nouns)
    
        percentage_harmful = 20  
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
    
    def generate_random_url(self):
        
        protocol = ["https"]
        sub_domain = ["www", "admin", "api"]
        domain = ["flipkart"]
        top_level_domain = ["com"]

        folders=["sensitve_data.txt", "sales.txt", "reports.txt", "product_info.txt","sales.txt", "reports.txt", "product_info.txt","product_info.txt", "userId_info.txt"]
        tier=["tier1", "tier2", "tier3"]
        codes=["200", "201", "204", "400"]
        slug = ["about-us", "contact", "services", "blog", "products", "faq", "testimonials", "gallery", "careers", "news"]

        parameters = ["tier1", "tier2", "tier3"]
        
        random_protocol = random.choice(protocol)
        random_sub_domain = random.choice(sub_domain)
        random_domain = random.choice(domain)
        random_top_level_domain = random.choice(top_level_domain)

    
        random_folder_name = random.choice(folders)
        random_tier = random.choice(tier)
        random_code = random.choice(codes)

        random_slug = random.choice(slug)

        random_parameter = random.choice(parameters)
        id=random.randint(1001, 9999)

        url = f"{random_protocol}://{random_sub_domain}.{random_domain}.{random_top_level_domain}/{random_folder_name}/{random_slug}?client_type={random_tier}&client_id={id}"

        return url

    def data_fill(self):
        df=pd.read_csv("F:\Flipkart_Grid_5.0_InfoSec\data\data.csv")
        
        df["method"]=self.fill_column_with_random_values(df,"method",["GET","POST","PUT","DELETE"],[0.5,0.3,0.1,0.1])
        
        url=[]
        for _ in range(len(df)):
           random_url = self.generate_random_url()
           url.append(random_url)
        df["request"]=url
           
        
        df["status_code"]=self.fill_column_with_random_values(df,"status_code",["200","201","204","400","403","409","429","451"],[0.2,0.15,0.15,0.1,0.1,0.1,0.1,0.1])
        df["size"]=np.random.randint(10,1000,size=len(df))
        df["referer"]=self.fill_column_with_random_values(df,"referer",["https://www.google.com/","https://www.facebook.com/","https://www.youtube.com/","https://www.amazon.com/","https://www.wikipedia.org/","https://www.twitter.com/","https://www.instagram.com/","https://www.reddit.com/","https://www.yahoo.com/","https://www.ebay.com/"],[0.1,0.1,0.1,0.1,0.1,0.1,0.1,0.1,0.1,0.1])
        df["user_system_specs"]=self.fill_column_with_random_values(df,"user_system_specs",["Windows","Mac","Linux","Android","iOS"],[0.2,0.2,0.2,0.2,0.2])
        df["type"]=self.fill_column_with_random_values(df,"type",["customer","admin","employee","anonymous"],[0.6,0.1,0.2,0.1])
        
        columns_to_fill = ["secure_file_uploads","secure_file_uploads_policies__properties__secure_file_name",
         "secure_file_uploads_policies__properties__malware_scan","secure_file_uploads_policies__properties__audit_logging",
         "secure_file_uploads_policies__properties__sandboxing","secure_file_uploads_policies__properties__encryption__in_transit",
         "secure_file_uploads_policies__properties__encryption__at_rest","ssl_encryption_required","permissions","explicite_allowed_resources",
         "other_resources"]
        df.loc[df["type"] == "anonymous", columns_to_fill] = df.loc[df["type"] == "anonymous", columns_to_fill].fillna(value="unknown")
        
        df["two_factor_authentication"]=self.fill_column_with_random_values(df,"two_factor_authentication",["true","false"],[0.8,0.2])
        df["multi_factor_authentication"]=self.fill_column_with_random_values(df,"multi_factor_authentication",["true","false"],[0.8,0.2])
        df["security_monitoring"]=self.fill_column_with_random_values(df,"security_monitoring",["true","false"],[0.8,0.2])
        df["data_privacy_policy"]=self.fill_column_with_random_values(df,"data_privacy_policy",["true","false"],[0.8,0.2])
        df["secure_file_uploads"]=self.fill_column_with_random_values(df,"secure_file_uploads",["true","false","unknown"],[0.8,0.1,0.1])
        df["secure_file_uploads_policies__properties__secure_file_name"]=self.generate_meaningful_filename(df,"secure_file_uploads_policies__properties__secure_file_name")
        df["secure_file_uploads_policies__properties__malware_scan"]=self.fill_column_with_random_values(df,"secure_file_uploads_policies__properties__malware_scan",["true","false"],[0.8,0.2])
        df["secure_file_uploads_policies__properties__audit_logging"]=self.fill_column_with_random_values(df,"secure_file_uploads_policies__properties__audit_logging",["true","false"],[0.8,0.2])  
        df["secure_file_uploads_policies__properties__sandboxing"]=self.fill_column_with_random_values(df,"secure_file_uploads_policies__properties__sandboxing",["true","false"],[0.8,0.2])    
        df["secure_file_uploads_policies__properties__encryption__in_transit"]=self.fill_column_with_random_values(df,"secure_file_uploads_policies__properties__encryption__in_transit",["true","false"],[0.8,0.2])
        df["secure_file_uploads_policies__properties__encryption__at_rest"]=self.fill_column_with_random_values(df,"secure_file_uploads_policies__properties__encryption__at_rest",["true","false"],[0.8,0.2])
        df["ssl_encryption_required"]=self.fill_column_with_random_values(df,"ssl_encryption_required",["true","false"],[0.8,0.2])
        df["permissions"]=self.fill_column_with_random_values(df,"permissions",["read", "write", "delete", "create","none"],[0.3,0.2,0.1,0.2,0.2])
        df["explicite_allowed_resources"]=self.fill_column_with_random_values(df,"explicite_allowed_resources",["sensitive_data.txt","sales.txt","reports.txt"],[0.4,0.3,0.3])
        df["other_resources"]=self.fill_column_with_random_values(df,"other_resources",["true","false"],[0.7,0.3])
        
        
        df.to_csv("F:/Flipkart_Grid_5.0_InfoSec/data/data.csv",index=False)
        
        
        
        


columns=["client_id","date_time","method","request","status_code","size","referer","user_system_specs",	
         "type","two_factor_authentication","multi_factor_authentication","security_monitoring","data_privacy_policy",
         "secure_file_uploads","secure_file_uploads_policies__properties__secure_file_name",
         "secure_file_uploads_policies__properties__malware_scan","secure_file_uploads_policies__properties__audit_logging",
         "secure_file_uploads_policies__properties__sandboxing","secure_file_uploads_policies__properties__encryption__in_transit",
         "secure_file_uploads_policies__properties__encryption__at_rest","ssl_encryption_required","permissions","explicite_allowed_resources",
         "other_resources"]
        
        
data_gen=data_generation(store_path="data/")       
#data_gen.column_names(columns)
data_gen.data_fill()
