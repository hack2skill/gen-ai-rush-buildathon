package socio

import (
	"context"
	"genai/common"
	"genai/infra/environment"
	"net/http"
	"strings"

	"github.com/golang-jwt/jwt"
)

func LoanUserAuthMiddleware(next http.Handler) http.Handler {
	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		ctx := r.Context()

		token := r.Header.Get(common.SESSION_TOKEN)
		tokens := strings.Split(token, " ")
		var claims JwtClaims

		_, err := jwt.ParseWithClaims(tokens[1], &claims, func(token *jwt.Token) (interface{}, error) {
			return []byte(environment.JWT_SECRET), nil
		})
		if err != nil {
			print(err.Error())
		}

		userModel := GetUserByUuid(&ctx, claims.UserId)
		

		ctx = context.WithValue(ctx, common.CTX_USER, userModel)

		next.ServeHTTP(w, r.WithContext(ctx))
	})
}
