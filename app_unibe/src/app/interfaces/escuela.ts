export interface Escuela {

    id?: number,
    nombre: string,
    matriculaOrdinaria:number,
    matriculaExtraordinaria: number,
    matriculaEspecial: number,
    Inscripcion:number,
    modalidadPresencial: boolean,
    modalidadSemipresencial:boolean,
    modalidadNocturno:boolean,
    modalidadDistancia:boolean
}

export interface NombresEscuela {
    nombre: string;
  }