package diffusion

import (
	"context"
	"encoding/json"
	"genai/infra/environment"
	"testing"
)

func TestFusion(t *testing.T) {

	ctx := context.Background()

	environment.InitializeEnvs()
	InitDiffusion()

	res := Predict(&ctx, Payload{
		Version: "b1c17d148455c1fda435ababe9ab1e03bc0d917cc3cf4251916f22c45c83c7df",
		Input: InputDto{
			Prompt:    "modern sofa+ in a contemporary living room, filled with stylish decor+;modern, contemporary, sofa, living room, stylish decor",
			ImagePath: "/Users/anishjain/go/src/genai/sofa1.png",
		},
	})

	print(res)

}

func TestImageGet(t *testing.T) {

	ctx := context.Background()

	environment.InitializeEnvs()
	InitDiffusion()

	var inputDto *PredictionResponse

	str := `{"version":"b1c17d148455c1fda435ababe9ab1e03bc0d917cc3cf4251916f22c45c83c7df","input":{"image_path":"https://pbxt.replicate.delivery/JAIk0rFAOUG00uetuiLOHPz42lBcf7QfX3xWi7TVaxMXXD4n/sofa1.png","prompt":"modern sofa+ in a contemporary living room, filled with stylish decor+;modern, contemporary, sofa, living room, stylish decor"}}{"id":"rndjhsdbe4yu7wblvvnytqnkiu","version":"b1c17d148455c1fda435ababe9ab1e03bc0d917cc3cf4251916f22c45c83c7df","input":{"image_path":"https://pbxt.replicate.delivery/JAIk0rFAOUG00uetuiLOHPz42lBcf7QfX3xWi7TVaxMXXD4n/sofa1.png","prompt":"modern sofa+ in a contemporary living room, filled with stylish decor+;modern, contemporary, sofa, living room, stylish decor"},"logs":"","error":null,"status":"starting","created_at":"2023-07-29T17:02:22.081447334Z","urls":{"cancel":"https://api.replicate.com/v1/predictions/rndjhsdbe4yu7wblvvnytqnkiu/cancel","get":"https://api.replicate.com/v1/predictions/rndjhsdbe4yu7wblvvnytqnkiu"}}
	`

	_ = json.Unmarshal([]byte(str), inputDto)

	res := GetImageFromPredictiction(&ctx, "rndjhsdbe4yu7wblvvnytqnkiu")

	print(res)

}
