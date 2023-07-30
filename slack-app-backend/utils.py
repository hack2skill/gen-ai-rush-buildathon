
def get_value_from_payload(payload,desired_key='plain_text_input-action',col='value'):
    value = None
    for key, inner_dict in payload.items():
        if desired_key in inner_dict:
            value = inner_dict[desired_key][col]
            break
    return value