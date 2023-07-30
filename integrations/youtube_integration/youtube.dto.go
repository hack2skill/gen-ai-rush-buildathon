package youtubeIntegration

import "time"

type PageInfoDto struct {
	TotalResults   int `json:"totalResults"`
	ResultsPerPage int `json:"resultsPerPage"`
}

type SnippetDto struct {
	PublishedAt          time.Time    `json:"publishedAt"`
	ChannelId            string       `json:"channelId"`
	Title                string       `json:"title"`
	Description          string       `json:"description"`
	ChannelTitle         string       `json:"channelTitle"`
	LiveBroadcastContent string       `json:"liveBroadcastContent"`
	PublishTime          string       `json:"publishTime"`
	ThumbnailUrl         thumbnailDto `json:"thumbnails"`
}

type thumbnailObjDto struct {
	Url    string `json:"url"`
	Width  string `json:"width"`
	Height string `json:"height"`
}

type thumbnailDto struct {
	Default thumbnailObjDto `json:"default"`
	Medium  thumbnailObjDto `json:"medium"`
	High    thumbnailObjDto `json:"high"`
}

type IdDto struct {
	Kind    string `json:"kind"`
	VideoId string `json:"videoId"`
}

type ItemsDto struct {
	Kind    string     `json:"kind"`
	Etag    string     `json:"etag"`
	Sinppet SnippetDto `json:"snippet"`
	Id      IdDto      `json:"id"`
}

type YoutubeVideoDto struct {
	Kind          string      `json:"kind"`
	Etag          string      `json:"etag"`
	NextPageToken string      `json:"nextPageToken"`
	RegionCode    string      `json:"regionCode"`
	PageInfo      PageInfoDto `json:"pageInfo"`
	Items         []ItemsDto  `json:"items"`
}
