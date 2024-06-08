/* La clase Formulario contendra el comportamiento comun a todos los formularios. Cada clase de formulario debe implementar unicamente aquellas
cosas en las que se diferencia de todos los demas */
export class Formulario {}

/**
 * @description Contiene todos los datos provenientes de un pedido de log in del front end.
 */
export class FormularioLogin extends Formulario {
  /**
   *
   * @param {string} nombreUsuario
   * @param {string} contrasenia
   */
  constructor(nombreUsuario, contrasenia) {
    this.nombreUsuario = nombreUsuario;
    this.contrasenia = contrasenia;
  }
}

export class FormularioRegistrarse extends Formulario {}
export class FormularioTurno extends Formulario {}
