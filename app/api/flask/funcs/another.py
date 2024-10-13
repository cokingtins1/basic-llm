# from langchain.text_splitter import CharacterTextSplitter
# from langchain.chains.question_answering import load_qa_chain
from langchain.llms import LlamaCpp
# from langchain.vectorstores import Qdrant
# from langchain.embeddings import SentenceTransformerEmbeddings
from langchain.callbacks.manager import CallbackManager
from langchain.callbacks.streaming_stdout import StreamingStdOutCallbackHandler


from llama_cpp import Llama

def load_model_cpu()-> LlamaCpp:
    callback_manager: CallbackManager = CallbackManager([StreamingStdOutCallbackHandler()])

    llm = LlamaCpp(
        model_path="/home/cokingtins1/Documents/Github/basic-llm/app/api/flask/capybarahermes-2.5-mistral-7b.Q4_K_M.gguf",
        temperature=0,
        max_tokens=128,
        callback_manager=callback_manager,
        verbose=False, 
    )

    return llm

def load_model_gpu()-> LlamaCpp:
    callback_manager: CallbackManager = CallbackManager([StreamingStdOutCallbackHandler()])

    llm = LlamaCpp(
        model_path="/home/cokingtins1/Documents/Github/basic-llm/app/api/flask/capybarahermes-2.5-mistral-7b.Q4_K_M.gguf",
        temperature=0,
        max_tokens=128,
        n_gpu_layers=-1,
        n_batch=512,
        callback_manager=callback_manager,
        verbose=True, 
    )

    return llm

def generate_response(prompt:str):
    # llm = load_model_cpu()
    llm = load_model_gpu()
    response: str = llm(prompt)
    return response

