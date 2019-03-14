package main

import (
	"log"
	"net/http"
	"os"

	"github.com/gorilla/mux"
)

const (
	defaultPort = "8080"
)

func main() {
	srvPort := defaultPort
	if os.Getenv("PORT") != "" {
		srvPort = os.Getenv("PORT")
	}
	addr := os.Getenv("LISTEN_ADDR")

	r := mux.NewRouter()

	// Serve typescript sources in dev mode.
	r.PathPrefix("/sources/src/").Handler(
		http.StripPrefix("/sources/src/", http.FileServer(http.Dir("./src/"))))

	// Serve compiled javascript.
	r.PathPrefix("/").Handler(http.FileServer(http.Dir("./static/")))

	log.Printf("Listening on " + addr + ":" + srvPort)
	log.Fatal(http.ListenAndServe(addr+":"+srvPort, r))
}
