const jwt = require("jsonwebtoken");

/** @type {import("express").RequestHandler} */
function autenticar(pedido, respuesta, proximo) {
		console.log("Intengando autenticacion");
    const encabezadoAutorizacion = pedido.headers["authorization"];
    if (!encabezadoAutorizacion) {
        console.log("Se intento acceder a contenido protegido sin proveer un token.");
        respuesta.status(401).json({ autenticado: false, mensaje: "Este pedido requiere un token y no enviaste un token. Hace un pedido GET a usuarios/login con un email y password en JSON para obtener tu token." });
        return;
    }

    const [tipoAutenticacion, token] = encabezadoAutorizacion.split(" ");
    if (tipoAutenticacion === "Bearer") {
        try {
            const contenido = jwt.verify(token, process.env.CLAVE_SECRETA);
            console.log(`Usuario autentificado id: ${contenido.id}`);
						/** @type {string} */
						pedido.usuario = contenido.id;
            proximo();
        } catch (error) {
						console.log("El token no es valido");
            console.error(error);
						respuesta.status(401).json({mensaje:"El token provisto no es valido."});
						return;
        }
    } else {
        console.log("Se intento acceder a un recurso protegido con un tipo de autenticacion que no soportamos o sin proveer una clave.");
        respuesta.status(501).json({ mensaje: "Esta intentando acceder a contenido protegido con autenticacion que no soportamos o sin proveer una clave." });
        return;
    }
}

module.exports = autenticar;
