/** @type {import("express").RequestHandler} */
function esAdmin(pedido, respuesta, proximo) {
	console.log("Accediendo a una API de admin");
	const ADMIN = [3, 5];
	if(pedido.usuario && ADMIN.includes(parseInt(pedido.usuario, 10))) {
		console.log("El usuario es un admin");
		proximo();
	} else {
		console.log("El usuario no es admin. Acceso denegado.");
		respuesta.status(403).json({mensaje:"Esta intentando usar una api reservada para admin sin tener derechos de admin. Inicie sesion como admin y vuelva a intentar. O no intente mas."});
	}
}

module.exports = esAdmin;
