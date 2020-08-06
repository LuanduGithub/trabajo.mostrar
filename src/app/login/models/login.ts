export class LoginPost {
    username: string;
    password: string;
    dispositivo: string;
    latitud: number;
    longitud: number;
}
export class LoginPostResp {
    success: boolean;
    empleadoId: string;
    nombre: string;
    verificado: boolean;
    msg: string;
}
