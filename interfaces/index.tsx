export interface TableUsers{
    id : string;
    primer_nombre : string;
    segundo_nombre : string;
    apellido_paterno : string;
    apellido_materno : string;
    email: string
    estado: boolean
    role: Rol
    username: string
    id_rol : Number
    cedula_identidad : string
    fecha_nacimiento : Date
    sexo : Sexo
    telefono : string 
    imagen : string
}
export enum Sexo {
    M, 
    F 
}
export interface Rol {
    id : string
    nombreRol : string
}
export interface TableProfesionales{
    id : string
    nombre_profesional: string
    apellido_profesional: string
    cedula_profesional: string
    telefono_profesional: string
    direccion_profesional: string
    correo_profesional: string
    imagen_profesional: string
    estado_profesional: boolean
    especialidad_id : Especialidad
}

export interface TableConsultorios{
    id: string
    nombre_consultorio: string
    imagen_consultorio : string;
    descripcion_consultorio : string;
    direccion_consultorio: string
    horario_atencion_consultorio: string
    estado_consultorio: boolean
}
export interface TableEspecialidades { 
    id: string
    nombre_especialidad: string
    estado_especialidad: string
    consultorio_id : string
    consultorio : Consultorio
}

export interface Consultorio {
    id? : Number
    nombre_consultorio ?: string
    direccion_consultorio ?: string
    imagen_consultorio ?: string;
    descripcion_consultorio ?: string;
    horario_atencion_consultorio ?: string
    estado_consultorio ?: boolean
    createdAt ?: string
    updatedAt ?: string
}
export interface Especialidad {
    id:string
    nombre_especialidad:string
    estado_especialidad:boolean
    consultorio_id : string
}

export interface TableHistoriasClinicas { 
    id: string
    codigo : string;
    motivo_consulta : string;
    antecedentes_personales : string;
    antecedentes_familiares : string;
    enfermedad_actual : string;
    revision_actual_organos_sistemas : Array<TablaCPSP>;
    signos_vitales_antropometria_fecha_medicion : Date;
    signos_vitales_antropometria_temperatura : Number;
    signos_vitales_antropometria_presion_arterial : string;
    signos_vitales_antropometria_pulso : string;
    signos_vitales_antropometria_peso : Number;
    signos_vitales_antropometria_talla : Number;
    examen_fisico_regional : Array<TablaCPSP>;
    diagnostico : Array<Diagnostico>;
    planes_tratamiento : string;
    firma : string;
    usuario_historia_clinica : TableUsers
    profesional_historia_clinica : TableProfesionales
}
export interface Diagnostico {
    cie : string;
    pre : boolean;
    def : boolean;
    descripcion : string;
}
export interface TablaCPSP {
    name : string 
    value : string 
    key : string
    SP : boolean
    CP : boolean 
    descripcion ?: string 
}

export interface TableEvolucionesPrescripciones {
    id : string,
    num_hoja : string,
    historia_clinica_evolucion_prescripcion : TableHistoriasClinicas,
    usuario_evolucion_prescripcion : TableUsers,
    consultorio_evolucion_prescripcion : Consultorio
}
export interface TableDetallesEvolucionesPrescripciones {
    id : string;
    evolucion : string
    prescripciones : string
    medicamentos : string
    id_evolucion_prescripcion : string
    evolucion_prescripcion : TableEvolucionesPrescripciones
}
export interface ReservaCita {
    id:string;
    motivo_reserva:string;
    fecha_hora_inicio_reserva:Date;
    fecha_hora_fin_reserva:Date;
    estado_reserva:EstadoReserva;
}
export enum EstadoReserva {
    COMPLETADO="ACEPTADO",
    PENDIENTE="PENDIENTE",
    CANCELADO="CANCELADO"
}
export enum Roles {
    admin=1, 
    user=2
}