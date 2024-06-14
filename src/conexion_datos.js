class Conexion {
  /**
   * @type {Array<Tipos.Usuario>}
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

  /** @type {Array<Tipos.Prepaga>} */
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

  /** @type {Array<Tipos.Especialidad>} */
  #especialidades = [
    {
      id: 1,
      nombre: "Consulta General"
    }
  ];

  /** @type {Array<Tipos.Turno>} */
  #turnos = [];

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
   * Agrega un nuevo usuario a la base de datos. 
   * @param {Tipos.Usuario} usuarioParaAgregar El objeto usuario que hay que agregar a la base de datos. Por el momento vamos a agregar
   * sin preocuparnos por la creacion o prevencion de duplicados.
   */
  agregarUsuario(usuarioParaAgregar) {
    this.#usuarios.push(usuarioParaAgregar);
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