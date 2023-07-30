package redis

import (
	"context"
	"os"
	"time"

	"github.com/go-redis/redis/v8"
	"go.uber.org/zap"
)

var (
	redisClient *redis.Client
)

func InitializeRedis() {
	redisHost := os.Getenv("REDIS_HOST")
	redisPort := os.Getenv("REDIS_PORT")
	redisPass := os.Getenv("REDIS_PASS")

	redisClient = redis.NewClient(&redis.Options{
		Addr:     redisHost + ":" + redisPort,
		Password: redisPass,
	})

	_, err := redisClient.Ping(context.Background()).Result()
	if err != nil {
		zap.L().Debug("Redis Connection Failed! " + err.Error())
	} else {
		zap.L().Debug("Redis Successfully Connected!")
	}
}

func GetKey(ctx *context.Context, key string) string {
	zap.L().Debug("Redis Get : " + key)
	val, err := redisClient.Get(*ctx, key).Result()
	if err != nil {
		zap.L().Debug("Redis Error : " + err.Error())
		return "nil"
	}
	return val
}

func Incr(ctx *context.Context, key string) int64 {
	zap.L().Debug("Redis Incr : " + key)
	val, err := redisClient.Incr(*ctx, key).Result()
	if err != nil {
		return 0
	}
	return val
}

func SetExpiry(ctx *context.Context, key string, expiry uint) {
	zap.L().Debug("Redis Expire : " + key)
	_, err := redisClient.Expire(*ctx, key, time.Duration(expiry)*time.Second).Result()
	if err != nil {
		panic("cannot set expiry")
	}
}

func SetKey(ctx *context.Context, key string, value string, expiry int) {
	zap.L().Debug("Redis Set : " + key)
	err := redisClient.Set(*ctx, key, value, time.Duration(expiry)*time.Second).Err()
	if err != nil {
		panic("cannot set redis key")
	}
}
