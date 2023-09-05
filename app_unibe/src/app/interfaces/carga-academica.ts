

export interface CargaAcademica {

    id?: number,
    ciEstudiante: string,
    fecha: string,
    periodo: string,
    escuela:string,
    modalidad: string


}

export interface MateriasCarga{
    id?:number,
    idCarga?:number,
    idMateria?:number,
    materia?:string,
    totalMateria? :number
    
}
