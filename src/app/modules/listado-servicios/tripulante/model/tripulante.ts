export class TripulanteServiciosGet {
    success: boolean;
    datos: Tripulante;
    ubicacion: Ubicacion;
    detalles: Array<Detalles>;
}
export class Tripulante {
    nombre: string;
    documento: string;
    observacion: string;
    firmaRegistrada: boolean;
    idiomas: Array<Idioma>;
}
export class Ubicacion {
    latitud: string;
    longitud: string;
    fecha: string;
}


export class Idioma {
    texto: string;
}
export class Detalles {
    id: number;
    texto: string;
    color: number;
    observacion: string;
}

export class TripulanteServiciosPost {
    success: boolean;
    msg: string;
}
