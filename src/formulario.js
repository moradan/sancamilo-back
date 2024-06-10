import url from "url";
import login from "./login.js";
import registrarse from "./registrarse.js";
import turnos from "./turnos.js";

/**
 * Formulario base para derivar los demas formularios.
 */
export default class Formulario {
  /**
   * @type {url.UrlWithParsedQuery}
   */
  #pedido;

  /**
   * @type {Function} Una funcion que se usará para procesar el formulario. Se debe elegir desde una lista de procesadores
   * contenidos en modulos JS. A saber: login.js, registrarse.js, turnos.js.
   */
  #procesador;

  /**
   * Este mapa de procesadores almacena todos los procesadores que tenemos junto con el nombre del archivo html
   * cuyo contenido maneja este procesador. De este modo, podemos usar el nombre del end point que esta contenido en
   * el pedido http para definir cual procesador se va a usar para procesar la peticion.
   * @type {Map<string, Function>}
   */
  #procesadores = new Map();

  /**
   * @param {url.UrlWithParsedQuery} pedido Este objeto organiza los distintos datos que contiene un url en propiedades.
   */
  constructor(pedido) {
    this.#pedido = pedido;
    this.#procesadores.set("/src/inicioapp.html", login);
    this.#procesador = this.#procesadores.get(this.#pedido.pathname);
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
