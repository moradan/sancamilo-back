const mysql = require("mysql2");

const conexion_sql = mysql.createConnection({
    host: 'mysql-moradandb.alwaysdata.net',
    user: 'moradandb',
    password: 'cac2024',
    database: 'moradandb_sancamilo'
});

conexion_sql.connect(callback);

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