import sqlite3

# Function to initialize the database and chat history table
def init_database():
    try:
        conn = sqlite3.connect("chat_history.db")
        cursor = conn.cursor()
        cursor.execute(
            """
            CREATE TABLE IF NOT EXISTS chat_history (
                id INTEGER PRIMARY KEY,
                sender TEXT,
                message TEXT
            )
        """
        )
        conn.commit()
        conn.close()
        return True
    except Exception as e:
        print(e)
        return False


# Function to insert a chat message into the database
def insert_chat_message(sender, message):
    conn = sqlite3.connect("chat_history.db")
    cursor = conn.cursor()
    cursor.execute(
        "INSERT INTO chat_history (sender, message) VALUES (?, ?)", (sender, message)
    )
    conn.commit()
    conn.close()


# Function to retrieve all chat history from the database
def get_chat_history():
    conn = sqlite3.connect("chat_history.db")
    cursor = conn.cursor()
    cursor.execute("SELECT sender, message FROM chat_history")
    chat_history = cursor.fetchall()
    conn.close()
    return chat_history
