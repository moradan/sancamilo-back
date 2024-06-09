/**
 * Formulario base para derivar los demas formularios.
 */
export class Formulario {
  /**
   * @param {string} metodo - The method of the form.
   */
  constructor(metodo) {
    /**
     * @type {string}
     */
    this.metodo = metodo;
  }

  /**
   * Procesar el formulario.
   * @returns {Buffer} Devuelve el contenido que el servidor debe mandar en la respuesta http.
   */
  procesar() {
    const contenido = "Recibimos el formulario";
    return Buffer.from(data);
  }
}
