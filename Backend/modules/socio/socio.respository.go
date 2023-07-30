package socio

import (
	"context"
	"genai/infra/database"

	"go.uber.org/zap"
)

// Bulk creation of videos
func createUser(ctx *context.Context, data *User) *User {

	db := database.GetDb(ctx)

	result := db.Create(data)
	if result.Error != nil {
		zap.L().Debug(result.Error.Error())
	}
	return data
}

func saveUser(ctx *context.Context, data *User) *User {

	db := database.GetDb(ctx)

	result := db.Save(data)
	if result.Error != nil {
		zap.L().Debug(result.Error.Error())
	}
	return data
}

func GetUserByEmail(ctx *context.Context, email string) *User {

	db := database.GetDb(ctx)

	userModel := User{}
	result := db.First(&userModel, User{Email: email})
	if result.Error != nil {
		zap.L().Debug(result.Error.Error())
	}
	return &userModel
}

func GetUserByUuid(ctx *context.Context, uuid string) *User {

	db := database.GetDb(ctx)

	userModel := User{}
	result := db.First(&userModel, User{Uuid: uuid})
	if result.Error != nil {
		zap.L().Debug(result.Error.Error())
	}
	return &userModel
}

func createBrandProfile(ctx *context.Context, data *BrandProfile) *BrandProfile {

	db := database.GetDb(ctx)

	result := db.Create(data)
	if result.Error != nil {
		zap.L().Debug(result.Error.Error())
	}
	return data
}

func saveBrandProfile(ctx *context.Context, data *BrandProfile) *BrandProfile {

	db := database.GetDb(ctx)

	result := db.Save(data)
	if result.Error != nil {
		zap.L().Debug(result.Error.Error())
	}
	return data
}

func GetBrandDetailsByUserId(ctx *context.Context, userId string) *BrandProfile {

	db := database.GetDb(ctx)

	userModel := BrandProfile{}
	result := db.First(&userModel, BrandProfile{UserId: userId})
	if result.Error != nil {
		zap.L().Debug(result.Error.Error())
	}
	return &userModel
}

func createPostDb(ctx *context.Context, data *Post) *Post {

	db := database.GetDb(ctx)

	result := db.Create(data)
	if result.Error != nil {
		zap.L().Debug(result.Error.Error())
	}
	return data
}

func GetDraftPostById(ctx *context.Context, id string) *Post {

	db := database.GetDb(ctx)

	postModel := Post{}
	result := db.First(&postModel, Post{Uuid: id, Status: DRAFT_POST})
	if result.Error != nil {
		zap.L().Debug(result.Error.Error())
	}
	return &postModel
}

func GetPostById(ctx *context.Context, id string) *Post {

	db := database.GetDb(ctx)

	postModel := Post{}
	result := db.First(&postModel, Post{Uuid: id})
	if result.Error != nil {
		zap.L().Debug(result.Error.Error())
	}
	return &postModel
}

func GetPostsByUserId(ctx *context.Context, userId string) []Post {

	db := database.GetDb(ctx)

	postModel := []Post{}
	result := db.Find(&postModel, Post{UserId: userId})
	if result.Error != nil {
		zap.L().Debug(result.Error.Error())
	}
	return postModel
}

func SavePostDb(ctx *context.Context, data *Post) *Post {

	db := database.GetDb(ctx)

	result := db.Create(data)
	if result.Error != nil {
		zap.L().Debug(result.Error.Error())
	}
	return data
}
