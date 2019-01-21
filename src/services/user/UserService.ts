import { BaseService } from '../BaseService';
import { User } from './User';
export type ResponeType = { status: number, data?: { [key: string]: any }, errors?: { [key: string]: any } }

export interface UserCreate {
    name: string
    surname: string
    email: string
}

export interface UserUpdate {
    name?: string
    surname?: string
}

export class UserService extends BaseService<User, UserCreate, UserUpdate> {

    constructor() {
        super('/user')
    }
}
