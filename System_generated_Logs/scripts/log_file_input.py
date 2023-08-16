import re
import os
from tqdm import tqdm
import pandas as pd
import chardet



formats = {
    'combined': '^(?P<client>\S+) \S+ (?P<userid>\S+) \[(?P<datetime>[^\]]+)\] "(?P<method>[A-Z]+) (?P<request>[^ "]+)? HTTP/[0-9.]+" (?P<status>[0-9]{3}) (?P<size>[0-9]+|-) "(?P<referrer>[^"]*)" "(?P<useragent>[^"]*)',
    # Add more formats and their corresponding regex patterns here
}

columns = ['client', 'userid', 'datetime', 'method', 'request', 'status', 'size', 'referer', 'user_agent']

class LogAnalysis:
    def __init__(self, formats, columns):
        self.formats = formats
        self.columns = columns
        
    
            
    def detect_format(self, logfile):
    
        _, file_extension =logfile.rsplit('.', 1)
 
        
        def change_extension(file_path, new_ext):
          if os.path.isfile(file_path):
            directory, filename = os.path.split(file_path)
            old_filename, old_ext = os.path.splitext(filename)
        
            if old_ext:
              new_filename = old_filename + new_ext
              new_path = os.path.join(directory, new_filename)
              os.rename(file_path, new_path)
              print(f"Renamed {filename} to {new_filename}")
              return new_path
            else:
              print(f"The file '{filename}' does not have an extension to replace.")
          else:
            print(f"The provided path '{file_path}' does not point to a valid file.")
            
        for format_name, regex_pattern in self.formats.items():
            if file_extension.lower() == 'pdf':
                new_extension = '.log'
                new_path=change_extension(logfile,new_extension)
                return new_path

            elif file_extension.lower() == 'txt':
                new_extension = '.log'
                new_path=change_extension(logfile,new_extension)
                return new_path
                
            elif file_extension.lower() == 'log':
                with open(logfile, 'r') as source_file:
                    first_line = source_file.readline()
                    if re.match(regex_pattern, first_line):
                        return logfile
            


    def parse_log_file(self, logfile, output_dir, errors_file):
      combined_regex = self.formats['combined']

      with open(logfile, 'rb') as source_file:
        linenumber = 0
        parsed_lines = []
        raw_data = source_file.read()

        # Detect the encoding using chardet
        result = chardet.detect(raw_data)
        encoding = result['encoding']

        # Decode the raw data using the detected encoding
        decoded_data = raw_data.decode(encoding)
        for line in tqdm(source_file):
                try:
                    log_line = re.findall(combined_regex, line)[0]
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

file = 'log_text.txt'
output_dir = 'parquets/'
errors_file = 'errors.txt'


log_analysis = LogAnalysis(formats, columns)
logfile=log_analysis.detect_format(file)
log_analysis.parse_log_file(logfile, output_dir, errors_file)


logs_df = pd.read_parquet(output_dir)
logs_df.to_csv('logs2.csv', index=True)
