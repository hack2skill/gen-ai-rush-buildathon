package common

import (
	"bytes"
	"context"
	"encoding/json"
	"io"
	"net/http"
)

func HandleHTTPGet[OutputDtoType any](serviceFunc func(ctx *context.Context) *OutputDtoType) http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {

		ctx := r.Context()

		queries := r.URL.Query()
		ctx = context.WithValue(ctx, CTX_QUERIES, &queries)

		response := serviceFunc(&ctx)

		w.Header().Set(string(HEADER_CONTENT_TYPE), "application/json")
		// w.Header().Set("Access-Control-Allow-Origin", "*")
		// w.Header().Set("Access-Control-Allow-Methods", "GET,POST,PUT,PATCH,DELETE,HEAD,OPTIONS")
		// w.Header().Set("Access-Control-Allow-Headers", "Content-Type, Origin, Accept, Authorization, Content-Length, X-Requested-With")

		json.NewEncoder(w).Encode(response)
	}
}

func HandleHTTPPost[InputDtoType any, OutputDtoType any](serviceFunc func(ctx *context.Context, dto *InputDtoType) *OutputDtoType) http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {

		ctx := r.Context()
		pCtx := &ctx

		var dto InputDtoType

		_ = json.NewDecoder(r.Body).Decode(&dto)

		response := serviceFunc(pCtx, &dto)
		w.Header().Set(string(HEADER_CONTENT_TYPE), "application/json")
		// w.Header().Set("Access-Control-Allow-Origin", "*")
		// w.Header().Set("Access-Control-Allow-Methods", "GET,POST,PUT,PATCH,DELETE,HEAD,OPTIONS")
		// w.Header().Set("Access-Control-Allow-Headers", "Content-Type, Origin, Accept, Authorization, Content-Length, X-Requested-With")

		print(w.Header().Get("Access-Control-Allow-Origin"))
		json.NewEncoder(w).Encode(response)
	}
}

func HandleHTTPFileUpload[OutputDtoType any](serviceFunc func(ctx *context.Context) *OutputDtoType) http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {

		ctx := r.Context()

		err := r.ParseMultipartForm(10 << 20) // 10MB limit
		if err != nil {
			panic(err.Error())
		}

		formValues := r.Form
		ctx = context.WithValue(ctx, "FORM_VALUES", &formValues)

		fileHeaders := r.MultipartForm.File["image"]

		for _, fileHeader := range fileHeaders {

			file, err := fileHeader.Open()
			if err != nil {
				panic(err.Error())
			}

			buffer := bytes.NewBuffer(nil)

			_, err = io.Copy(buffer, file)
			if err != nil {
				panic(err.Error())
			}

			file.Seek(0, io.SeekStart)

			newFile := &FileData{
				File:     file,
				Header:   fileHeader,
				Filename: fileHeader.Filename,
			}
			ctx = context.WithValue(ctx, "CTX_FILES", newFile)
		}

		response := serviceFunc(&ctx)

		w.Header().Set(string(HEADER_CONTENT_TYPE), "application/json")
		// w.Header().Set("Access-Control-Allow-Origin", "*")
		// w.Header().Set("Access-Control-Allow-Methods", "GET,POST,PUT,PATCH,DELETE,HEAD,OPTIONS")
		// w.Header().Set("Access-Control-Allow-Headers", "Content-Type, Origin, Accept, Authorization, Content-Length, X-Requested-With")

		json.NewEncoder(w).Encode(response)

	}
}
