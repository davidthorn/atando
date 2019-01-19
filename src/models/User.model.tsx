
export interface User {
    id: string
    name: string
    surname: string
    email: string
    options?: {
        vegan?: boolean
        vegetarian?: boolean
    }

    save(): Promise<boolean>
    delete(): Promise<boolean>
    create(): Promise<User>
}