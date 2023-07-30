from transformers import BertTokenizer, BertModel
from utils.create_embeddings import embedding
from utils.infinite_gpt import process_chunks
model_name = 'bert-base-uncased'
tokenizer = BertTokenizer.from_pretrained(model_name)
model = BertModel.from_pretrained(model_name)

embedding_List = []
for_gpt = []
def process_file(file_path):
    with open(file_path, 'r', encoding='utf-8') as file:
        prompt_text = file.read()
        for_gpt.append(prompt_text)
        result = embedding(prompt_text)
        # embedding_List.append(result)
        # print(result)
        # Process the file here
        # print(prompt_text)
    return (prompt_text,result)

    # print(for_gpt)
    # prompt = ' '.join(for_gpt)
    # process_chunks(prompt, f'output.md')
        

    # print(embedding_List)