import wikipedia

def get_wiki(query):
    # wikipedia.set_lang("en")
    # print(wikipedia.summary(query, sentences=2))
    return wikipedia.summary(query, sentences=2)

if __name__ == "__main__":
    print(get_wiki("Generative Artificial Inteligence"))
    
