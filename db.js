const Pool = require("pg").Pool;

const conn = new Pool({
    user: "postgres",
    password: "abc",
    host: "localhost",
    port: 5432,
    database: "todo"
});

module.exports = conn;