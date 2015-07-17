package main

import (
    "encoding/json"
    "fmt"
    "net/http"

    "github.com/gorilla/mux"
)

type RouteInfo struct {
    Name        string
    Method      string
    Pattern     string
}

type RouteInfos []RouteInfo

var routeInfos = RouteInfos{
    RouteInfo{
        "Index",
        "GET",
        "/",
    },
    RouteInfo{
        "TodoIndex",
        "GET",
        "/todos",        
    },
    RouteInfo{
        "TodoShow",
        "GET",
        "/todos/{todoId}",
    },
}

func Index(w http.ResponseWriter, r *http.Request) {
    fmt.Fprintln(w, "Welcome!")
}

func TodoIndex(w http.ResponseWriter, r *http.Request) {   

    if err := json.NewEncoder(w).Encode(routeInfos); err != nil {
        panic(err)
    }
}

func TodoShow(w http.ResponseWriter, r *http.Request) {
    vars := mux.Vars(r)
    todoId := vars["todoId"]
    fmt.Fprintln(w, "Todo show:", todoId)
}