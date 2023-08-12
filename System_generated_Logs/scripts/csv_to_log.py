import csv
import logging


logging.basicConfig(filename='conversion.log', level=logging.INFO, format='%(asctime)s - %(levelname)s - %(message)s')

def csv_to_log(csv_file_path):
    try:
        with open(csv_file_path, 'r') as csv_file:
            csv_reader = csv.reader(csv_file)
            for row in csv_reader:
                
                log_message = ', '.join(row)
                logging.info(log_message)
                
        logging.info("CSV to log conversion completed successfully.")
    except Exception as e:
        logging.error("Error occurred: %s", str(e))

if __name__ == "__main__":
    csv_file_path = "F:/Flipkart_Grid_5.0_InfoSec/data/log_csv.csv" 
    csv_to_log(csv_file_path)
