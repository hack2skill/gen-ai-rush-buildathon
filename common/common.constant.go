package common

type ContextTypeEnum int

const (
	CTX_QUERIES ContextTypeEnum = iota

	CTX_PARAMS
)

type HeaderEnum string

const (
	HEADER_CONTENT_TYPE HeaderEnum = "Content-Type"
)

var NEXT_TOKEN string = ""
var PUBLISHED_AFTER string = "2021-01-01T00:00:00Z"

var COST = 1

var CTX_USER = "USER"

var SESSION_TOKEN = "X-AUTHORIZATION"

var VERSION = "b1c17d148455c1fda435ababe9ab1e03bc0d917cc3cf4251916f22c45c83c7df"
