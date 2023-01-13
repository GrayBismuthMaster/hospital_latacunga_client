export interface TableUsers{
    id : string;​
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
    id : string;​
    nombre_profesional: string
    apellido_profesional: string
    cedula_profesional: string
    telefono_profesional: string
    direccion_profesional: string
    correo_profesional: string
    imagen_profesional: string
    estado_profesional: boolean
    especialidad : Especialidad
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
    id : Number
    nombre_consultorio : string
    direccion_consultorio : string
    imagen_consultorio : string;
    descripcion_consultorio : string;
    horario_atencion_consultorio : string
    estado_consultorio : boolean
    createdAt : string
    updatedAt : string
}
export interface Especialidad {
    id:string
    nombre_especialidad:string
    estado_especialidad:boolean
}

export interface TableHistoriasClinicas { 
    id: string
    primer_nombre : string;
    segundo_nombre : string;
    apellido_paterno : string;
    apellido_materno : string;
    cedula_identidad : string;
    fecha_nacimiento : Date;
    codigo : string;
    motivo_consulta : string;
    antecedentes_personales : string;
    antecedentes_familiares : string;
    enfermedad_actual : string;
    revision_actual_organos_sistemas : string;
    revision_actual_organos_sistemas_sentidos : string;
    revision_actual_organos_sistemas_respiratorio : string;
    revision_actual_organos_sistemas_cardiovascular : string;
    revision_actual_organos_sistemas_digestivo : string;
    revision_actual_organos_sistemas_dental : string;
    revision_actual_organos_sistemas_urinario : string;
    revision_actual_organos_sistemas_musculo_esqueletico : string;
    revision_actual_organos_sistemas_endocrinico : string;
    revision_actual_organos_sistemas_hemo_linfaticos : string;
    revision_actual_organos_sistemas_nervioso : string;
    signos_vitales_antropometria_fecha_medicion : Date;
    signos_vitales_antropometria_temperatura : Number;
    signos_vitales_antropometria_presion_arterial : string;
    signos_vitales_antropometria_pulso : string;
    signos_vitales_antropometria_peso : Number;
    signos_vitales_antropometria_talla : Number;
    examen_fisico_regional_cabeza : string;
    examen_fisico_regional_cuello : string;
    examen_fisico_regional_torax : string;
    examen_fisico_regional_abdomen : string;
    examen_fisico_regional_pelvis : string;
    examen_fisico_regional_extremidades : string;
    diagnostico : Array<Diagnostico>;
    planes_tratamiento : string;
    firma : string;
}
export interface Diagnostico {
    cie10 : string;
    presuntivo : boolean;
    definitivo : boolean;
}
