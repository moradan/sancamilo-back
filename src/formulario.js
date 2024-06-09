import url from "url";

/**
 * Formulario base para derivar los demas formularios.
 */
export class Formulario {
  /**
   * @type {url.UrlWithParsedQuery}
   */
  #pedido;

  /**
   * @param {url.UrlWithParsedQuery}
   */
  constructor(pedido) {
    this.#pedido = pedido;
  }

  /**
   * Procesar el formulario.
   * @returns {Buffer} Devuelve el contenido que el servidor debe mandar en la respuesta http.
   */
  procesar() {
    console.log("Los argumentos son:", this.#pedido.query);
    return null;
  }
}
