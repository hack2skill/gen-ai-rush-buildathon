package gpt

type Response struct {
	ID      string `json:"id"`
	Object  string `json:"object"`
	Created int    `json:"created"`
	Model   string `json:"model"`
	Choices []struct {
		Text         string `json:"text"`
		Index        int    `json:"index"`
		Logprobs     any    `json:"logprobs"`
		FinishReason string `json:"finish_reason"`
	} `json:"choices"`
	Usage struct {
		PromptTokens     int `json:"prompt_tokens"`
		CompletionTokens int `json:"completion_tokens"`
		TotalTokens      int `json:"total_tokens"`
	} `json:"usage"`
}

type Payload struct {
	Prompt      string  `json:"prompt"`
	Temperature float32 `json:"temperature"`
	MaxToken    uint    `json:"max_tokens"`
	Model       string  `json:"model"`
	TopP        string  `json:"top_p"`
}
