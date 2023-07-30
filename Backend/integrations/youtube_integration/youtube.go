package youtubeIntegration

import (
	"context"
	"genai/common"
	"genai/infra/redis"
	"net/http"
	"os"
	"strings"
	"sync"

	"github.com/go-resty/resty/v2"
	"go.uber.org/zap"
)

var (
	YoutubeClient *resty.Client
	YOUTUBE_KEYS  string
)

func InitializeYoutube() {

	YOUTUBE_KEYS = os.Getenv("YOUTUBE_KEYS")

	YoutubeClient = resty.New().
		SetHeader("Content-Type", "application/json").
		SetBaseURL("https://youtube.googleapis.com")
}

func SearchQuery(ctx *context.Context, ch chan<- string, wg *sync.WaitGroup, query string) {

	wg.Add(1)

	keyStr := redis.GetKey(ctx, "YOUTUBE_API_KEYS")
	keys := strings.Split(keyStr, ",")

	maxCount := int64(100)

	var youtubeKey string
	for index, key := range keys {
		throttleLimit := common.Throttle(ctx, key, maxCount)

		if throttleLimit && (index == (len(key) - 1)) {
			panic("all keys limit exausted.")
		}
		if !throttleLimit {
			youtubeKey = key
			break
		}
	}

	youtubeClient := YoutubeClient.R()

	queryParams := ""
	if common.NEXT_TOKEN == "" {
		queryParams = "/youtube/v3/search?part=snippet&type=video&order=date&publishedAfter=" + common.PUBLISHED_AFTER + "&maxResults=50&q=" + query + "&key=" + youtubeKey
	} else {
		queryParams = "/youtube/v3/search?part=snippet&type=video&pageToken=" + common.NEXT_TOKEN + "&maxResults=50&q=" + query + "&key=" + youtubeKey
	}

	resp, err := youtubeClient.
		Get(queryParams)

	if err != nil || resp.StatusCode() != http.StatusOK {
		zap.L().Debug(err.Error())
	}
	ch <- string(resp.Body())
}
