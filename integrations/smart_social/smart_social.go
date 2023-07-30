package smartsocial

import (
	"context"

	"github.com/go-resty/resty/v2"
)

var (
	YoutubeClient *resty.Client
)

func InitializeSmartSocial() {

	YoutubeClient = resty.New().
		SetHeader("Content-Type", "application/json").
		SetBaseURL("smartsocial.com/") //TODO:
}

func PostOnSmartSocial(ctx *context.Context, requestDto *SmartSocialPublishPost) {

	request := YoutubeClient.R().SetContext(*ctx)

	_, _ = request.
		SetBody(requestDto).
		Post("")

}
