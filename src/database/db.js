// importar a dependencia do sqlite3
const sqlite3 = require("sqlite3").verbose()

// criar o objeto que ira fazer operacoes no banco de dados
const db = new sqlite3.Database("./src/database/database.db")

module.exports = db
// utilizar o objeto do banco


db.serialize(() => {
//     // Criar uma tabela
//     db.run(`
//         CREATE TABLE IF NOT EXISTS places (
//             id INTEGER PRIMARY KEY AUTOINCREMENT,
//             image TEXT,
//             name TEXT,
//             address TEXT,
//             address2 TEXT,
//             state TEXT,
//             city TEXT,
//             items TEXT
//         );
//     `)

//     // Inserir dado na tabela
//     const query = `
//     INSERT INTO places (
//         image, name, address, address2, state, city, items
//     ) VALUES (?, ?, ?, ?, ?, ?, ?);`

//     const values = ["image", "name", "address", "address2", "state", "city", "item1, item2"]

//     function afterInsertData(err) {
//         if(err){
//             return console.log(err)
//         }

//         console.log("Cadastrado com sucesso!")
//         console.log(this)
//     }

//     db.run(query, values, afterInsertData)

//     // Consultar dados na tabela
//     db.all(`SELECT * FROM places`, function(err, rows) {
//         if(err){
//             return console.log(err)
//         }
//         console.log("Dados da tabela: ")
//         console.log(rows)
//     })

//     // Deletar dados na tabela
//      db.run(`DELETE FROM places WHERE id = ?`, [1], function(err) {
//          if(err){
//              return console.log(err)
//          }
//          console.log("Registro deletado com sucesso!")
//      })
})

