package socio

import (
	"context"
	"genai/infra/database"
	"genai/infra/environment"
	"testing"

	"github.com/golang-jwt/jwt"
)

func TestJwt(t *testing.T) {

	environment.InitializeEnvs()

	token := jwt.NewWithClaims(jwt.SigningMethodHS256, jwt.MapClaims{
		"userId": "asdasd--ad--asd",
	})

	tokenString, _ := token.SignedString(environment.JWT_SECRET)

	print(tokenString)

}

func TestDebugJwt(t *testing.T) {

	environment.InitializeEnvs()

	token := "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiJhc2Rhc2QtLWFkLS1hc2QifQ.vL6gxhWZYh3khLuaUmMiv4dKL4DKsjhlDPESvJhCK0M"

	var claims JwtClaims

	_, err := jwt.ParseWithClaims(token, &claims, func(token *jwt.Token) (interface{}, error) {
		return []byte(environment.JWT_SECRET), nil
	})
	if err != nil {
		print(err.Error())
	}

}

func TestRegister(t *testing.T) {

	environment.InitializeEnvs()
	database.InitializeGorm()
	ctx := context.Background()
	temp := Register(&ctx, &LoginDto{
		Email:    "anish@jain.com",
		Password: "anish@jain.com",
	})

	print(temp.Token)

}

// [1051.390ms] [rows:1] INSERT INTO "users" ("created_at","updated_at","deleted_at","uuid","email","password","connected_apps","app_tokens") VALUES ('2023-07-30 04:19:35.679','2023-07-30 04:19:35.679',NULL,'2406bb1c-48b6-4697-b4d7-9f89567d6573','anish@jain.com','$2a$10$BXxeKRJzgUWHi0XZgrSYsujzaG9o5dSoD5FJmCSlDYv8acLd4nWRe',NULL,(NULL)) RETURNING "id"

func TestSignIn(t *testing.T) {

	environment.InitializeEnvs()
	database.InitializeGorm()
	ctx := context.Background()

	_ = SignIn(&ctx, &LoginDto{
		Email:    "anish@jain.com",
		Password: "anish@jain.com",
	})

}
