const conexion = require("../conexiones/conexion_sql");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

/** @type {import("express").RequestHandler} */
function autenticar(pedido, respuesta, proximo) {
    const { email, password } = pedido.body;

    if (!email || !password) {
        respuesta.status(400).json({ message: "el pedido no incluye todos los campos necesarios" });
        return;
    }

    /** @type {string} */
    const comandoSql = "SELECT * FROM usuarios WHERE email = ?";
    conexion.query(comandoSql, [email], (error, resultado) => {
        if (error) {
            console.log(error);
            respuesta.status(500).json({ mensaje: "No se pudo completar la busqueda." });
            return;
        }

        if (resultado.length > 1) {
            console.log(resultado);
            respuesta.status(500).json({ mensaje: "Hay varios registros con el mismo email y solo deberia haber 1." });
            return;
        }

        const usuarioBuscado = resultado[0];
        if (usuarioBuscado && bcrypt.compareSync(password, usuarioBuscado.password)) {
            const token = jwt.sign({ id: usuarioBuscado.id }, process.env.CLAVE_SECRETA, { expiresIn: process.env.VENCIMIENTO_TOKEN });
            respuesta.status(200).json({ auth: true, token });
        } else {
            respuesta.status(401).json({ message: "Nombre de usuario o contrasenia invalidos." });
        }
        return;
    });
}

module.exports = autenticar;