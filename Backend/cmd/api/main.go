package main

import (
	"genai/infra/database"
	"genai/infra/environment"
	"genai/infra/rest"
	"genai/integrations/aws"
	"genai/integrations/diffusion"
	"genai/integrations/gpt"
	"log"
	"os"

	"github.com/go-logr/stdr"
	"go.opentelemetry.io/otel"
)

func main() {

	logger := stdr.New(log.New(os.Stdout, "", log.LstdFlags|log.Lshortfile))
	otel.SetLogger(logger)

	environment.InitializeEnvs()
	database.InitializeGorm()
	aws.InitAWS()
	diffusion.InitDiffusion()
	gpt.InitOpenAI()

	rest.InitializeApiRestServer()

}
