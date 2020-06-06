const express = require("express")
const server = express()

// pegar o banco de dados
const db = require("./database/db.js")

// configurar pasta publica
server.use(express.static("public"))

// habilitar o uso do req.body
server.use(express.urlencoded({ extended: true }))

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

    // req.query: Query Strings da url
    // console.log(req.query)

    return res.render("create-point.njk")
})

server.post("/save-point", (req, res) => {

    // req.body: O corpo do formulario enviado
    // console.log(req.body)

    // inserir dados no banco
    const query = `
    INSERT INTO places (
        image, name, address, address2, state, city, items
    ) VALUES (?, ?, ?, ?, ?, ?, ?);`

    const values = [
        req.body.image,
        req.body.name,
        req.body.address,
        req.body.address2,
        req.body.state,
        req.body.city,
        req.body.items]

    function afterInsertData(err) {
        if (err) {
            console.log(err)
            return res.render("create-point.njk", { erro: true })
        }

        console.log("Cadastrado com sucesso!")
        console.log(this)

        return res.render("create-point.njk", { saved: true })
    }

    db.run(query, values, afterInsertData)

})

server.get("/search", (req, res) => {

    const search = req.query.search

    if (search == "") {
        return res.render("search-results.njk", { total: 0 })
    }

    // pegar os dados do banco de dados
    db.all(`SELECT * FROM places WHERE city LIKE '%${search}%'`, function (err, rows) {
        if (err) {
            return console.log(err)
        }
        console.log("Dados da tabela: ")
        console.log(rows)

        const total = rows.length

        // mostrar a pagina com os dados do banco de dados
        return res.render("search-results.njk", { places: rows, total: total })
    })

})

// ligar o servidor
server.listen(3000)