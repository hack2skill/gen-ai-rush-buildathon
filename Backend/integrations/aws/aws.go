package aws

import (
	"context"
	"genai/infra/environment"
	"io"

	"github.com/aws/aws-sdk-go/aws"
	"github.com/aws/aws-sdk-go/aws/credentials"
	"github.com/aws/aws-sdk-go/aws/session"
	"github.com/aws/aws-sdk-go/service/s3"
	"github.com/aws/aws-sdk-go/service/s3/s3manager"
)

var awsSession *session.Session
var s3Client *s3.S3
var uploader *s3manager.Uploader

func InitAWS() {

	if awsSession == nil {

		config := &aws.Config{
			Region:      aws.String("ap-south-1"),
			Credentials: credentials.NewStaticCredentials(environment.ClientId, environment.ClientSecret, ""),
		}

		awsSession = session.New(config)
		uploader = s3manager.NewUploader(awsSession)
	}
}

func UploadDocument(ctx *context.Context, image io.ReadSeeker, filename string) (*s3manager.UploadOutput, string) {
	image.Seek(0, io.SeekStart)

	input := &s3manager.UploadInput{
		Bucket:      aws.String("pice-uat-public"),        // bucket's name
		Key:         aws.String("anish-temp/" + filename), // files destination location
		Body:        image,                                // content of the file
		ContentType: aws.String("image/jpg"),              // content type
	}
	response, err := uploader.UploadWithContext(context.Background(), input)

	if err != nil {
		panic(err.Error())
	}

	return response, response.Location
}

func getS3UrlPrefix() string {
	return "https://pice-uat-public.s3.ap-south-1.amazonaws.com/anish-temp/"
}
