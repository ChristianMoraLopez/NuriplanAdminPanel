export interface Usuario {
    usuarioId: number;
    nombre: string;
    email: string;
    contrasena: string;
    aceptaTerminos: boolean;
    rol: 'admin' | 'usuario';
    fechaRegistro: string;
    ciudad: string;
    localidad: string;
}

