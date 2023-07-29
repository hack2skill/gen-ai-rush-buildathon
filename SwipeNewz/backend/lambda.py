import json
import requests
import boto3
import os 
import openai
import tiktoken
import time
import pandas as pd
import awswrangler as wr
import base64
import Image
import BytesIO

BING_SEARCH_API_ENDPOINT = 'https://bing-news-search1.p.rapidapi.com/news/search'
STABLE_DIFFUSION_API_ENDPOINT = 'https://stablediffusionapi.com/api/v3/text2img'
AWS_S3_PATH = 's3://gen_ai/'
AWS_S3_BUCKET_NAME = 'images'
STABLE_DIFFUSION_API_KEY = '####'

# helper decoder
def decode_base64_image(image_string):
  base64_image = base64.b64decode(image_string)
  buffer = BytesIO(base64_image)
  return  Image.open(buffer)

def lambda_handler(event, context):
    try:
        trending_news = fetch_trending_news()

        summary = generate_summary(trending_news)

        image_urls = generate_images_from_summary(summary)

        save_summary_to_s3(summary)

        save_images_to_s3(image_urls)

        return {
            'statusCode': 200,
            'body': json.dumps('Process completed successfully.')
        }
    except Exception as e:
        return {
            'statusCode': 500,
            'body': json.dumps('Error: {}'.format(str(e)))
        }

def fetch_trending_news():

    headers = {
        'Ocp-Apim-Subscription-Key': BING_SEARCH_API_ENDPOINT,
    }

    params = {
        'q': 'trending news',
        'count': 50,  
        'freshness': 'Day',  
    }

    response = requests.get(BING_SEARCH_API_ENDPOINT, headers=headers, params=params)
    response_data = response.json()

    if response.status_code == 200:
        # Extract the news articles from the API response
        articles = response_data.get('value', [])
        trending_news = [article['description'] for article in articles]
        return trending_news
    else:
        raise Exception('Failed to fetch trending news from Bing Search API.')

def generate_summary(news_text):

    input_text = '\n'.join(news_text)
    openai.api_key = "######"
    response = openai.Completion.create(
        engine="text-davinci-002", 
        prompt=input_text,
        max_tokens=60,              
        temperature=0.7,            
        stop=["\n"]                 
    )

    summary = response.choices[0].text.strip()

def generate_images_from_summary(summary_text):

    headers = {
        'Content-Type': 'application/json',
        'Authorization': f'Bearer {STABLE_DIFFUSION_API_KEY}'
    }

    payload = json.dumps({
        "prompt": summary_text,
        "negative_prompt": None,
        "width": "512",
        "height": "512",
        "samples": "5",
        "num_inference_steps": "20",
        "seed": None,
        "guidance_scale": 7.5,
        "self_attention": "no"
    })

    response = requests.post(STABLE_DIFFUSION_API_ENDPOINT, headers=headers, data=json.dumps(payload))
    response_data = response.json()

    if response.status_code == 200:
        
        image_urls = response_data.get('image_urls', [])
        return image_urls
    else:
        raise Exception('Failed to generate images from Stable Diffusion API.')


def save_images_to_s3(image_urls):
    s3 = boto3.client('s3')
    for idx, image_url in enumerate(image_urls):
        response = requests.get(image_url)
        s3.upload_fileobj(response.content, AWS_S3_BUCKET_NAME, f'output_image_{idx}.jpg')


def save_summary_to_s3(summary):
    s3 = boto3.client('s3')

    summary_data = {
        'summary': summary
    }
    json_summary = json.dumps(summary_data)

    s3_key = 'summary.json'
    s3.put_object(Bucket=AWS_S3_BUCKET_NAME, Body=json_summary)
