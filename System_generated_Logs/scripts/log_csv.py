import re
import os
import time
from tqdm import tqdm
import pandas as pd


class Log_csv:
    def __init__(self):
        self.columns =['client', 'datetime', 'method', 'request', 'status', 'size', 'referer', 'user_agent']
        self.pattern = r'^(.*?) - (.*?), (.*?), (.*?), (.*?), (\d+), (\d+), (.*?), (Windows|Mac|Linux|Android|iOS)$'

    def parse_log_file(self, logfile, output_dir, errors_file):
        with open(logfile) as source_file:
            linenumber = 0
            parsed_lines = []
            for line in tqdm(source_file):
                try:
                    match = re.match(self.pattern, line)
                except Exception as e:
                    with open(errors_file, 'at') as errfile:
                        print((line, str(e)), file=errfile)
                    continue
                linenumber += 1
                if match:
                    #print(match.groups()[1:])
                    parsed_lines.append(match.groups()[1:])

                if linenumber%5000==0:
                    df = pd.DataFrame(parsed_lines, columns=self.columns)
                    df.to_parquet(f'{output_dir}/file_{linenumber}.parquet')
                    parsed_lines.clear()

            if parsed_lines:
                df = pd.DataFrame(parsed_lines, columns=self.columns)
                df.to_parquet(f'{output_dir}/file_{linenumber}.parquet')
                parsed_lines.clear()
    
    def merge_with_confi(self,logs_df,confi_df_path,store_path):
        confi_df=pd.read_csv(confi_df_path,index_col=False)
        merge_df=pd.concat([logs_df, confi_df], ignore_index=True)
        merge_df.to_csv(store_path, index=False)
        

# Usage
parser = Log_csv()
logfile = 'data/conversion.log'
output_dir = 'data/temp_data/parquets/'
errors_file = 'data/errors.txt'
parser.parse_log_file(logfile, output_dir, errors_file)


logs_df = pd.read_parquet(output_dir)
parser.merge_with_confi(logs_df=logs_df,confi_df_path="data/temp_data/config.csv",store_path="data/merge.csv")