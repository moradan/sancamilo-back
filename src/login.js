/** 
 * @type {import("express").RequestHandler}
 */
function login(pedido, respuesta) {
    /** @type {string | undefined} */
    const nombreUsuario = pedido.query.nombreUsuario;
    /** @type {string | undefined} */
    const password = pedido.query.password;
   
    if (!nombreUsuario || !password) {
      respuesta.send("Estas usando mal la API.");
    } else if (nombreUsuario.toUpperCase() === "RODRIGO" && password==="password") {
      respuesta.send("Usuario autentificado.");
    } else {
      respuesta.send("El nombre de usuario o password no son validos.");
    }
}

module.exports = login;