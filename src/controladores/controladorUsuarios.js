const conexion = require('../conexiones/conexion_sql');
const bcrypt = require('bcryptjs');

/** @type {import("express").RequestHandler} */
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

/** @type {import("express").RequestHandler} */
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
function registrarse(pedido, respuesta) {
    console.log("Procesando el pedido de registrar un usuario");

    const {
        nombre_completo,
        sexo,
        fecha_nacimiento,
        email,
        prepaga,
        especialidad,
        password } = pedido.body;

    if (!nombre_completo || !sexo || !fecha_nacimiento || !email || !prepaga || !password) {
        console.log("Alguno de los datos no fue provisto");
        console.log(nombre_completo, sexo, fecha_nacimiento, email, prepaga, password);
        respuesta.status(400).json({ mensaje: "faltan datos." });
        return;
    }
    const hashedPassword = bcrypt.hashSync(password, 10);

    const comandoSql = 'INSERT INTO usuarios ' +
        '(nombre_completo, sexo, fecha_nacimiento, email, prepaga, especialidad, password) ' +
        'VALUES (?, ?, ?, ?, ?, ?, ?)';

    conexion.query(comandoSql, [
        nombre_completo,
        sexo,
        fecha_nacimiento,
        email,
        prepaga,
        especialidad,
        hashedPassword,
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

/** @type {import("express").RequestHandler} */
function filtrarDuplicados(pedido, respuesta, proximo) {
    const comandoSql = "SELECT * FROM usuarios WHERE email = ?";
    const { email } = pedido.body;

    conexion.query(comandoSql, email, (error, resultado) => {
        if (error) {
            console.log("No se pudo consultar la base de datos");
            console.error(error);
            respuesta.status(500).send("No pudimos consultar nuestra base de datos. Intente mas tarde.");
            return;
        } else {
            console.log("Comprobando que no exista ya un usuario con este email.");
            if (resultado.length > 0) {
                console.log("Ya existe un usuario con ese email.");
                respuesta.status(409).json({ mensaje: "Ya existe un usuario con ese email." });
                return;
            } else {
                proximo();
            }
        }
    });
}

/** @type {import("express").RequestHandler} */
function borrarUsuario(pedido, respuesta) {
    const { id } = pedido.params;

    if (!id) {
        console.log("No se especifico un usuario para borrar.");
        respuesta.status(400).json({ mensaje: "No especifico un identificador de usuario para borrar." });
        return;
    } else {
        const comandoSql = "DELETE FROM usuarios WHERE id = ?";
        conexion.query(comandoSql, [id], (error, resultado) => {
            if (error) {
                console.log("No pudimos borrar el registro.");
                console.error(error);
                respuesta.status(500).json({ mensaje: "No pudimos borrar el registro. Intente mas tarde." });
            } else {
                console.log("Se borro el registro con exito");
                respuesta.status(200).json({ mensaje: "El usuario fue borrado con exito.", resultado: resultado });
            }
        })
    }
}

/** @type {import("express").RequestHandler} */
function modificarUsuario(pedido, respuesta) {
    const { id } = pedido.params;

    if (!id || !parseInt(id)) {
        console.log("No se eligio un id valido de usuario para modificar.");
        respuesta.status(400).json({ mensaje: "No se especifico un id de usuario valido para modificar." });
        return;
    }

    let comandoSql = "UPDATE usuarios SET ";
    const usuario = pedido.body;
    const valores = [];
    for (const propiedad in usuario) {
        // TODO este switch deberia refactorizarse para automatizar la generacion del query.
        switch (propiedad) {
            case "nombre_completo":
                comandoSql = comandoSql.concat("nombre_completo = ?, ");
                valores.push(usuario[propiedad]);
                break;
            case "sexo":
                comandoSql = comandoSql.concat("sexo = ?, ");
                valores.push(usuario[propiedad]);
                break;
            case "fecha_nacimiento":
                comandoSql = comandoSql.concat("fecha_nacimieento = ?, ");
                valores.push(usuario[propiedad]);
                break;
            case "prepaga":
                comandoSql = comandoSql.concat("prepaga = ?, ");
                valores.push(usuario[propiedad]);
                break;
            case "especialidad":
                comandoSql = comandoSql.concat("especialidad = ?, ");
                valores.push(usuario[propiedad]);
                break;
            case "email":
                comandoSql = comandoSql.concat("email = ?, ");
                valores.push(usuario[propiedad]);
                break;
            case "password":
                comandoSql = comandoSql.concat("password = ?, ");
                const hashedPassword = bcrypt.hashSync(usuario[propiedad], 10);
                valores.push(hashedPassword);
                break;
            default:
                break;
        }
    }
    valores.push(id);
    if (comandoSql.slice(-4) == "SET ") {
        console.log("No especifico ningun campo para actualizar.");
        respuesta.status(400).json({ mensaje: "No especifico ningun campo para actualizar." });
        return;
    }

    if (comandoSql.slice(-2) == ", ") {
        comandoSql = comandoSql.slice(0, -2).concat(" WHERE id = ?;");
    } else {
        console.log("Error inesperado. Esto no deberia ocurrir.");
        respuesta.status(500).json({ mensaje: "Hubo un error inesperado en nuestro server. Intente mas tarde." });
    }
    console.log(comandoSql);
    console.log(valores);

    conexion.query(comandoSql, valores, (error, resultados) => {
        if (error) {
            console.log("Hubo un error ejecutando la consulta.");
            console.error(error);
            respuesta.status(500).json({ mensaje: "No pudimos hacer la modificaion. Intente mas tarde." });
            return;
        } else {
            console.log("Usuario actualizado.");
            respuesta.status(200).json(resultados);
            return;
        }
    });
}

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

module.exports = {
    todos,
    profesionales,
    registrarse,
    filtrarDuplicados,
    borrarUsuario,
    modificarUsuario,
    autenticar,
}