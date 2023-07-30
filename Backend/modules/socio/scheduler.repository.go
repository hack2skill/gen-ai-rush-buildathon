package socio

import (
	"context"
	"genai/common"
	"genai/infra/database"

	"go.uber.org/zap"
	"gorm.io/gorm/clause"
)

func GetScheduledPosts(ctx *context.Context) []Scheduler {
	db := database.GetDb(ctx)

	postModel := []Scheduler{}
	result := db.
		Clauses(
			clause.And(
				clause.Gte{
					Column: "scheduled_time",
					Value:  common.GmtNow(),
				},
				clause.Eq{
					Column: "status",
					Value:  RAW,
				},
			),
		).
		Find(&postModel, Scheduler{})
	if result.Error != nil {
		zap.L().Debug(result.Error.Error())
	}
	return postModel
}

func createScheduler(ctx *context.Context, data *Scheduler) {

	db := database.GetDb(ctx)

	result := db.Create(data)
	if result.Error != nil {
		zap.L().Debug(result.Error.Error())
	}
}
