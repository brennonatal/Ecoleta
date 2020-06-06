const express = require("express")
const server = express()

// configurar pasta publica
server.use(express.static("public"))

// utilizando template engine
const nunjucks = require("nunjucks")
nunjucks.configure("src/views", {
    express: server,
    noCache: true
})

// configurar caminhos da aplicacao
// pafina inicial
server.get("/", (req, res) => {
                // __dirname represents the directory name where THIS file is located (src)
    return res.render("index.njk")
})

server.get("/create-point", (req, res) => {
                // __dirname represents the directory name where THIS file is located (src)
    return res.render("create-point.njk")
})

server.get("/search", (req, res) => {
                // __dirname represents the directory name where THIS file is located (src)
    return res.render("search-results.njk")
})

// ligar o servidor
server.listen(3000)