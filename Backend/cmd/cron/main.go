package main

import (
	"context"
	"genai/infra/database"
	"genai/infra/environment"
	smartsocial "genai/integrations/smart_social"
	"genai/modules/socio"
	"log"
	"os"
	"time"

	"github.com/go-co-op/gocron"
	"github.com/go-logr/stdr"
	"go.opentelemetry.io/otel"
	"go.uber.org/zap"
)

func main() {

	logger := stdr.New(log.New(os.Stdout, "", log.LstdFlags|log.Lshortfile))
	otel.SetLogger(logger)

	environment.InitializeEnvs()
	database.InitializeGorm()
	smartsocial.InitializeSmartSocial()

	s := gocron.NewScheduler(time.UTC)

	s.Every(3).Seconds().Do(func(ctx context.Context) {
		zap.L().Debug("cron running")
		socio.SchedulerPickUp(&ctx)
	}, context.Background())

	go s.StartBlocking()

	<-context.Background().Done()
}
