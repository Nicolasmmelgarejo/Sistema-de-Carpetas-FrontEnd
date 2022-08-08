import { Documento } from "./documento";
import { TablaCarpetas } from "./tablacarpetas";

export class Carperta{
    id?: number;
    nombreCarpeta?: string;   
    archivos?: Array<Documento>;
    tablaCarpetas?: Array<TablaCarpetas>;
};