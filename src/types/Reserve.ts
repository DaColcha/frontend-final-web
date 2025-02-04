export interface ReserveRequestType {
  fecha:            string;
  hora:             string;
  cantidadPersonas: number;
  observaciones:    string;
  usuarioId:        string;
}

export interface ReserveResponseType {
  fecha:            string;
  hora:             string;
  cantidadPersonas: number;
  observaciones:    string;
  estado:           string;
  usuario:          Usuario;
  mesa:             Mesa;
  id:               string;
}

export interface UserReservesType {
  fecha:            string;
  hora:             string;
  cantidadPersonas: number;
  observaciones:    string;
  estado:           string;
  mesa:             Mesa;
  id:               string;
}

export interface Mesa {
  id: number;
}

export interface Usuario {
  id:             string;
  usuario:        string;
  nombreCompleto: string;
  rol:            string;
}

export enum Estado {
    confirmada = "bg-green-500",
    solicitada = "bg-yellow-500",
    finalizada = "bg-blue-500",
    cancelada = "bg-red-500",
}
export interface DeleteResponse {
  message: string;
}