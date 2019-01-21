import { BaseService } from '../BaseService';
import { AuthUser } from './AuthUser';
export type ResponeType = { status: number, data?: { [key: string]: any }, errors?: { [key: string]: any } }

export interface AuthUserCreate {
    email: string
    password: string
}

export class LoginService extends BaseService<AuthUser, AuthUserCreate, AuthUserCreate> {
    constructor() {
        super('/login')
    }
}
