package environment

import (
	"log"
	"os"
	"strconv"

	"github.com/joho/godotenv"
)

var (
	PORT              int
	POSTGRES_HOST     string
	POSTGRES_PORT     int
	POSTGRES_USER     string
	POSTGRES_DBNAME   string
	POSTGRES_PASSWORD string
	JWT_SECRET        []byte
	REPLICATE_API_KEY string
	OPEN_API_KEY      string
	ClientId          string
	ClientSecret      string
)

func InitializeEnvs(variant ...string) {
	err := godotenv.Load(os.ExpandEnv("$GOPATH/src/genai/.env"))
	if err != nil {
		log.Fatal("unable to load " + ".env file")
	}

	PORT, _ = strconv.Atoi(os.Getenv("APP_PORT"))
	POSTGRES_HOST = os.Getenv("POSTGRES_HOST")
	POSTGRES_USER = os.Getenv("POSTGRES_USER")
	POSTGRES_DBNAME = os.Getenv("POSTGRES_DBNAME")
	POSTGRES_PASSWORD = os.Getenv("POSTGRES_PASSWORD")
	REPLICATE_API_KEY = os.Getenv("REPLICATEKEY")
	JWT_SECRET = []byte(os.Getenv("SECRET"))

	OPEN_API_KEY = os.Getenv("OPENAI_KEY")

	ClientId = os.Getenv("AWS_ACCESS_KEY")
	ClientSecret = os.Getenv("AWS_SECRET_KEY")

}
