/**
 * @typedef {import("./tipos_datos").Usuario} Usuario
 * @typedef {import("./tipos_datos").Prepaga} Prepaga
 * @typedef {import("./tipos_datos").Especialidad} Especialidad
 * @typedef {import("./tipos_datos").Turno} Turno
 */

class Conexion {
  #autoIncUsuario = 2;

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
    },
    {
      id: 2,
      nombreCompleto: "Dr. Sanchez",
      sexo: "masculino",
      fechaNacimiento: "13-11-1975",
      email: "drsanchez@sancamilo.com",
      prepaga: 1,
      especialidad: 1,
      password: "doctor"
    }
  ];

  /** @type {Array<Prepaga>} */
  #prepagas = [
    {
      id: 1,
      nombre: "No",
    },
    {
      id: 2,
      nombre: "OSDE"
    },
    {
      id: 3,
      nombre: "Medicus"
    },
    {
      id: 4,
      nombre: "Omit"
    },
    {
      id: 5,
      nombre: "Otro"
    }
  ];

  /** @type {Array<Especialidad>} */
  #especialidades = [
    {
      id: 1,
      nombre: "Consulta General"
    }
  ];

  /** @type {Array<Turno>} */
  #turnos = [];

  /**
   * 
   * @param {string} email 
   * @returns {boolean} Devuelve true si exite un usuario con el email provisto. De otro modo, false. 
   */
  usuarioExiste(email) {
    const usuarioBuscado = this.usuarioPorEmail(email);
    return usuarioBuscado;
  }

  /**
   * Busca un usuario en la base de datos por nombre. 
   * @param {string} nombreParaBuscar  El nombre completo del usuario que queremos buscar en la bd.
   * @returns {Tipos.Usuario | undefined} El objeto de tipo usuario que esta en la base de datos y coincide con el nombre provisto.
   * Devuelve undefined si no encuentra un registro con ese nombre.
   */
  usuarioPorNombre(nombreParaBuscar) {
    return this.#usuarios.find((usuario) => usuario.nombreCompleto === nombreParaBuscar);
  }

  /**
   * Busca un usuario en la base de datos por nombre. 
   * @param {string} nombreParaBuscar  El nombre completo del usuario que queremos buscar en la bd.
   * @returns {Tipos.Usuario | undefined} El objeto de tipo usuario que esta en la base de datos y coincide con el nombre provisto.
   * Devuelve undefined si no encuentra un registro con ese nombre.
   */
  usuarioPorEmail(emailParabuscar) {
    return this.#usuarios.find((usuario) => usuario.email === emailParabuscar);
  }

  /**
   * Agrega un nuevo usuario a la base de datos. 
   * @param {Tipos.Usuario} usuarioParaAgregar El objeto usuario que hay que agregar a la base de datos. Por el momento vamos a agregar
   * sin preocuparnos por la creacion o prevencion de duplicados.
   */
  agregarUsuario(usuarioParaAgregar) {
    this.#autoIncUsuario++;
    usuarioParaAgregar.id = this.#autoIncUsuario;
    this.#usuarios.push(usuarioParaAgregar);
  }

  profesionalesTodos() {
    return this.#usuarios.filter((usuario) => usuario.especialidad)
  }

  /**
   * 
   * @returns {Array<Tipos.Turno>} Devuelve un array que contiene todos los turnos de la bs.
   */
  todosLosTurnos() {
    return this.#turnos;
  }

  /**
   * 
   *  Busca turnos en una fecha y horario determinado
   *  @param {Tipos.Turno} horario El horario por el que se desean buscar turnos.
   *  @param {Tipos.Turno} fecha La fecha por el que se desean buscar turnos.

   *  @returns {Tipos.turno}
   */
  buscarTurno(fecha, horario){
    return this.#turnos.find((turno) => (turno.fecha === fecha && turno.horario === horario) );
  }

  /**
   * 
   * @param {Tipos.Turno} turnoParaAgregar El objeto de tipo Turno que debemos agregar.
   */
  agregarTurno(turnoParaAgregar) {
    this.#turnos.push(turnoParaAgregar);
  }

  /**
   * @returns Devuelve la lista de todas las prepagas cargadas. 
   */
  prepagasTodas() {
    return this.#prepagas;
  }

  /**
   * 
   * @returns Devuelve la lista de todas las especialidades cargadas.
   */
  especialidadesTodas() {
    return this.#especialidades;
  }
}

module.exports = Conexion;