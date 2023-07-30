package aws

import (
	"bytes"
	"context"
	"fmt"
	"genai/infra/environment"
	"os"
	"testing"
)

func TestAw(t *testing.T) {
	environment.InitializeEnvs()
	InitAWS()

	fileName := "sofa1.png"
	file, err := os.Open(fileName)
	if err != nil {
		fmt.Println(err)
		os.Exit(1)
	}

	defer file.Close()

	fileInfo, _ := file.Stat()
	var size int64 = fileInfo.Size()

	buffer := make([]byte, size)

	// read file content to buffer
	file.Read(buffer)

	fileBytes := bytes.NewReader(buffer) // converted to io.ReadSeeker type

	ctx := context.Background()
	UploadDocument(&ctx, fileBytes, fileName)
}
