import { Role } from './role';

export class CredentialUser {
    id: number;
    username: string;
    dsSenha: string;
    firstName: string;
    lastName: string;
    role: Role;
    token?: string;
}
