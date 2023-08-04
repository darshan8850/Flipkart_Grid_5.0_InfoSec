import re
import os
import time
from tqdm import tqdm
import pandas as pd

common_regex = '^(?P<client>\S+) \S+ (?P<userid>\S+) \[(?P<datetime>[^\]]+)\] "(?P<method>[A-Z]+) (?P<request>[^ "]+)? HTTP/[0-9.]+" (?P<status>[0-9]{3}) (?P<size>[0-9]+|-)'
combined_regex = '^(?P<client>\S+) \S+ (?P<userid>\S+) \[(?P<datetime>[^\]]+)\] "(?P<method>[A-Z]+) (?P<request>[^ "]+)? HTTP/[0-9.]+" (?P<status>[0-9]{3}) (?P<size>[0-9]+|-) "(?P<referrer>[^"]*)" "(?P<useragent>[^"]*)'
columns = ['client', 'userid', 'datetime', 'method', 'request', 'status', 'size', 'referer', 'user_agent']

class LogAnalysis:
    def __init__(self, combined_regex, columns):
        self.combined_regex = combined_regex
        self.columns = columns

    def parse_log_file(self, logfile, output_dir, errors_file):
        with open(logfile) as source_file:
            linenumber = 0
            parsed_lines = []
            for line in tqdm(source_file):
                try:
                    log_line = re.findall(self.combined_regex, line)[0]
                    parsed_lines.append(log_line)
                except Exception as e:
                    with open(errors_file, 'at') as errfile:
                        print((line, str(e)), file=errfile)
                    continue
                linenumber += 1
                if linenumber % 250_000 == 0:
                    df = pd.DataFrame(parsed_lines, columns=self.columns)
                    df.to_parquet(f'{output_dir}/file_{linenumber}.parquet')
                    parsed_lines.clear()
            else:
                df = pd.DataFrame(parsed_lines, columns=self.columns)
                df.to_parquet(f'{output_dir}/file_{linenumber}.parquet')
                parsed_lines.clear()



logfile = 'data/access.log'
output_dir = 'data/parquets/'
errors_file = 'data/errors.txt'

log_analysis = LogAnalysis(combined_regex, columns)

log_analysis.parse_log_file(logfile, output_dir, errors_file)
logs_df = pd.read_parquet('data/parquets/')
logs_df.to_csv('data/logs.csv', index=True)