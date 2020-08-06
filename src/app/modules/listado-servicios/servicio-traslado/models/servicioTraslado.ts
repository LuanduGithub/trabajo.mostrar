export class TransferServiciosGet {
    success: boolean;
    servicios: Transfer;
    msg: Transfer;
}

export class Transfer {
    id: number;
    fecha: Date;
    hora: Date;
    origen: string;
    destino: string;
    tiempoEstimado: number;
    observacion: string;
    tipoTraslado: string;
    chofer: string;
    asistente: string;
    vehiculo: string;
    equipaje: string;
    cantidadTripulantes: number;
    tripulantes: Array<Tripulnates>;
    bitacoraNuevo: boolean;
    recorrido: string;
    numeroVuelo: string;
}
export class Tripulnates {
    id: number;
    nombre: string;
    documento: string;

}
