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
        console.error(error);
        return;
    }

    console.log("conectado a always data");
}

module.exports = conexion_sql;