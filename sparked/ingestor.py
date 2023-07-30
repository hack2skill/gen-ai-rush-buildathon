def convert_to_openai_function_schema(api_schema, function_names_descriptions):
    """
    Convert API JSON Schema to OpenAI Function JSON Schema.
    
    Args:
        api_schema (dict): The API JSON Schema to be converted.
        function_names_descriptions (dict): A dictionary mapping function names to their descriptions.

    Returns:
        list: A list of OpenAI Function JSON Schemas.
    """
    function_schemas = []
    
    for function_name, function_description in function_names_descriptions.items():
        # Create the OpenAI Function JSON Schema
        function_schema = {
            'name': function_name,
            'description': function_description,
            'parameters': {
                'type': 'object',
                'properties': {},
                'required': []
            }
        }

        # Add the properties from the API schema to the OpenAI Function schema
        for prop_name, prop_details in api_schema[function_name]['properties'].items():
            function_schema['parameters']['properties'][prop_name] = prop_details

        # Add the required properties from the API schema to the OpenAI Function schema
        for required_prop in api_schema[function_name]['required']:
            function_schema['parameters']['required'].append(required_prop)

        function_schemas.append(function_schema)
        
    return function_schemas

api_schema_doc = {
    "get_current_weather": {
        "type": "object",
        "properties": {
            "location": {
                "type": "string",
                "description": "The city and state, e.g. San Francisco, CA"
            },
            "unit": {
                "type": "string",
                "enum": ["celsius", "fahrenheit"],
                "description": "Unit of measurement for the temperature"
            }
        },
        "required": ["location"]
    },
    "get_forecast_weather": {
        "type": "object",
        "properties": {
            "location": {
                "type": "string",
                "description": "The city and state, e.g. San Francisco, CA"
            },
            "days": {
                "type": "number",
                "description": "The number of days for the forecast"
            }
        },
        "required": ["location", "days"]
    }
}

function_names_descriptions = {
    "get_current_weather": "Get the current weather in a given location",
    "get_forecast_weather": "Get the weather forecast for a given location"
}

openai_function_schemas = convert_to_openai_function_schema(api_schema_doc, function_names_descriptions)

for openai_function_schema in openai_function_schemas:
    print(openai_function_schema)
