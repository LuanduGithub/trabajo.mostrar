export class ComidasServiceGet {
    success: boolean;
    msg: Comida;
}
export class Comida {
    id: number;
    fecha: Date;
    hora: Date;
    comida: string;
    tipoComida: string;
    tipoContrato: string;
    observaciones: string;
    lugar: string;
    estado: string;
    cantidadTripulantes: number;
    bitacoraNuevo: string;
    tripulantes: Array<Tripulantes>;
}

export class Tripulantes {
    id: number;
    nombre: string;
    documento: string;
}
