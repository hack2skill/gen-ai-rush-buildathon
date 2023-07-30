package rest

import (
	"encoding/json"
	"fmt"
	"genai/common"
	"genai/infra/environment"
	"genai/modules/socio"
	"net/http"

	"github.com/gorilla/handlers"
	"github.com/gorilla/mux"
	"github.com/rs/cors"
	"go.uber.org/zap"
)

func InitializeApiRestServer() {

	router := mux.NewRouter().StrictSlash(true)

	// handler := CoreApiCorsMiddleware()(router)

	zap.L().Info("Http server up and running")
	zap.L().Debug("HTTP Api Server starting : " + fmt.Sprint(environment.PORT))

	initializeApiRoutes(router)

	headersOk := handlers.AllowedHeaders([]string{"Accept", "Accept-Language", "Content-Type", "Content-Language", "Origin", "X-AUTHORIZATION"})
	creds := handlers.AllowCredentials()
	originsOk := handlers.AllowedOrigins([]string{"http://localhost:3000", "http://10.182.0.182:3000", "http://10.182.0.182", "http://localhost", "localhost", "localhost:3000"})
	methodsOk := handlers.AllowedMethods([]string{"GET", "HEAD", "POST", "PUT", "OPTIONS"})
	http.ListenAndServe(":8000", handlers.CORS(headersOk, creds, originsOk, methodsOk)(router))

}

func initializeApiRoutes(router *mux.Router) {
	initHealthRoutes(router.PathPrefix("/apihealth").Subrouter())

	router.HandleFunc("/signin", common.HandleHTTPPost(socio.SignIn)).Methods(http.MethodPost)     //Done
	router.HandleFunc("/register", common.HandleHTTPPost(socio.Register)).Methods(http.MethodPost) //Done

	socio.InitRoutes(router.PathPrefix("/data").Subrouter())
}

func initHealthRoutes(router *mux.Router) {
	router.StrictSlash(true)
	router.HandleFunc("", healthCheck).Methods(http.MethodGet)
}

func healthCheck(w http.ResponseWriter, r *http.Request) {
	msg := "Rest Server Up and runnning"
	json.NewEncoder(w).Encode(msg)
}

var CoreApiCorsMiddleware = func() func(http.Handler) http.Handler {
	return cors.New(cors.Options{
		AllowedOrigins: []string{"http://localhost:3000", "http://10.182.0.182:3000", "http://10.182.0.182", "http://localhost", "localhost", "localhost:3000"},
		AllowedHeaders: []string{"Content-Type, Origin, Accept, Authorization, Content-Length, X-Requested-With"},
		AllowedMethods: []string{"GET", "POST", "PUT", "PATCH", "DELETE", "HEAD", "OPTIONS"},
	}).Handler
}
