const conexion = require('../conexiones/conexion_sql');

function todos(pedido, respuesta) {
    console.log("Consultando todos los turnos en alwaysdata...");
    const comandoSql = 'SELECT * FROM turnos';
    conexion.query(comandoSql, (error, resultado) => {
        if (error) {
            console.error(error);
            return respuesta.status(500).json({ mensaje: "No pudimos consultar la base de datos." })
        }
        console.log("Enviamos la lista de turnos.");
        return respuesta.status(200).json(resultado);
    })
}

function turnosProfesional(pedido, respuesta) {
    const idProfesional = pedido.params.id;
    if (!idProfesional) {
        return respuesta.status(400).json({ message: "el pedido no incluye todos los campos necesarios" });
    }
    const comandoSql = "SELECT * FROM turnos WHERE profesional = ? ORDER BY fecha";
    conexion.query(comandoSql, [idProfesional], (error, resultado) => {
        if (error) {
            console.log(error);
            return respuesta.status(500).json({ mensaje: "No se pudo completar la busqueda." });
        }
        console.log("Enviamos la lista de turnos del profesional.");
        return respuesta.status(200).json(resultado);
    });
}

function turnosPaciente(pedido, respuesta) {
    const idPaciente = pedido.params.id;
    console.log(idPaciente);

    if (!idPaciente) {
        return respuesta.status(400).json({ message: "el pedido no incluye todos los campos necesarios" });
    }
    const comandoSql = "SELECT * FROM turnos WHERE paciente = ? ORDER BY id DESC";
    conexion.query(comandoSql, [idPaciente], (error, resultado) => {
        console.log(comandoSql);
        if (error) {
            console.log(error);
            return respuesta.status(500).json({ mensaje: "No se pudo completar la busqueda." });
        }
        console.log("Enviamos la lista de turnos del paciente.");
        return respuesta.status(200).json(resultado);
    });
}

const nuevoTurno = (pedido, respuesta) => {
    console.log("Procesando el pedido de registrar un turno");
    const {
        paciente,
        profesional,
        fecha,
        hora
    } = pedido.body;
    const comandoSql = 'INSERT INTO turnos (paciente, profesional, fecha, hora) VALUES (?, ?, ?, ?)';
    conexion.query(comandoSql, [
        paciente,
        profesional,
        fecha,
        hora], (error, resultado) => {
            if (error) {
                console.log("No se pudo generar turno");
                console.error(error);
                return respuesta.status(500).json({ mensaje: "No pudimos borrar el registro. Intente mas tarde." });
            }
            console.log("El turno fue generado correctamente", resultado);
            return respuesta.status(201).json({
                mensaje: "El turno fue generado con exito",
                resultado: resultado
            });

        });
}

function borrarTurno(pedido, respuesta) {
    const { id } = pedido.params;
    if (!id) {
        console.log("No se especifico un turno para borrar.");
        return respuesta.status(400).json({ mensaje: "No especifico un identificador de turno para borrar." });
    }
    const comandoSql = "DELETE FROM turnos WHERE id = ?";
    conexion.query(comandoSql, [id], (error, resultado) => {
        if (error) {
            console.log("No pudimos borrar el registro.");
            console.error(error);
            return respuesta.status(500).json({ mensaje: "No pudimos borrar el registro. Intente mas tarde." });
        }
        console.log("Se borro el registro con exito");
        return respuesta.status(200).json({ mensaje: "El turno fue borrado con exito.", resultado: resultado });
    })
}

module.exports = {
    todos,
    turnosProfesional,
    turnosPaciente,
    nuevoTurno,
    borrarTurno
}