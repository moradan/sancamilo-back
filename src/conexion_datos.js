/**
 * @typedef {'masculino' | 'femenino'} Sexo 
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

class Conexion {
  /**
   * @type {Array<Usuario>}
   */
  #usuarios = [
    {
      id: 1,
      nombreCompleto: "rodrigo",
      sexo: "masculino",
      fechaNacimiento: "25-9-1981",
      email: "realmoradan@hotmail.com",
      prepaga: 1,
      especialidad: null,
      password: "password"
    }
  ];

  /**
   * Busca un usuario en la base de datos por nombre. 
   * @param {string} nombreParaBuscar  El nombre completo del usuario que queremos buscar en la bd.
   * @returns {Usuario | undefined} El objeto de tipo usuario que esta en la base de datos y coincide con el nombre provisto.
   * Devuelve undefined si no encuentra un registro con ese nombre.
   */
  usuarioPorNombre(nombreParaBuscar) {
    return this.#usuarios.find((usuario) => usuario.nombreCompleto === nombreParaBuscar);
  }

  /**
   * Agrega un nuevo usuario a la base de datos. 
   * @param {Usuario} usuarioParaAgregar El objeto usuario que hay que agregar a la base de datos. Por el momento vamos a agregar
   * sin preocuparnos por la creacion o prevencion de duplicados.
   */
  agregarUsuario(usuarioParaAgregar) {
    this.#usuarios.push(usuarioParaAgregar);
  }
}


module.exports = Conexion;