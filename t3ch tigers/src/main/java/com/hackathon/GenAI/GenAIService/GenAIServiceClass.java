package com.hackathon.GenAI.GenAIService;
import com.hackathon.GenAI.Model.Message;
import java.io.UnsupportedEncodingException;
import java.nio.charset.StandardCharsets;
import java.util.*;

import org.apache.http.NameValuePair;
import org.apache.http.client.entity.UrlEncodedFormEntity;
import org.apache.http.client.methods.CloseableHttpResponse;
import org.apache.http.client.methods.HttpPost;
import org.apache.http.entity.StringEntity;
import org.apache.http.impl.client.CloseableHttpClient;
import org.apache.http.impl.client.HttpClients;
import org.apache.http.message.BasicNameValuePair;
import org.apache.http.util.EntityUtils;
import org.json.JSONObject;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;

import com.google.gson.Gson;
import com.google.gson.JsonObject;
import com.google.gson.reflect.TypeToken;
import java.lang.reflect.Type;

import lombok.extern.slf4j.Slf4j;

@Service
@Slf4j

public class GenAIServiceClass {
	
	Logger log = LoggerFactory.getLogger(GenAIServiceClass.class);
	public String processSearch(String query) throws UnsupportedEncodingException {
		Gson gson = new Gson();
		Message inputprompt = new Message();
	    
	    ArrayList<Message> messages = new ArrayList<Message>(); 
	    
	    inputprompt.setRole("user");
	    inputprompt.setContent(query);
	    messages.add(inputprompt);
		
	    Map<String,Object> requestBody = new HashMap<>();
		requestBody.put("model","gpt-3.5-turbo");
		requestBody.put("messages", messages);
		
		Type gsonTypereqBody = new TypeToken<HashMap>(){}.getType();
		String gsonStringreqBody = gson.toJson(requestBody,gsonTypereqBody);
		log.info(gsonStringreqBody);
		
		final StringEntity entity = new StringEntity(gsonStringreqBody);
	    final String access_token = "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";
	    
	    final String playgroundurl = "https://api.openai.com/v1/chat/completions";
	    
	    HttpPost gptrequest = new HttpPost(playgroundurl);
		gptrequest.addHeader("Content-Type","application/json");
		gptrequest.addHeader("Authorization", "Bearer "+access_token);
		gptrequest.setEntity(entity);
		
		try {
				
				try (CloseableHttpClient httpClient = HttpClients.custom().build();
						CloseableHttpResponse response = httpClient.execute(gptrequest)) {
					String responseBody = EntityUtils.toString(response.getEntity());
					Gson g = new Gson();  
					HashMap<String, Object> msg = g.fromJson(responseBody, HashMap.class);
					System.out.println(msg.get("choices"));
					String msgString = msg.get("choices").toString();
					String formattedString = msgString.substring(46, msgString.length()-23);
					log.info("Done!");
					
					return formattedString;
					
				}
				catch (Exception e) {
					 log.info("Inside try block error");
					return null;
				}
			}
			catch (Exception e) {
				log.info("Outside try block error");
				return null;
			}
	}
	
}
