package database

import (
	"context"
	"fmt"
	"genai/infra/environment"

	"gorm.io/driver/postgres"
	"gorm.io/gorm"
)

var gormDB *gorm.DB

func InitializeGorm() {

	dns := fmt.Sprintf("host=%v user=%v password=%v dbname=%v",
		environment.POSTGRES_HOST,
		environment.POSTGRES_USER,
		environment.POSTGRES_PASSWORD,
		environment.POSTGRES_DBNAME,
	)

	db, err := gorm.Open(postgres.Open(dns), &gorm.Config{})

	fmt.Println(dns)
	if err != nil {
		panic("failed to connect database")
	}

	gormDB = db
	fmt.Println("Db connected.")
}

func GetDb(ctx *context.Context) *gorm.DB {
	return gormDB.WithContext(*ctx)
}
