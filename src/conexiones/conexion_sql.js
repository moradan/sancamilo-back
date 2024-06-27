const mysql = require("mysql2");

const poolConfig = {
    host: process.env.HOST,
    user: process.env.USUARIO,
    password: process.env.PASSWORD,
    database: process.env.BD,
    waitForConnections: true,
    connectionLimit: 10,
    maxIdle: 3,
    idleTimeout: 60000,
}

console.log("Creando pool de conexiones con alwaysdata");
const conexion_sql = mysql.createPool(poolConfig);

module.exports = conexion_sql;