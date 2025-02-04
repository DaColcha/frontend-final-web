export interface UserResponseType {
  id:             string;
  usuario:        string;
  nombreCompleto: string;
  rol:            string;
  token:          string;
}

export interface UserRequestType {
  usuario:    string;
  contrasena: string;
}
