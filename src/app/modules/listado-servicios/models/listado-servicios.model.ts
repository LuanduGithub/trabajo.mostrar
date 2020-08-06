export class ListadoServiciosGet {
    success: boolean;
    msg: string;
    servicios: Array<Servicios>;
}

export class Servicios {
    id: string;
    tipo: {
        nombre: string;
        id: number;
    };
    fecha: string;
    hora: string;
    cantidadTripulantes: number;
    bitacoraNuevo: boolean;
    traslados: {
        origen: string;
        destino: string;
    };
    alojamientos: {
        hotel: string;
    };
    comidas: {
        lugar: string;
    };
}
