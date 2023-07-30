package socio

import (
	"context"
	"genai/common"
)

func GetContextUser(ctx *context.Context) *User {
	userModel := (*ctx).Value(common.CTX_USER)
	return userModel.(*User)
}
