from utils.process_files import process_file
from queue import Queue
import os

def bfs_traversal(root_dir):
    queue = Queue()
    queue.put(root_dir)
    file_dict = []
    i=0

    while not queue.empty():
        current_dir = queue.get()

        try:
            with os.scandir(current_dir) as entries:
                for entry in entries:
                    
                    if entry.is_dir():
                        queue.put(entry.path)
                    else:
                        #sends the file path to the function that will process the code
                        print(i)
                        i+=1
                        print(entry.path)
                        file_dict.append(entry.path)
                        process_file(entry.path)
        except OSError as e:
            print("Error accessing directory:", e)
    print(file_dict)


def bfs_traversal_with_models_py(root_dir):
    queue = Queue()
    queue.put(root_dir)

    while not queue.empty():
        current_dir = queue.get()

        try:
            with os.scandir(current_dir) as entries:
                for entry in entries:
                    if entry.is_dir():
                        queue.put(entry.path)
                    else:
                        if entry.name=="models.py":
                            #sends the file path to the function that will process the code
                            process_file(entry.path)
        except OSError as e:
            print("Error accessing directory:", e)