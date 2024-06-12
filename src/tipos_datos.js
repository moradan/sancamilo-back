/**
 * @typedef {'masculino' | 'femenino' | 'no definido'} Sexo 
 */

/**
 * @typedef {object} Usuario
 * @property {int} id
 * @property {string} nombreCompleto
 * @property {Sexo} sexo
 * @property {string} fechaNacimiento
 * @property {string} email
 * @property {int} prepaga
 * @property {int} especialidad
 * @property {string} password
 */
class Usuario {
    id = null;
    nombreCompleto = "";
    sexo = "no definido";
    fechaNacimiento = "";
    email = "";
    prepaga = 1;
    especialidad = null;
    password = "";
    //TODO falta implementar un constructor
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
    //TODO falta implementar la clase Turno
}

module.exports = {
    Usuario,
    Turno
}