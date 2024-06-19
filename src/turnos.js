const Conexion = require('./conexion_datos');
const { Turno } = require('./tipos_datos');
/** @type {import("./conexion_datos").Conexion} */
const conexion = new Conexion;

/**
 * Este modulo atiende los pedidos de la API para agregar un turno. Debe comprobar que no exista un turno en el mismo horario
 * luego devolver un json con un mensaje de confirmacion y estado 201 Created. De ser un turno duplicado debe contestar con 409 Resource Conflict.
 * @type {import("express").RequestHandler}
 */
function nuevoTurno(pedido, respuesta) {
    /** @type {string | undefined} */
    const idPaciente = pedido.query.idPaciente;
    const idProfesional = pedido.query.idProfesional;
    const fecha = pedido.query.fecha;
    const horario = pedido.query.horario;


    if (!fecha || !horario || !idPaciente || !idProfesional) {
        respuesta.status(400).json({ message: "el pedido tiene datos faltantes" })
        return;
    }

    if (conexion.buscarTurno(fecha, horario)) {
        respuesta.status(409).json({ message: "Ya existe un turno en ese horario" });
        return;
    }

    /** @type {Turno | undefined} */
    const turnoParaAgregar = new Turno(
        pedido.query.idPaciente,
        pedido.query.idProfesional,
        pedido.query.fecha,
        pedido.query.horario,
    );

    // Almacenar el turno utilizando la conexion a base de datos simulada.
    conexion.agregarTurno(turnoParaAgregar);

    respuesta.status(201).json({
        message: "El siguiente turno fue agregado con exito.",
        turnoParaAgregar: turnoParaAgregar
    })
}

module.exports = nuevoTurno;