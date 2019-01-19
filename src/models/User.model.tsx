import { all } from "q";


export interface User {
    id: string
    name: string
    surname: string
    email: string
    options?: {
        vegan?: boolean
        vegetarian?: boolean
    }
    deleted: boolean

    save(): Promise<boolean>
    delete(): Promise<boolean>
    create(): Promise<User>
}