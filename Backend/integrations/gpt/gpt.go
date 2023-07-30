package gpt

import (
	"context"
	"encoding/json"
	"genai/infra/environment"

	"github.com/go-resty/resty/v2"
)
var (
	OpenAiClient *resty.Client
)

func InitOpenAI() {
	OpenAiClient = resty.New()
	// SetHeader("Content-Type", "application/json").
	// SetHeader("Authorization", "Bearer "+environment.OPEN_API_KEY).
	// SetBaseURL("https://api.openai.com/v1/completions")
}

func Predict(ctx *context.Context, data *Payload) *Response {

	response := Response{}

	request := OpenAiClient.R().SetContext(*ctx)

	temp, _ := json.Marshal(data)
	print(string(temp))

	res, err := request.
		SetBody(data).
		SetError(&response).
		SetResult(&response).
		SetHeader("Content-Type", "application/json").
		SetHeader("Authorization", "Bearer "+environment.OPEN_API_KEY).
		Post("https://api.openai.com/v1/completions")

	print(string(res.Body()))

	if err != nil {
		print(err.Error())
	}

	return &response
}
