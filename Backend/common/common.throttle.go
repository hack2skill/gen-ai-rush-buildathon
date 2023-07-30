package common

import (
	"context"
	"genai/infra/redis"

	"go.uber.org/zap"
)

func Throttle(ctx *context.Context, key string, maxCount int64) bool {
	count := redis.Incr(ctx, key)

	if count > maxCount {
		zap.L().Debug("rate limit for key exceeded. using another key")
		return true
	}
	if count == 1 {
		redis.SetExpiry(ctx, key, 24*60*60)
	}
	return false
}
