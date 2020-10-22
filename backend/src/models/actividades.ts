export interface IActividades{
    id?:number;
    titulo: string;
    descripcion: string;
    categoria_actividad: number;
    imagen: string;
    fecha_hora: Date;
    estado:number;
}