from flask import Flask, jsonify, request
from flask_cors import CORS
import whois
import socket
import ssl
import requests
from datetime import datetime

app = Flask(__name__)
CORS(app)

def get_ip_address(domain):
    try:
        return socket.gethostbyname(domain)
    except socket.gaierror:
        return None

def check_domain_registration(domain_name):
    try:
        w = whois.whois(domain_name)
        if w.status:
            creation_date = w.creation_date[0] if isinstance(w.creation_date, list) else w.creation_date
            expiration_date = w.expiration_date[0] if isinstance(w.expiration_date, list) else w.expiration_date
            output = {
                'domain_name': w.domain_name, 
                'country': w.country, 
                'creation_date': creation_date.date().strftime('%Y-%m-%d') if creation_date else None,
                'expiration_date': expiration_date.date().strftime('%Y-%m-%d') if expiration_date else None
            }
            return True, output
        else:
            return False, None
    except whois.parser.PywhoisError:
        return False, None



def check_web_safe_evaluation(domain):
    url = f"https://transparencyreport.google.com/safe-browsing/search?url={domain}"
    norton_url = f"https://safeweb.norton.com/report/show?url={domain}"

    response = requests.get(url)
    norton_response = requests.get(norton_url)

    if response.status_code == 200 or "No unsafe content found" in response.text:
        google_websafe = True
    else:
        google_websafe = False

    if norton_response.status_code == 200 or "This site is safe" in norton_response.text:
        norton_websafe = True
    else:
        norton_websafe = False

    return google_websafe, norton_websafe

def check_ssl(domain):
    try:
        cert = ssl.get_server_certificate((domain, 443))
        return True
    except Exception:
        return False
    

    
def format_dict_without_brackets(dictionary):
    formatted_str = ' '
    for key, value in dictionary.items():
        formatted_value = ', '.join(map(str, value)) if isinstance(value, list) else str(value)
        formatted_str += f"{key}: {formatted_value}\n"
    return formatted_str

@app.route('/verifyDomain', methods=['POST'])
def verify_domain_route():
    data = request.get_json()
    domain = data.get('domain', '')

    ip_address = get_ip_address(domain)
    is_registered, domain_info = check_domain_registration(domain)
    
    formatted_domain_info = format_dict_without_brackets(domain_info if domain_info else {})

    google_websafe, norton_websafe = check_web_safe_evaluation(domain)
    ssl_valid = check_ssl(domain)



    result = {
      'ip_address': ip_address,
      'is_registered': is_registered,
      'domain_name': domain_info['domain_name'] if domain_info else None,
      'country': domain_info['country'] if domain_info else None,
      'creation_date': domain_info['creation_date'] if domain_info else None,
      'expiration_date': domain_info['expiration_date'] if domain_info else None,
      'google_websafe': google_websafe,
      'norton_websafe': norton_websafe,
      'ssl_valid': ssl_valid,
    }
    print(result)
    
    return jsonify(result)



if __name__ == "__main__":
    app.run(debug=True)
