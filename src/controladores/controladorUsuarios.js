const conexion = require('../conexiones/conexion_sql');

/**
 * @type {import("express").RequestHandler}
 */
function todos(pedido, respuesta) {
    console.log("Consultando todos los usuarios en alwaysdata...");
    const comandoSql = 'SELECT * FROM usuarios';

    conexion.query(comandoSql, (error, resultado) => {
        if (error) {
            console.error(error);
            respuesta.status(500).json({ mensaje: "No pudimos consultar la base de datos." })
            return;
        }

        console.log("Enviamos la lista de usuarios.");
        respuesta.status(200).json(resultado);
        return;
    })
}

/** 
 * @type {import("express").RequestHandler}
 */
function login(pedido, respuesta) {
    const { email, password } = pedido.params;

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
        if (usuarioBuscado && password === usuarioBuscado.password) {
            respuesta.status(200).json({ message: "Usuario autentificado." });
        } else {
            respuesta.status(401).json({ message: "Nombre de usuario o contrasenia invalidos." });
        }
        return;
    });
}

/**
 * @type {import("express").RequestHandler}
 */
function profesionales(pedido, respuesta) {
    const comandoSql = "SELECT * FROM usuarios WHERE especialidad IS NOT NULL";

    console.log("Consultando la tabla de profesionales.");
    conexion.query(comandoSql, (error, resultado) => {
        if (error) {
            console.log("Ocurrio un error ejecutando la consulta:");
            console.error(error);
            respuesta.status(500).json({ mensaje: "No pudimos ejecutar la consulta." });
            console.log("Respuesta enviada con estado 500.");
            return;
        }
        console.log("Respuesta enviada con lista de profesionales.");
        respuesta.status(200).json(resultado);
    })
}

/** @type {import("express").RequestHandler} */
const registrarse = (pedido, respuesta) => {
    console.log("Procesando el pedido de registrar un usuario");

    const {
        nombreCompleto,
        sexo,
        fechaNacimiento,
        email,
        prepaga,
        especialidad,
        password } = pedido.body;

    const comandoSql = 'INSERT INTO usuarios ' +
        '(nombre_completo, sexo, fecha_nacimiento, email, prepaga, especialidad, password) ' +
        'VALUES (?, ?, ?, ?, ?, ?, ?)';

    conexion.query(comandoSql, [
        nombreCompleto,
        sexo,
        fechaNacimiento,
        email,
        prepaga,
        especialidad,
        password,
    ], (error, resultado) => {
        if (error) {
            console.log("No se pudo agregar ese usuario a la base de datos.");
            console.error(error);
        } else {
            console.log("Se agrego un usuario a la base de datos", resultado);
            respuesta.status(201).json({
                mensaje: "El usuario fue creado con exito",
                usuarioAgregado: resultado
            });
        }
    });
}

module.exports = {
    todos,
    login,
    profesionales,
    registrarse,
}