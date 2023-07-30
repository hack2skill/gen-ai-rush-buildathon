package socio

import (
	"database/sql/driver"
	"genai/util"
	"time"

	"github.com/lib/pq"
	"gorm.io/gorm"
)

type User struct {
	gorm.Model
	Uuid          string         `json:"uuid"`
	Email         string         `json:"email"`
	Password      string         `json:"password"`
	ConnectedApps pq.StringArray `gorm:"type:[]text"`
	AppTokens     []AppTokensDto `gorm:"type:jsonb"`
}

type AppTokensDto struct {
	AppId    string `json:"appId"`
	AppToken string `json:"AppToken"`
}

func (j *AppTokensDto) Scan(value interface{}) error {
	return util.Scan(value, j)
}

func (j AppTokensDto) Value() (driver.Value, error) {
	return util.Value(j)
}

// CREATE TABLE "users" (
// 	"id" serial,
// 	"uuid" text,
// 	"email" text,
// 	"password" text,
// 	"connected_apps" text,
// 	"app_tokens" jsonb,
// 	"created_at" timestamp NOT NULL,
// 	"updated_at" timestamp NOT NULL,
// 	"deleted_at" timestamp,
// 	PRIMARY KEY ("id")
//   );

type BrandProfile struct {
	gorm.Model
	Name             string `json:"name"`
	ProductCategory  string `json:"productCategory"`
	UserId           string `json:"userId"`
	Description      string `json:"description"`
	PurposeStatement string `json:"purposeStatement"`
	Vision           string `json:"vision"`
	TargetGender     string `json:"targetGender"`
	TargetAgeRange   string `json:"targetAgeRange"`
	TargetCity       string `json:"targetCity"`
	BrandVoice       string `json:"brandVoice"`
	ArcheType        string `json:"archeType"`
	BrandLogo        string `json:"brandLogo"`
}

// CREATE TABLE "brand_profiles" (
// 	"id" serial,
// 	"user_id" text,
// 	"name" text,
// 	"product_category" text,
// 	"description" text,
// 	"target_gender" text,
// 	"target_age_range" text,
// 	"target_city" text,
// 	"brand_voice" text,
// 	"purpose_statement" text,
// 	"vision" text,
// 	"brand_persona" text,
// 	"archetype" text,
// 	"brand_logo" text,
// 	"created_at" timestamp NOT NULL,
// 	"updated_at" timestamp NOT NULL,
// 	"deleted_at" timestamp,
// 	PRIMARY KEY ("id")
//   );

type Post struct {
	gorm.Model
	Uuid          string         `json:"uuid"`
	UserId        string         `json:"userId"`
	Status        EnumPostStatus `json:"mode"`
	ImageName     string         `json:"imageName"`
	ImageUrl      string         `json:"imageUrl"`
	Caption       string         `json:"caption"`
	PublishTime   time.Time      `json:"publishTime"`
	ParentDraftId string         `json:"parentDraftId"`
	AppId         string         `json:"appId"`
}

// CREATE TABLE "posts" (
// 	"id" serial,
// 	"uuid" text,
// 	"user_id" text,
// 	"status" text,
// 	"image_name" text,
// 	"image_url" text,
// 	"caption" text,
// 	"publish_time" timestamp NOT NULL,
// 	"parent_draft_id" text,
// 	"app_id" text,
// 	"created_at" timestamp NOT NULL,
// 	"updated_at" timestamp NOT NULL,
// 	"deleted_at" timestamp,
// 	PRIMARY KEY ("id")
//   );
