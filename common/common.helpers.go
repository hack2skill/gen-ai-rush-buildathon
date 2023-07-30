package common

import (
	"context"
	"net/url"
	"strings"
	"time"
)

func GetQueryValueFromCtx(ctx *context.Context) *url.Values {

	query := (*ctx).Value(CTX_QUERIES).(*url.Values)

	return query
}

func ParseToTsQuery(str string) string {
	strs := strings.Split(str, " ")

	return strings.Join(strs, " & ")
}

func GmtNow() time.Time {
	return time.Now().In(time.UTC)
}

func GetFormValues(ctx *context.Context) *url.Values {
	formValues := (*ctx).Value("FORM_VALUES").(*url.Values)

	return formValues
}
