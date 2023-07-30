package socio

import (
	"time"

	"gorm.io/gorm"
)

type Scheduler struct {
	gorm.Model

	PostId        string               `json:"postId"`
	Status        SchedulerStautusEnum `json:"stauts"`
	ScheduledTime time.Time            `json:"scheduledTime"`
	AppName       string               `json:"appName"`
	UserId        string               `json:"userId"`
}

// CREATE TABLE "scheudlers" (
// 	"id" serial,
// 	"post_id" text,
// 	"status" text,
// 	"scheduled_time" timestamp,
// 	"app_name" text,
// 	"user_id" text,
// 	"created_at" timestamp NOT NULL,
// 	"updated_at" timestamp NOT NULL,
// 	"deleted_at" timestamp,
// 	PRIMARY KEY ("id")
//   );
