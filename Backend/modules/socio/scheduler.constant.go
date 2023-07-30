package socio

import (
	"context"
)

type SchedulerStautusEnum string

const (
	PUBLISHED SchedulerStautusEnum = "PUBLISHED"
	RAW       SchedulerStautusEnum = "RAW"
)

var AppPublishedFun = map[string]func(*context.Context, *Post){
	"SMART_SOCIAL": postOnSmartSocial,
}
