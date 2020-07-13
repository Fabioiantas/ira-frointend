import { Role } from './role';

/*export class CredentialUser {
    id: number;
    username: string;
    dsSenha: string;
    firstName: string;
    lastName: string;
    role: Role;
    ie_administrador: string;
    token?: string;
}*/
export class CredentialUser {
    id: number;
    name: string;
    password: string;
    email: string;
    //ie_administrador: Role;
    ie_administrador: string;
    token?: string;
}
