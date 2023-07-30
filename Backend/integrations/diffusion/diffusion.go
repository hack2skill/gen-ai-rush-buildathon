package diffusion

import (
	"context"
	"encoding/json"
	"genai/infra/environment"

	"github.com/go-resty/resty/v2"
)

var (
	DiffusionClient *resty.Client
)

func InitDiffusion() {
	DiffusionClient = resty.New().
		SetHeader("Content-Type", "application/json").
		SetHeader("Authorization", "Token "+environment.REPLICATE_API_KEY).
		SetBaseURL("https://api.replicate.com/v1")

}

func Predict(ctx *context.Context, data Payload) *PredictionResponse {

	response := PredictionResponse{}

	request := DiffusionClient.R().SetContext(*ctx)

	temp, _ := json.Marshal(data)
	print(string(temp))

	res, err := request.
		SetBody(&data).
		SetError(&response).
		SetResult(&response).
		Post("/predictions")

	print(string(res.Body()))

	if err != nil {
		print(err.Error())
	}

	return &response
}

func GetImageFromPredictiction(ctx *context.Context, predictionId string) *GeneratedImageDto {

	response := GeneratedImageDto{}

	request := DiffusionClient.R().SetContext(*ctx)

	_, err := request.
		SetError(&response).
		SetResult(&response).
		Post("/predictions/" + predictionId)

	if err != nil {
		print(err.Error())
	}

	return &response
}
