package diffusion

import "time"

type Payload struct {
	Version string   `json:"version"`
	Input   InputDto `json:"input"`
}

type InputDto struct {
	ImagePath         string `json:"image_path,omitempty"`
	ProductSize       string `json:"product_size,omitempty"`
	Prompt            string `json:"prompt,omitempty"`
	NegativePrompt    string `json:"NegativePrompt,omitempty"`
	ApiKey            string `json:"api_key,omitempty"`
	Pixel             string `json:"pixel,omitempty"`
	Scale             string `json:"scale,omitempty"`
	ImageNum          uint `json:"image_num,omitempty"`
	GuidanceScale     string `json:"guidanceScale,omitempty"`
	NumInterfaceSteps uint   `json:"num_inference_steps,omitempty"`
	ManualSeed        int32  `json:"manual_seed,omitempty"`
}

type ImageDto struct {
	ImagePath string `json:"image_path"`
}

type PredictionResponse struct {
	ID        string      `json:"id"`
	Version   string      `json:"version"`
	Input     ImageDto    `json:"input"`
	Logs      string      `json:"logs"`
	Error     any         `json:"error"`
	Status    any         `json:"status"`
	CreatedAt time.Time   `json:"created_at"`
	Urls      ImageUrlDto `json:"urls"`
}

type ImageUrlDto struct {
	Cancel string `json:"cancel"`
	Get    string `json:"get"`
}

type TEmpPredictionResponse struct {
	CompletedAt *time.Time `json:"completed_at"`
	CreatedAt   time.Time  `json:"created_at"`
	Error       any        `json:"error"`
	ID          string     `json:"id"`
	Input       ImageDto   `json:"input"`
	Logs        any        `json:"logs"`
	Metrics     MetricsDto `json:"metrics"`
	Output      any        `json:"output"`
	StartedAt   any        `json:"started_at"`
	Status      string     `json:"status"`
	Version     string     `json:"version"`
}

type MetricsDto struct {
}

type GeneratedImageDto struct {
	ID      string `json:"id"`
	Version string `json:"version"`
	Input   struct {
		ImagePath string `json:"image_path"`
		Prompt    string `json:"prompt"`
	} `json:"input"`
	Logs        string    `json:"logs"`
	Output      []string  `json:"output"`
	Error       any       `json:"error"`
	Status      string    `json:"status"`
	CreatedAt   time.Time `json:"created_at"`
	StartedAt   time.Time `json:"started_at"`
	CompletedAt time.Time `json:"completed_at"`
	Metrics     struct {
		PredictTime float64 `json:"predict_time"`
	} `json:"metrics"`
	Urls struct {
		Cancel string `json:"cancel"`
		Get    string `json:"get"`
	} `json:"urls"`
}
