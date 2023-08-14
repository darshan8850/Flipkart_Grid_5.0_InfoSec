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
collection_datasets = mongoDB['customer']
collection_analyzed = mongoDB['analyzed']

device_type="cuda"
show_sources="True"
data=""
query=""


file_path = 'Flipkart_Grid_5.0_InfoSec/Human_generated_Logs/data/json/log_policies.json'

with open(file_path, 'r') as json_file:
    policies = json.load(json_file)
    
# file_path = 'data/new_data.json'
# with open(file_path, 'r') as json_file:
#     instances = json.load(json_file)    
# instance=instances['instance_0']

file_path = 'Flipkart_Grid_5.0_InfoSec/System_generated_Logs/jsons/scores/severity.json'

with open(file_path, 'r') as json_file:
    policy_score = json.load(json_file)



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
   
        # print(random_instance_data)
        # print(temp_data)
        combined_data = {"random_instance_data": random_instance_data, "temp_data": temp_data}
        return jsonify(combined_data)
    
            
    except Exception as e:
        return jsonify({"error": str(e)}), 500
    
    return 'main method not properly executed'

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
      global data
      data=random_instance
      logging.info('random_instance')    
      return jsonify(random_instance)
    except Exception as e:
      return jsonify({"error": str(e)}), 500
    


def score_calculation(instance):
    instance=detect_user(instance)
    tier=instance['type']
    violated_policies=instance['violated_policies']
    score=0
    for i in policy_score["policies"]:
        if(i["name"]==tier):
            policy_score_list=i
    
    
    for key in violated_policies.keys():
        if key in policy_score_list.keys():
            score+=policy_score_list[key]
    return score
        
        

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
            max_ctx_size = 4000
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
        max_length=4000,
        temperature=0,
        top_p=0.95,
        repetition_penalty=1.15,
        generation_config=generation_config,
    )

    local_llm = HuggingFacePipeline(pipeline=pipe)
    logging.info("Local LLM Loaded")

    return local_llm

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
    
    #model_id = "TheBloke/Llama-2-7B-Chat-GGML"
    #model_basename = "llama-2-7b-chat.ggmlv3.q4_0.bin"
    
    # for GPTQ (quantized) models
    #model_id = "TheBloke/Nous-Hermes-13B-GPTQ"
    #model_basename = "nous-hermes-13b-GPTQ-4bit-128g.no-act.order"
    #model_id = "TheBloke/WizardLM-30B-Uncensored-GPTQ"
    #model_basename = "WizardLM-30B-Uncensored-GPTQ-4bit.act-order.safetensors" # Requires
    # ~21GB VRAM. Using STransformers alongside can potentially create OOM on 24GB cards.
    # model_id = "TheBloke/wizardLM-7B-GPTQ"
    # model_basename = "wizardLM-7B-GPTQ-4bit.compat.no-act-order.safetensors"
    model_id = "TheBloke/EverythingLM-13B-16K-GPTQ"
    model_basename = "gptq_model-4bit-128g.safetensors"

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
    query=data
   
    context=json.dumps(query)
   
    rules=json.dumps(policies)

    question="Based on context given policies to be followed, what are the policy violations?"
    logging.info(f" success - question generated")
  
    data_prompt='Context: '+context+'\n'+'History: '+rules+'\n'+'Question: '+question+'\n'
    print(data_prompt)
    res = qa(data_prompt)
    answer, docs = res["result"], res["source_documents"]
    logging.info(f" 261 - qa analyzed answer")
    print(f"*********************{answer}")
    return jsonify({"answer":answer})

if __name__ == '__main__':
    logging.basicConfig(
        format="%(asctime)s - %(levelname)s - %(filename)s:%(lineno)s - %(message)s", level=logging.INFO
    )
    app.run(debug=True)