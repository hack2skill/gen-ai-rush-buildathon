package com.hackathon.GenAI.Controller;

import java.io.UnsupportedEncodingException;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.hackathon.GenAI.GenAIService.GenAIServiceClass;
import com.hackathon.GenAI.Model.SearchRequest;

import lombok.extern.slf4j.Slf4j;

@RestController
@Slf4j
@RequestMapping("/api/v1")

public class GenAIRestController {

private GenAIServiceClass svc;
	
	public GenAIRestController(GenAIServiceClass svc) {
		this.svc = svc;
	}
	
	@PostMapping("searchChatGPT")
	
	public String searchChatGPT(@RequestBody SearchRequest searchRequest) throws UnsupportedEncodingException {
		
		 Logger log = LoggerFactory.getLogger(GenAIRestController.class);
		 log.info("searchGPT Started query: "+ searchRequest.getQuery());
		 
		 		return svc.processSearch(searchRequest.getQuery());
	}
	
}
