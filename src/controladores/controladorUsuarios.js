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

/**
 * Este modulo atiende los pedidos de la API para registrar un usuario. Debe comprobar que el usuario no sea duplicado y agregarlo a la base de datos
 * luego devolver un json con un mensaje de confirmacion y estado 201 Created. De ser un usuario duplicado debe contestar con 409 Resource Conflict.
 * @type {import("express").RequestHandler}
 */
function registrarse(pedido, respuesta) {
    /** @type {string | undefined} */
    const email = pedido.query.email;
    if (!email) {
        respuesta.status(400).json({ message: "el pedido no está bien formulado" })
        return;
    }

    if (usuarioExiste(email)) {
        respuesta.status(409).json({ message: "Ya existe un usuario con esa direccion de email." });
        return;
    }

    /** @type {Usuario | undefined} */
    const usuarioParaAgregar = new Usuario(
        pedido.query.nombreCompleto,
        pedido.query.sexo,
        pedido.query.fechaNacimiento,
        pedido.query.email,
        pedido.query.prepaga,
        pedido.query.especialidad,
        pedido.query.password
    );

    // Almacenar el usuario utilizando la conexion a base de datos simulada.
    conexion.agregarUsuario(usuarioParaAgregar);

    respuesta.status(201).json({
        message: "El siguiente usuario fue agregado con exito.",
        usuarioAgregado: usuarioParaAgregar
    })
}

/**
 * 
 * @param {string} email 
 * @returns {boolean} true si ya existe un registro en base de datos con el email; de otro modo false.
 */
function usuarioExiste(email) {
    const comandoSql = "SELECT * FROM usuarios WHERE email = ?";

    conexion.query(comandoSql);
}

module.exports = {
    todos,
    login,
    profesionales,
    registrarse,
}