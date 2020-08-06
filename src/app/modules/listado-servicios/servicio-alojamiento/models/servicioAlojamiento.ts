export class AccommodationServiceGet {
    success: boolean;
    msg: Accommodation;
}


export class Accommodation {
    id: number;
    fechaDesde: Date;
    horaDesde: Date;
    fechaHasta: Date;
    horaHasta: Date;
    checkInAnticipado: string;
    checkOutPosterior: string;
    tipoCama: string;
    observacion: string;
    incluyeComidas: number;
    cantidadComidas: number;
    incluyeExtras: string;
    hotel: string;
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
