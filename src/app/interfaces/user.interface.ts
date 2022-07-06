export interface User {
    _id:          string;
    nombre:       string;
    apellido:     string;
    localidad:    string;
    provincia:    string;
    email:        string;
    role:         string;
    telefono:     number;
    createdAt:    Date;
    updatedAt:    Date;
    resetToken:   string;
    reparaciones: string[];
    deviceId:     string;
}