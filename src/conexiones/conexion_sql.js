const mysql = require("mysql2");

const conexion_sql = mysql.createPool({
    host: 'mysql-moradandb.alwaysdata.net',
    user: 'moradandb',
    password: 'cac2024',
    database: 'moradandb_sancamilo',
    waitForConnections: true,
    connectionLimit: 10,
    maxIdle: 3,
    idleTimeout: 60000,
});

// conexion_sql.connect(callback);

function callback(error) {
    console.log("Intentando conectarse a alwaysdata.");

    if (error) {
        console.log("No pudimos conectarnos con alwaysdata");
        console.error(error);
        return;
    }

    console.log("conectado a alwaysdata");
}

module.exports = conexion_sql;