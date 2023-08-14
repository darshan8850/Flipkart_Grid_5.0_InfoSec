import logging
import json
import requests
import click
import torch
from pymongo import MongoClient
from flask_cors import CORS
from flask import Flask, jsonify, request

# model
from auto_gptq import AutoGPTQForCausalLM
from huggingface_hub import hf_hub_download
from langchain.chains import RetrievalQA
from langchain.embeddings import HuggingFaceInstructEmbeddings
from langchain.llms import HuggingFacePipeline, LlamaCpp
from langchain.memory import ConversationBufferMemory
from langchain.prompts import PromptTemplate
from langchain.vectorstores import Chroma
from transformers import (
    AutoModelForCausalLM,
    AutoTokenizer,
    GenerationConfig,
    LlamaForCausalLM,
    LlamaTokenizer,
    pipeline,
)
from constants import CHROMA_SETTINGS, EMBEDDING_MODEL_NAME, PERSIST_DIRECTORY

app = Flask(__name__)
CORS(app)
mongo_connection_string = 'mongodb+srv://mrunal21:mrunal21@cluster0.eugjmpy.mongodb.net'
prompt = "what are security policy violations in this?"
client = MongoClient(mongo_connection_string)
mongoDB = client['violatedData']
collection_datasets = mongoDB['datasets']
collection_analyzed = mongoDB['analyzed']

device_type="cpu"
show_sources="True"
data=""
answer=""

file_path = 'Flipkart_Grid_5.0_InfoSec/System_generated_Logs/jsons/attacks/security_attacks.json'

with open(file_path, 'r') as json_file:
    security_attacks = json.load(json_file)
    
# file_path = 'data/new_data.json'
# with open(file_path, 'r') as json_file:
#     instances = json.load(json_file)    
# instance=instances['instance_0']

#flask


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

@app.route('/main_method')
def main_method():
    try:
        
        random_instance_response = requests.get('http://127.0.0.1:5000/random_instance')
        temp_response = requests.get('http://127.0.0.1:5000/temp')
        
        if random_instance_response.status_code != 200:
            return jsonify({"error": "Failed to fetch random instance data"}), random_instance_response.status_code
        
        if temp_response.status_code != 200:
            return jsonify({"error": "Failed to fetch temp data"}), temp_response.status_code 
        
        random_instance_data = random_instance_response.json()
        temp_data = temp_response.json()
   
        print(random_instance_data)
        print(temp_data)
        combined_data = {"random_instance_data": random_instance_data, "temp_data": temp_data}
        return jsonify(combined_data)
    
            
    except Exception as e:
        return jsonify({"error": str(e)}), 500


@app.route('/random_instance', methods=['GET'])
def get_random_instance():
    try:
      pipeline = [
        {"$sample": {"size": 1}}
      ]
      result = collection_datasets.aggregate(pipeline)
      result_list = list(result)
      random_instance = result_list[0]
      random_instance['_id'] = str(random_instance['_id'])

    #   instance=detect_user(instance)
    #   context=context_gen(instance)
    #   rules=rule_gen(instance)
    #   question=" "
      global data
      data=json.dumps(random_instance)
      logging.info('random_instance')    
      return jsonify(random_instance)
    except Exception as e:
      return jsonify({"error": str(e)}), 500
    
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
                      extension="."+last_exe[-1]
                      if extension not in [".txt", ".csv", ".xlsx", ".pdf",".img",".png",".jpeg",".mp4"]:
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
            if "explicite_allowed_resources" in user_rule and instance["explicite_allowed_resources"] not in user_rule["explicite_allowed_resources"]:
                violations["explicite_allowed_resources"]=instance["explicite_allowed_resources"]
   
    return violations

def detect_user(instance):
    new_instance={}
    for key, value in instance.items():
        new_instance[key] = value
    
    violated_polices={}
    violations=check_policy_violation(instance)
    
    new_instance["violated_policies"]=violations
    
    return new_instance

def load_model(device_type, model_id, model_basename=None):
    """
    Select a model for text generation using the HuggingFace library.
    If you are running this for the first time, it will download a model for you.
    subsequent runs will use the model from the disk.

    Args:
        device_type (str): Type of device to use, e.g., "cuda" for GPU or "cpu" for CPU.
        model_id (str): Identifier of the model to load from HuggingFace's model hub.
        model_basename (str, optional): Basename of the model if using quantized models.
            Defaults to None.

    Returns:
        HuggingFacePipeline: A pipeline object for text generation using the loaded model.

    Raises:
        ValueError: If an unsupported model or device type is provided.
    """
    logging.info(f"Loading Model: {model_id}, on: {device_type}")
    logging.info("This action can take a few minutes!")

    if model_basename is not None:
        if ".ggml" in model_basename:
            logging.info("Using Llamacpp for GGML quantized models")
            model_path = hf_hub_download(repo_id=model_id, filename=model_basename)
            max_ctx_size = 2048
            kwargs = {
                "model_path": model_path,
                "n_ctx": max_ctx_size,
                "max_tokens": max_ctx_size,
            }
            if device_type.lower() == "mps":
                kwargs["n_gpu_layers"] = 1000
            if device_type.lower() == "cuda":
                kwargs["n_gpu_layers"] = 1000
                kwargs["n_batch"] = max_ctx_size
            return LlamaCpp(**kwargs)

        else:
            # The code supports all huggingface models that ends with GPTQ and have some variation
            # of .no-act.order or .safetensors in their HF repo.
            logging.info("Using AutoGPTQForCausalLM for quantized models")

            if ".safetensors" in model_basename:
                # Remove the ".safetensors" ending if present
                model_basename = model_basename.replace(".safetensors", "")

            tokenizer = AutoTokenizer.from_pretrained(model_id, use_fast=True)
            logging.info("Tokenizer loaded")

            model = AutoGPTQForCausalLM.from_quantized(
                model_id,
                model_basename=model_basename,
                use_safetensors=True,
                trust_remote_code=True,
                device="cuda:0",
                use_triton=False,
                quantize_config=None,
            )
    elif (
        device_type.lower() == "cuda"
    ):  # The code supports all huggingface models that ends with -HF or which have a .bin
        # file in their HF repo.
        logging.info("Using AutoModelForCausalLM for full models")
        tokenizer = AutoTokenizer.from_pretrained(model_id)
        logging.info("Tokenizer loaded")

        model = AutoModelForCausalLM.from_pretrained(
            model_id,
            device_map="auto",
            torch_dtype=torch.float16,
            low_cpu_mem_usage=True,
            trust_remote_code=True,
            # max_memory={0: "15GB"} # Uncomment this line with you encounter CUDA out of memory errors
        )
        model.tie_weights()
    else:
        logging.info("Using LlamaTokenizer")
        tokenizer = LlamaTokenizer.from_pretrained(model_id)
        model = LlamaForCausalLM.from_pretrained(model_id)

    # Load configuration from the model to avoid warnings
    generation_config = GenerationConfig.from_pretrained(model_id)
    # see here for details:
    # https://huggingface.co/docs/transformers/
    # main_classes/text_generation#transformers.GenerationConfig.from_pretrained.returns

    # Create a pipeline for text generation
    pipe = pipeline(
        "text-generation",
        model=model,
        tokenizer=tokenizer,
        max_length=2048,
        temperature=0,
        top_p=0.95,
        repetition_penalty=1.15,
        generation_config=generation_config,
    )

    local_llm = HuggingFacePipeline(pipeline=pipe)
    logging.info("Local LLM Loaded")

    return local_llm
  
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

def rule_gen(instance):
    keys=find_violated_polices(instance).keys()
    rules={}
    for key in keys:
        rules[key]=security_attacks[key]
    return rules

@click.command()
@click.option(
    "--device_type",
    default="cuda" if torch.cuda.is_available() else "cpu",
    type=click.Choice(
        [
            "cpu",
            "cuda",
            "ipu",
            "xpu",
            "mkldnn",
            "opengl",
            "opencl",
            "ideep",
            "hip",
            "ve",
            "fpga",
            "ort",
            "xla",
            "lazy",
            "vulkan",
            "mps",
            "meta",
            "hpu",
            "mtia",
        ],
    ),
    help="Device to run on. (Default is cuda)",
)
@click.option(
    "--show_sources",
    "-s",
    is_flag=True,
    help="Show sources along with answers (Default is False)",
)

@app.route('/temp')
def temp():
    logging.info(f"Running on: {device_type}")
    logging.info(f"Display Source Documents set to: {show_sources}")
    embeddings = HuggingFaceInstructEmbeddings(model_name=EMBEDDING_MODEL_NAME, model_kwargs={"device": device_type})
    db = Chroma(
        persist_directory=PERSIST_DIRECTORY,
        embedding_function=embeddings,
        client_settings=CHROMA_SETTINGS,
    )
    retriever = db.as_retriever()
    
    model_id = "TheBloke/Llama-2-7B-Chat-GGML"
    model_basename = "llama-2-7b-chat.ggmlv3.q4_0.bin"

    template = """Use the following pieces of context to answer the question at the end. If you don't know the answer,\
just say that you don't know, don't try to make up an answer.{context} {history} Question: {question} Helpful Answer:"""

    prompt = PromptTemplate(input_variables=["history", "context", "question"], template=template)
    memory = ConversationBufferMemory(input_key="question", memory_key="history")
    llm = load_model(device_type, model_id=model_id, model_basename=model_basename)
    logging.info(f" 246 - load model called")
    qa = RetrievalQA.from_chain_type(
        llm=llm,
        chain_type="stuff",
        retriever=retriever,
        return_source_documents=True,
        chain_type_kwargs={"prompt": prompt, "memory": memory},
    )
    logging.info(f" 259 - qa instance made")
    res = qa(data)
    answer, docs = res["result"], res["source_documents"]
    logging.info(f" 261 - qa analyzed answer")
    return jsonify({"answer":answer})

@app.route('/testing')
def testing():
    testData = {
    "random_instance_data": {
        "_id": "64d0eb1d797d10ff6acb5d72",
        "client_id": "46.209.150.50",
        "data_privacy_policy": "true",
        "date_time": "22/Jan/2019:12:46:43 +0330",
        "explicite_allowed_resources": "userId_info.txt",
        "method": "PUT",
        "multi_factor_authentication": "false",
        "other_resources": "false",
        "permissions": "none",
        "referer": "https://www.instagram.com/",
        "request": "https://api.flipkart.com/reports.txt/gallery?client_type=tier3&client_id=8538",
        "secure_file_uploads": "true",
        "secure_file_uploads_policies_properties_audit_logging": "false",
        "secure_file_uploads_policies_propertiesencryption_at_rest": "true",
        "secure_file_uploads_policies_propertiesencryption_in_transit": "true",
        "secure_file_uploads_policies_properties_malware_scan": "true",
        "secure_file_uploads_policies_properties_sandboxing": "true",
        "secure_file_uploads_policies_properties_secure_file_name": "brave_world.jpeg",
        "security_monitoring": "true",
        "size": 452,
        "ssl_encryption_required": "true",
        "status_code": 200,
        "two_factor_authentication": "true",
        "type": "customer",
        "user_system_specs": "Linux"
    },
    "temp_data": {
            "answer": " I'm just an AI, I don't have access to external information or systems, so I can't provide you with the exact password policy for Flipkart. Additionally, it is not appropriate or ethical to share or use someone else's password policies without proper authorization. It is important to respect the security and privacy of others' systems and data. If you have any other questions or concerns, feel free to ask!"
    }
    }
    
    return jsonify(testData)

# flask
if __name__ == '__main__':
    logging.basicConfig(
        format="%(asctime)s - %(levelname)s - %(filename)s:%(lineno)s - %(message)s", level=logging.INFO
    )
    app.run(debug=True)