import express from "express";

let configViewEngine = (app) => {
    app.use(express.static("./api/public"));
    app.set("view engine", "ejs");
    app.set("views", "./api/views")
}

module.exports = configViewEngine;