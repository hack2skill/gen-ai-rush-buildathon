functions = [
    {
        "name": "get_analytics_data",
        "description": "Get analytical data from analytics software",
        "parameters": {
            "type": "object",
            "properties": {
                "question": {"type": "string", "description": "Question in Natural Language"},
            },
            "required": ["question"],
        },
    },
    {
    "name": "send_email",
    "description": "Send an email to a specified recipient",
    "parameters": {
        "type": "object",
        "properties": {
            "to": {"type": "string", "description": "The email address of the recipient"},
            "subject": {"type": "string", "description": "The subject of the email"},
            "body": {"type": "string", "description": "The body content of the email"},
        },
        "required": ["to", "subject", "body"],
    }
    },
    {"name": "get_business_contextual_information",
    "description": "Suggest business contextual information from local learnings",
    "parameters": {"type": "object", "properties": {}},
    },
    {
        "name": "save_workflow",
        "description": "Save the workflow to be executed when wanted",
        "parameters":{
            "type": "object",
            "properties": {
                "ask": {"type": "string", "description": "Descriptive information about the workflow with all the steps"},
            },
            "required": ["ask"]
        }
    },
    {
        "name": "execute_workflow",
        "description": "Execute the workflows when user's day begins",
        "parameters":{
            "type": "object",
            "properties": {},
        }
    }


]
functions_bq = [
    {
        "name": "execute_bigquery_query",
        "description": "Executes sql against the bigquery table and returns result",
        "parameters": {
            "type": "object",
            "properties": {
                "query": {"type": "string", "description": "SQL Command"},
            },
            "required": ["query"],
        },
    }
]
functions_workflow = [
    {
        "name": "get_analytics_data",
        "description": "Get analytical data from analytics software",
        "parameters": {
            "type": "object",
            "properties": {
                "question": {"type": "string", "description": "Question in Natural Language"},
            },
            "required": ["question"],
        },
    },
    {
    "name": "send_email",
    "description": "Send an email to a specified recipient",
    "parameters": {
        "type": "object",
        "properties": {
            "to": {"type": "string", "description": "The email address of the recipient"},
            "subject": {"type": "string", "description": "The subject of the email"},
            "body": {"type": "string", "description": "The body content of the email"},
        },
        "required": ["to", "subject", "body"],
    }
    },
    {"name": "get_business_contextual_information",
    "description": "Suggest business contextual information from local learnings",
    "parameters": {"type": "object", "properties": {}},
    },


]