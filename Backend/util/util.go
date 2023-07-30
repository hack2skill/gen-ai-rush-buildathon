package util

import (
	"encoding/json"
	"errors"
	"fmt"

	"github.com/google/uuid"
)

func GetUUid() string {
	return uuid.New().String()
}

func Scan[dtoType any](value interface{}, model *dtoType) error {
	bytes, ok := value.([]byte)
	if !ok {
		return errors.New(fmt.Sprint("Failed to unmarshal JSONB value:", value))
	}

	err := json.Unmarshal(bytes, model)
	return err
}

func Value[dtoType any](j dtoType) ([]byte, error) {
	return json.Marshal(j)
}


func Ternary[T any](condition bool, valueIfTrue T, valueIfFalse T) T {
	if condition {
		return valueIfTrue
	} else {
		return valueIfFalse
	}
}
