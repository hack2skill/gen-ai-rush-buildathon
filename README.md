# Team Name - LossPerEpoch

## Problem Statement
The lack of an automated solution for converting codebases into documentation poses challenges in terms of time, accuracy, and code comprehension. Documentation is often ignored by developers, especially in fast-building teams. However, this leads to severe technical debt. Since technical documentation is hard and existing tools are limited or expensive, there is a need for comprehensive automatic documentation generation.

## Team Leader Email
For any inquiries or feedback, you can reach out to the Team Leader at hriday.mht@gmail.com.

## A Brief of the Prototype
## UML Diagrams
[Include UML diagrams here to visualize the architecture and design of the prototype.]

## Architecture Diagram

![Architecture Diagram](/LossPerEpoch/client/images/DoxifyAi_Diagram.jpg)

## Prototype Description

### Full Codebase to Developer Docs in One Step
Our prototype offers a seamless solution to transform a full codebase into comprehensive developer documentation in just one step. By uploading a zip file containing the codebase, you can let the magic happen. The resulting documentation includes function explanations, API specs, table schemas, and dependencies, all in Markdown format.

### Harnessing GPT-3.5 Capabilities
To power our documentation generation, we leverage the capabilities of GPT-3.5. This advanced language model enables us to produce accurate and contextually relevant documentation for the given codebase.

### A Step-by-Step Approach
1. **Codebase Traversal**: The process begins by traversing the codebase in a tree-wise fashion to access its contents.

2. **Code Embeddings with CodeBERT**: To extract meaningful information from the code, we employ Microsoft's CodeBERT for code embeddings. However, we encountered an issue with large code files that CodeBERT cannot handle effectively.

3. **Handling Large Code Files**: To overcome the limitations of CodeBERT for large code files, we devised our own algorithm to create tokenizers in a window-like manner. By specifying a window size and an overlap "region," we maintain essential context and generate embeddings by averaging the embeddings produced for each window.

4. **Maintaining Context with Agglomerating Clustering**: To ensure context preservation across the codebase, we use Agglomerating Clustering. This technique groups "similar" code files with shared semantic meanings and features, enhancing the quality of the generated documentation.

5. **Efficient Documentation Generation**: After clustering, we concatenate the code files belonging to the same cluster. The resulting concatenated code is then sent to GPT-3.5 using efficient prompt engineering techniques. The generated documentation provides comprehensive insights into the codebase.

## Summary
Our prototype streamlines the documentation process by converting a full codebase into developer documentation in a single step. Leveraging GPT-3.5, we produce accurate and contextually relevant documentation, addressing the challenges of manual documentation processes. The resulting documentation enhances code comprehension, reduces technical debt, and improves code maintainability for software development teams.



## Tech Stack
List of technologies used to build the prototype:
- Frontend: Next.js
- Backend: FastAPI

## Step-by-Step Code Execution Instructions
To clone and run the prototype for testing and analysis, follow the instructions below:

### Server Setup Guide

1. Set up a Python virtual environment:
   ```
   python -m venv venv
   ```

2. Activate the virtual environment:
   - For Windows:
     ```
     venv\Scripts\activate
     ```
   - For macOS and Linux:
     ```
     source venv/bin/activate
     ```

3. Install dependencies:
   ```
   pip install -r requirements.txt
   ```

4. To run the server, use the following command:
   ```
   uvicorn main:app --reload
   ```

### Client Frontend Setup(make sure you are in the client directory)

1. Install Node.js dependencies:
   ```
   npm install
   ```

2. Run the development server for the frontend:
   ```
   npm run dev
   ```
## Examples - 

1) Documentation of `ComicifyAI`:
- Input repo : `https://github.com/ayush4345/Comicify.ai`
- Output Docs :
1. [Documentation_1](/LossPerEpoch/client/examples/comicify/output0.md)
2. [Documentation_2](/LossPerEpoch/client/examples/comicify/output1.md)
3. [Documentation_3](/LossPerEpoch/client/examples/comicify/output2.md)
4. [Documentation_4](/LossPerEpoch/client/examples/comicify/output3.md)
5. [Documentation_5](/LossPerEpoch/client/examples/comicify/output4.md)
6. [Documentation_6](/LossPerEpoch/client/examples/comicify/output5.md)

2) Documentation of `Cluboard`:
- Input repo : `https://github.com/mittal-parth/Cluboard/`
- Output Docs : 
1. [Documentation_1](/LossPerEpoch/client/examples/clubhouse/output0.md)
2. [Documentation_2](/LossPerEpoch/client/examples/clubhouse/output1.md)


## What We Learned
1. **Handling Large Code Files**: We faced a challenge with CodeBERT's inability to process large code files. To overcome this, we devised an algorithm to create tokenizers in a window-like manner, allowing us to maintain context by specifying a window size and overlap region. We then took the average of the embeddings produced to formulate our own embeddings for large files, addressing the issue of context preservation.

2. **Aglomerate Clustering for Context Maintenance**: To keep context across the codebase, we used Agglomerate Clustering. This method grouped "similar" code files that shared semantic meanings and features. Concatenating code files within the same cluster, we sent them to GPT-3.5 using efficient prompt engineering to generate comprehensive documentation.

3. **Persistence and Perseverance**: Despite facing difficulties with the clustering functionality, we persevered and continuously tried different approaches until we made it work. Our persistence paid off, and the successful implementation of clustering significantly improved the prototype's performance.
