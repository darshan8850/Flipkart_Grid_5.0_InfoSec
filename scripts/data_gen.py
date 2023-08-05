import numpy as np
import pandas as pd
import random as rd

class data_generation:
    def __init__(self,store_path):
        self.store_path = store_path
        
    def column_names(self,columns):
        self.columns = columns 

        df=pd.DataFrame(columns=self.columns)
        #save df at store_path
        df.to_csv(self.store_path,index=False)
    def 
        
