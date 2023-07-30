package socio

import (
	"time"

	"github.com/golang-jwt/jwt/v4"
)

type LoginDto struct {
	Email    string `json:"email"`
	Password string `json:"password"`
}

type LoginResponseDto struct {
	Token           string             `json:"sessionToken"`
	UserObj         User               `json:"user"`
	BrandProfileObj BrandProfile       `json:"brandProfile"`
	PostsObj        []Post             `json:"posts"`
	ConnectedApps   []connectedAppsDto `json:"connectedApps"`
}

type BrandProfileDto struct {
	Id               uint   `json:"id"`
	Name             string `json:"name"`
	ProductCategory  string `json:"productCategory"`
	Description      string `json:"description"`
	PurposeStatement string `json:"purposeStatement"`
	Vision           string `json:"vision"`
	Archetype        string `json:"archetype"`
	BrandLogo        string `json:"brandLogo"`
	TargetGender     string `json:"targetGender"`
	TargetCity       string `json:"targetCity"`
	BrandVoice       string `json:"brandVoice"`
	UserId           string `json:"userId"`
	TargetAgeRange   string `json:"targetAgeRange"`
	ArcheType        string `json:"archeType"`
}

type publishPostDto struct {
	PostId string                 `json:"id"`
	Config []PublishPostConfigDto `json:"config"`
}

type PublishPostConfigDto struct {
	AppId    string     `json:"appId"`
	Schedule *time.Time `json:"schedule"`
}

type connectedAppsDto struct {
	AppId string `json:"id"`
}

type JwtClaims struct {
	UserId string `json:"userId"`
	jwt.RegisteredClaims
}

type PromptDto struct {
	Prompt string `json:"prompt"`
}

type PromptImagesDto struct {
	Urls []string `json:"urls"`
}

type CaptionRequestDto struct {
	Prompt string `json:"prompt"`
}

type CaptionResponsetDto struct {
	Caption string `json:"caption"`
}

type ConnectAppsRequest struct {
	AppId string `json:"id"`
}

type ConnectResponse struct {
	UserModel User `json:"user"`
}
