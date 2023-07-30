package common

import (
	"io"
	"mime/multipart"
)

type SuccessDto struct {
	Meta AckDto      `json:"meta"`
	Data interface{} `json:"data"`
}

type AckDto struct {
	Success          bool              `json:"success"`
	Message          *string           `json:"message"`
	PaginationParams *PaginationParams `json:"paginationParams,omitempty"`
	IsPaginated      bool              `json:"isPaginated"`
}

type PaginationParams struct {
	Page     int `json:"page"`
	PageSize int `json:"pageSize"`
}

type BlankDto struct {
}

type FileData struct {
	File       multipart.File
	Header     *multipart.FileHeader
	ReadSeeker io.ReadSeeker
	Filename   string
}
