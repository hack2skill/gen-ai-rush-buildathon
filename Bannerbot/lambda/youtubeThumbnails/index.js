/*
zip -r function.zip .
aws lambda update-function-code --function-name youtubeThumbnails --zip-file fileb://function.zip --profile bannerbot
Url: https://kt6q22xmv3zz6qxfnbjyfel5fe0lyezq.lambda-url.ap-south-1.on.aws/
*/
const axios = require('axios');

const OPEN_AI_API_KEY = 'API_KEY_HERE';
const FREEPIK_API_KEY = 'API_KEY_HERE';

// true for using model gpt-3.5-turbo, fast for text-davinci-003
const USE_GPT_3_POINT_5 = true; //false;

const getThumbnailsPrompt = (userPrompt) => {
  return `
You are an intelligent AI assistant dedicated to creating eye-catching YouTube thumbnails.
Analyze the user's prompt and generate thumbnails accordingly in the requested language or the same language as the prompt.

A YouTube thumbnail consists of four components:

1. Background Image Keywords: The thumbnail should have a background image, which can be a hazy or blurred image related to the video's content. For example, if the video is about a swimming tutorial, the background image could be of a swimming pool. If the video is about mobile phones, the background image could feature 4-5 mobile phones. It can also be a textured canvas.

2. Human Image Description: The thumbnail should have an image of human (man/woman/kid/elder) doing something related to the video's content. Example, a man surprised and pointing in a direction, a man deep in thought, woman wearing specs, a kid very excited, man eating burger.

3. Human Image Position: Specify the position of the human image, which can be left, center, or right aligned.

4. Thumbnail Texts: This will be an array of text parts in the thumbnail. Thumbnail text is often designed to be clickbaity, catching viewers' attention. For example, a clickbaity question, a simple yet enticing title for the video, a comparison between two things (A vs B), a one-word title of the video, or a clickbaity explanatory statement. Thumbnail texts often have more than one color.

Below are the rules to decide thumbnail text parts-

1. Array of text parts will have a max length of 3
3. Select text background color according to text color to have a proper contrast.

Below is an example of a YouTube thumbnail for a video describing "How to become a Freelancer":

{
  "background_image_keywords": ["textured yellow background", "yellow background"],
  "human_image_description": "Man holding laptop",
  "human_image_position": "left",
  "thumbnail_texts": [
    { "value": "HOW to", "color": "#000000", "background_color": "" },
    { "value": "BECOME A", "color": "#000000", "background_color": "" },
    { "value": "FREELANCER", "color": "#FFFFFF", "background_color": "#000000" }
  ]
}

Now, considering the user's prompt:

[${userPrompt}]

Based on the given prompt and your training, please return an array of 3 YouTube thumbnail objects in the below format. Do not add any explanation. Remember, your response should be JSON-parsable.


[
  {
    "background_image_keywords": [],
    "human_image_description": "",
    "human_image_position": "",
    "thumbnail_texts": []
  },
  {
    "background_image_keywords": [],
    "human_image_description": "",
    "human_image_position": "",
    "thumbnail_texts": []
  },
  {
    "background_image_keywords": [],
    "human_image_description": "",
    "human_image_position": "",
    "thumbnail_texts": []
  }
]
`;
};

// API Docs: https://docs.freepik.com/
// query is image description
const getImagesFromFreepik = async (query) => {
  const images = [];
  const url = 'https://api.freepik.com/v1/resources';
  try {
    const response = await axios.get(url, {
      headers: {
        'Accept-Language': 'en-GB',
        Accept: 'application/json',
        'Content-Type': 'application/json',
        'X-Freepik-API-Key': FREEPIK_API_KEY,
      },
      params: {
        locale: 'en-GB',
        page: '1',
        limit: '50',
        order: 'priority',
        term: query,
        'filters[orientation][portrait]': '1',
        //'filters[people][number]': '1',
        'filters[people][include]': '1',
        'filters[content_type][photo]': '1'
      },
    });
    if (response.data?.data) {
      const data = response.data.data;
      data.forEach(item => {
        images.push({
          id: item.id,
          title: item.title,
          image_orientation: item.image?.orientation,
          image_url: item.image?.source?.url,
          image_size: item.image?.source?.size
        })
      });
    }
    console.log(images);
  } catch (error) {
    console.log(error);
  }
  return images;
};

// query is user supplied query string
const getResponseFromOpenAi = async (query) => {
  let openAiResponse = null;
  const prompt = getThumbnailsPrompt(query);
  const messages = [
    {
      content: prompt,
      role: 'system',
    },
  ];
  const data = {
    // parameters docs: https://platform.openai.com/docs/api-reference/chat/create
    model: '',
    // Controls randomness: Lowering results in less random completions.
    // As the temperature approaches zero, the model will become deterministic and repetitive
    temperature: 0.9,
    // The maximum number of tokens allowed for the generated answer.
    // By default, the number of tokens the model can return will be (4096 - prompt tokens).
    max_tokens: 1500,
    // An alternative to sampling with temperature, called nucleus sampling,
    // where the model considers the results of the tokens with top_p probability mass.
    // So 0.1 means only the tokens comprising the top 10% probability mass are considered
    // OpenAI generally recommends altering this or temperature but not both.
    top_p: 1,
    // Number between -2.0 and 2.0. Positive values penalize new tokens based on their existing frequency in the text so far,
    // decreasing the model's likelihood to repeat the same line verbatim.
    frequency_penalty: 0.0,
    // Number between -2.0 and 2.0. Positive values penalize new tokens based on whether they appear in the text so far,
    // increasing the model's likelihood to talk about new topics.
    presence_penalty: 0.6,
  };
  if (USE_GPT_3_POINT_5) {
    data.messages = messages;
    data.model = 'gpt-3.5-turbo-0613';
  } else {
    data.prompt = prompt;
    data.model = 'text-davinci-003';
  }
  const url = USE_GPT_3_POINT_5
    ? 'https://api.openai.com/v1/chat/completions'
    : 'https://api.openai.com/v1/completions';
  try {
    const response = await axios.post(url, data, {
      headers: {
        Authorization: `Bearer ${OPEN_AI_API_KEY}`,
      },
    });
    const content = USE_GPT_3_POINT_5
      ? response.data.choices?.[0]?.message?.content
      : response.data.choices?.[0].text;
    console.log(content);
    openAiResponse = JSON.parse(content);
  } catch (error) {
    console.log(error);
  }
  return openAiResponse;
};

const getThumbnailData = async (query) => {
  console.log('getThumbnailData called for query', query);
  const startTime = Date.now();
  let thumbnails = null;
  try {
    thumbnails = await getResponseFromOpenAi(query);
    if (thumbnails && thumbnails.length) {
      try {
        const imagesDataArr = await getImagesFromFreepik(thumbnails[0].human_image_description);
        thumbnails.forEach((data, index) => {
          data.human_images = imagesDataArr;
          data.human_image_url = imagesDataArr[index].image_url;
        });

        const endTime = Date.now();
        const thumbnailGenerationTime = (endTime - startTime) / 1000; // in secs
        console.log(
          'thumbnailGenerationTime in secs: ',
          thumbnailGenerationTime
        );
        // merge & filter images if generation time is less than 10 secs
        if (thumbnailGenerationTime <= 10) {
          // todo
        }
      } catch (error) {
        console.log(error);
      }
    }
  } catch (error) {
    console.log(error);
  }
  return thumbnails;
};

exports.handler = async (event, context) => {
  const body = event.body ? JSON.parse(event.body) : {};
  if (body.query) {
    return {
      statusCode: 200,
      body: {
        thumbnails: await getThumbnailData(body.query),
      },
    };
  } else {
    return {
      statusCode: 400,
      body: {
        error: {
          message: 'Use POST request passing query as thumbnail input',
        },
      },
    };
  }
};

// for local testing on terminal
//getThumbnailData('A video describing daily productivity hacks').then(data => console.log(data));
//getImagesFromFreepik('Gamer with headset')