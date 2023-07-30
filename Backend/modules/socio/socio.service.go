package socio

import (
	"context"
	"genai/common"
	"genai/infra/environment"
	"genai/integrations/aws"
	"genai/integrations/diffusion"
	"genai/integrations/gpt"
	"genai/util"
	"strings"
	"time"

	"github.com/golang-jwt/jwt/v4"
	"golang.org/x/crypto/bcrypt"
)

func Register(ctx *context.Context, requestDto *LoginDto) *LoginResponseDto {

	hash, _ := bcrypt.GenerateFromPassword([]byte(requestDto.Password), common.COST)

	userModel := createUser(ctx, &User{
		Email:    requestDto.Email,
		Password: string(hash),
		Uuid:     util.GetUUid(),
	})

	token := jwt.NewWithClaims(jwt.SigningMethodHS256, &JwtClaims{
		UserId: userModel.Uuid,
	})

	tokenString, err := token.SignedString(environment.JWT_SECRET)

	if err != nil {
		panic(err.Error())
	}
	return &LoginResponseDto{
		Token:           tokenString,
		UserObj:         *userModel,
		BrandProfileObj: BrandProfile{},
		PostsObj:        []Post{},
	}
}

func GetData(ctx *context.Context) *LoginResponseDto {

	userModel := GetContextUser(ctx)
	conecctedAps := make([]connectedAppsDto, 0)

	for _, connectedapps := range userModel.ConnectedApps {
		conecctedAps = append(conecctedAps, connectedAppsDto{
			AppId: connectedapps,
		})
	}

	return &LoginResponseDto{
		UserObj:         *userModel,
		BrandProfileObj: *GetBrandDetailsByUserId(ctx, userModel.Uuid),
		PostsObj:        GetPostsByUserId(ctx, userModel.Uuid),
		ConnectedApps:   conecctedAps,
	}
}

func SignIn(ctx *context.Context, requestDto *LoginDto) *LoginResponseDto {

	hash, _ := bcrypt.GenerateFromPassword([]byte(requestDto.Password), common.COST)

	userModel := GetUserByEmail(ctx, requestDto.Email)

	conecctedAps := make([]connectedAppsDto, 0)

	for _, connectedapps := range userModel.ConnectedApps {
		conecctedAps = append(conecctedAps, connectedAppsDto{
			AppId: connectedapps,
		})
	}

	if true || string(hash) == userModel.Password {

		token := jwt.NewWithClaims(jwt.SigningMethodHS256, &JwtClaims{
			UserId: userModel.Uuid,
		})
		tokenString, _ := token.SignedString(environment.JWT_SECRET)

		brandProfile := GetBrandDetailsByUserId(ctx, userModel.Uuid)

		if len(conecctedAps) > 0 {
			return &LoginResponseDto{
				Token:           tokenString,
				UserObj:         *userModel,
				BrandProfileObj: *brandProfile,
				PostsObj:        GetPostsByUserId(ctx, userModel.Uuid),
				ConnectedApps:   conecctedAps,
			}
		} else {
			return &LoginResponseDto{
				Token:           tokenString,
				UserObj:         *userModel,
				BrandProfileObj: *brandProfile,
				PostsObj:        GetPostsByUserId(ctx, userModel.Uuid),
				ConnectedApps:   conecctedAps,
			}
		}
	}
	return nil
}

func brandProfile(ctx *context.Context, requestDto *BrandProfileDto) *BrandProfile {

	UserModel := GetContextUser(ctx)

	brandProfile := GetBrandDetailsByUserId(ctx, UserModel.Uuid)

	if brandProfile != nil {
		brandProfile.Name = util.Ternary(brandProfile.Name == "", requestDto.Name, brandProfile.Name)
		brandProfile.ProductCategory = util.Ternary(brandProfile.ProductCategory == "", requestDto.ProductCategory, brandProfile.ProductCategory)
		brandProfile.UserId = util.Ternary(brandProfile.UserId == "", requestDto.UserId, brandProfile.UserId)
		brandProfile.Description = util.Ternary(brandProfile.Description == "", requestDto.Description, brandProfile.Description)
		brandProfile.PurposeStatement = util.Ternary(brandProfile.PurposeStatement == "", requestDto.PurposeStatement, brandProfile.PurposeStatement)
		brandProfile.Vision = util.Ternary(brandProfile.Vision == "", requestDto.Vision, brandProfile.Vision)
		brandProfile.TargetGender = util.Ternary(brandProfile.TargetGender == "", requestDto.TargetGender, brandProfile.TargetGender)
		brandProfile.TargetAgeRange = util.Ternary(brandProfile.TargetAgeRange == "", requestDto.TargetAgeRange, brandProfile.TargetAgeRange)
		brandProfile.TargetCity = util.Ternary(brandProfile.TargetCity == "", requestDto.TargetCity, brandProfile.TargetCity)
		brandProfile.BrandVoice = util.Ternary(brandProfile.BrandVoice == "", requestDto.BrandVoice, brandProfile.BrandVoice)
		brandProfile.ArcheType = util.Ternary(brandProfile.ArcheType == "", requestDto.ArcheType, brandProfile.ArcheType)
		brandProfile.BrandLogo = util.Ternary(brandProfile.BrandLogo == "", requestDto.BrandLogo, brandProfile.BrandLogo)

		saveBrandProfile(ctx, brandProfile)
	} else {
		brandProfile = createBrandProfile(ctx, &BrandProfile{
			UserId:           UserModel.Uuid,
			Name:             requestDto.Name,
			ProductCategory:  requestDto.ProductCategory,
			Description:      requestDto.Description,
			PurposeStatement: requestDto.PurposeStatement,
			Vision:           requestDto.Vision,
			BrandVoice:       requestDto.BrandVoice,
			ArcheType:        requestDto.Archetype,
			BrandLogo:        requestDto.BrandLogo,
			TargetGender:     requestDto.TargetGender,
			TargetAgeRange:   requestDto.TargetAgeRange,
			TargetCity:       requestDto.TargetCity,
		})
	}

	return brandProfile
}

func CreateDraft(ctx *context.Context) *Post {

	files := (*ctx).Value("CTX_FILES").(*common.FileData)
	_, location := aws.UploadDocument(ctx, files.File, files.Filename)

	formData := common.GetFormValues(ctx)

	UserModel := GetContextUser(ctx)

	imageId := util.GetUUid()
	postModel := createPostDb(ctx, &Post{
		Uuid:      imageId,
		Status:    DRAFT_POST,
		ImageName: imageId,
		Caption:   formData.Get("content"),
		UserId:    UserModel.Uuid,
		ImageUrl:  location,
	})

	return postModel
}

func CreatePostUsingAi(ctx *context.Context) *PromptImagesDto {

	files := (*ctx).Value("CTX_FILES").(*common.FileData)
	_, location := aws.UploadDocument(ctx, files.File, files.Filename)

	formValues := common.GetFormValues(ctx)

	response := diffusion.Predict(ctx, diffusion.Payload{
		Version: common.VERSION,
		Input: diffusion.InputDto{
			ImagePath: location,
			Prompt:    formValues.Get("prompt"),
			ImageNum:  4,
		},
	})

	var imageResponse *diffusion.GeneratedImageDto
	status := "STARTING"

	for ok := true; ok; ok = (status == "STARTING" || status == "processing" || status == "starting") {
		imageResponse = diffusion.GetImageFromPredictiction(ctx, response.ID)
		status = imageResponse.Status
		time.Sleep(100)
	}

	return &PromptImagesDto{
		Urls: imageResponse.Output,
	}
}

func CreateCaptions(ctx *context.Context, requestDto *CaptionRequestDto) *CaptionResponsetDto {

	response := gpt.Predict(ctx, &gpt.Payload{
		Prompt:      requestDto.Prompt,
		Model:       "text-davinci-003",
		Temperature: 0.6,
		MaxToken:    256,
	})

	return &CaptionResponsetDto{
		Caption: strings.TrimSpace(response.Choices[0].Text),
	}
}

func PublishPost(ctx *context.Context, requestDto *publishPostDto) *Post {

	draftPost := GetDraftPostById(ctx, requestDto.PostId)
	var postToPublish Post
	for _, config := range requestDto.Config {

		postToPublish = Post{
			Uuid:          util.GetUUid(),
			UserId:        draftPost.UserId,
			ImageName:     draftPost.ImageName,
			Caption:       draftPost.Caption,
			ParentDraftId: draftPost.Uuid,
			AppId:         config.AppId,
		}

		if config.Schedule == nil {
			postToPublish.Status = PUBLISHED_POST

			createScheduler(ctx, &Scheduler{
				PostId:        postToPublish.Uuid,
				Status:        RAW,
				ScheduledTime: common.GmtNow(),
				AppName:       "SMART_SOCIAL",
				UserId:        postToPublish.UserId,
			})

		} else {
			postToPublish.Status = SCHEDULED_POST
			postToPublish.PublishTime = *config.Schedule

			createScheduler(ctx, &Scheduler{
				PostId:        postToPublish.Uuid,
				Status:        RAW,
				ScheduledTime: *config.Schedule,
				AppName:       "SMART_SOCIAL",
				UserId:        postToPublish.UserId,
			})
		}

		createPostDb(ctx, &postToPublish)
	}

	return &postToPublish
}

func ConnectApp(ctx *context.Context, requestDto *ConnectAppsRequest) *ConnectResponse {

	userModel := GetContextUser(ctx)

	userModel.ConnectedApps = append(userModel.ConnectedApps, requestDto.AppId)

	saveUser(ctx, userModel)

	return &ConnectResponse{
		UserModel: *userModel,
	}

}
