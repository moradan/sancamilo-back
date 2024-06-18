/**
 * @typedef {'masculino' | 'femenino' | 'no definido'} Sexo 
 */

/**
 * @typedef {object} Usuario
 * @property {number} id
 * @property {string} nombreCompleto
 * @property {Sexo} sexo
 * @property {string} fechaNacimiento
 * @property {string} email
 * @property {number} prepaga
 * @property {number} especialidad
 * @property {string} password
 */
class Usuario {
  id = null;
  nombreCompleto;
  sexo;
  fechaNacimiento;
  email;
  prepaga;
  especialidad;
  password;

  /**
   * 
   * @param {string} nombreCompleto 
   * @param {Sexo} sexo 
   * @param {string} fechaNacimiento 
   * @param {string} email 
   * @param {number} prepaga 
   * @param {number | undefined} especialidad 
   * @param {string} password 
   * @returns 
   */
  constructor(nombreCompleto, sexo = 'no definido', fechaNacimiento, email, prepaga = 1, especialidad, password) {
    // TODO Validar el formato de la fecha.
    // TODO Validar el formato del email.
    // TODO Verificar el rango de prepaga: mayor que 0 y menor que el maximo indice de prepagas.

    // Validar que nombreCompleto, fechaNacimmiento, email, prepaga y password no sean cadenas vacias.
    if (nombreCompleto && fechaNacimiento && email && prepaga && password) {
      this.nombreCompleto = nombreCompleto;
      this.sexo = sexo;
      this.fechaNacimiento = fechaNacimiento;
      this.email = email;
      this.prepaga = prepaga;
      this.especialidad = especialidad;
      this.password = password;
    } else {
      return;
    }
  }
}

/**
 * @typedef {object} Especialidad
 * @property {int} id
 * @property {string} nombre
 */

/**
 * @typedef {object} Prepaga
 * @property {int} id
 * @property {string} nombre
 */

/**
 * @typedef {object} Turno
 * @property {int} id
 * @property {int} idPaciente
 * @property {int} idProfesional
 * @property {string} fecha
 * @property {string} horario
*/
class Turno {
  id = null;
  idPaciente;
  idProfesional;
  fecha;
  horario;

  /**
   * 
   * @param {int} idPaciente 
   * @param {int} idProfesional 
   * @param {date} fecha 
   * @param {string} horario 
   * @returns 
   */
  constructor(idPaciente, idProfesional, fecha, horario) {
    // TODO Validar el formato de la fecha.
    // TODO Validar el formato del email.

    // Validar que idPaciente o idProfesional no sean cadenas vacias.
    if (idPaciente && idProfesional && fecha && horario) {
      this.idPaciente = idPaciente;
      this.idProfesional = idProfesional;
      this.fecha = fecha;
      this.horario = horario;
    } else {
      return;
    }
  }
}

module.exports = {
  Usuario,
  Turno
}