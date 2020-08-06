export class Bitacoras {
    success: boolean;
    bitacoras: Array<Bitacora>;
}
export class Bitacora {
    id: number;
    nombre: string;
    mensajes: Array<Mensaje>;
    mensajesTotal: number;
    noLeidos: number;
}
export class Mensaje {
    mensaje: string;
    persona: string;
    fechaHora: string;
    receptores: [
        {
            personas: string;
            fechaHora: string;
        },
        {
            personas: string;
            fechaHora: string;
        }
    ];
}

export class CheckRead {
    success: boolean;
}

export class Enviar {
    mensaje: string;
    empleadoId: number;
    servicioId: number;
    bitacoraId: number;
}
