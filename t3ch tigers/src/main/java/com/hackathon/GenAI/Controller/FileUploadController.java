package com.hackathon.GenAI.Controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.multipart.MultipartFile;


import com.hackathon.GenAI.GenAIService.GenAIServiceClass;

import java.io.IOException;
import java.nio.charset.StandardCharsets;
import java.util.Arrays;
import java.util.List;

@Controller
public class FileUploadController {
	@Autowired
    GenAIServiceClass svc;
	
    @GetMapping("/upload")
    public String showUploadForm() {
        return "upload"; 
    }
    
    
    @PostMapping("/upload")
    public String handleFileUpload(@RequestParam("file") MultipartFile file, Model model) {
        if (!file.isEmpty()) {
            try {
                String fileContent = new String(file.getBytes(), StandardCharsets.UTF_8);
                System.out.println("Uploaded file content: " + fileContent);
                String str = svc.processSearch(fileContent);
                List<String> list = Arrays.asList(str.split("\n"));
                
                model.addAttribute("result",list);
		 		
                return "result";

            } catch (IOException e) {
                e.printStackTrace();
            }
        }
        return "error1";
    }
}

