package socio

import (
	"net/http"

	"github.com/gorilla/mux"

	"genai/common"
)

func InitRoutes(router *mux.Router) {

	router.Use(LoanUserAuthMiddleware)

	InitApiRoutes(router)
}

func InitApiRoutes(router *mux.Router) {
	router.StrictSlash(true)

	router.HandleFunc("/data", common.HandleHTTPGet(GetData)).Methods(http.MethodGet)

	router.HandleFunc("/brand", common.HandleHTTPPost(brandProfile)).Methods(http.MethodPut)

	router.HandleFunc("/post", common.HandleHTTPFileUpload(CreateDraft)).Methods(http.MethodPost)

	router.HandleFunc("/createai", common.HandleHTTPFileUpload(CreatePostUsingAi)).Methods(http.MethodPost)

	router.HandleFunc("/captionsai", common.HandleHTTPPost(CreateCaptions)).Methods(http.MethodPost)

	router.HandleFunc("/publishpost", common.HandleHTTPPost(PublishPost)).Methods(http.MethodPost)

	router.HandleFunc("/publishPost", common.HandleHTTPPost(PublishPost)).Methods(http.MethodPost)

	router.HandleFunc("/connectApp", common.HandleHTTPPost(ConnectApp)).Methods(http.MethodPost)
}

func InitNoAuth(router *mux.Router) {
	router.StrictSlash(true)
}
