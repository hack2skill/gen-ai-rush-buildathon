package com.hackathon.GenAI.Controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.multipart.MultipartFile;

import com.hackathon.GenAI.GenAIService.GenAIServiceClass;

import java.io.IOException;
import java.nio.charset.StandardCharsets;

@Controller
public class FileUploadController {
	@Autowired
    GenAIServiceClass svc;
	
    @GetMapping("/upload")
    public String showUploadForm() {
        return "upload"; // Return the name of the Thymeleaf template (upload.html)
    }
    
    
    @PostMapping("/upload")
    public String handleFileUpload(@RequestParam("file") MultipartFile file) {
        if (!file.isEmpty()) {
            try {
                // Read the file content
                String fileContent = new String(file.getBytes(), StandardCharsets.UTF_8);
                System.out.println("Uploaded file content: " + fileContent);
                
		 		return svc.processSearch(fileContent);

            } catch (IOException e) {
                // Handle the exception
                e.printStackTrace();
            }
        }

        // Redirect to an error page if the file is empty or an error occurred
        return "error1";
    }
}

