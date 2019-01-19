import { User } from "../../models/User.model";

class UserObject implements User {

    id: string
    name: string
    email: string
    surname: string

    constructor(data: { name: string , surname: string , email: string }) {
        this.id = ''
        this.name = data.name
        this.surname = data.surname
        this.email = data.email
    }

    save(): Promise<boolean> {
        return Promise.resolve(true)
    }

    delete(): Promise<boolean> {
        return Promise.resolve(true)
    }

    create(): Promise<User> {
        return Promise.resolve(this)
    }


}

const users: User[] = [
    new UserObject({
        name: 'David',
        surname: 'Thorn',
        email: 'david.thorn@atino.de'
    }),
    new UserObject({
        name: 'Sven',
        surname: 'Nocker',
        email: 'sven.nocker@atino.de'
    })
];

export { users }
