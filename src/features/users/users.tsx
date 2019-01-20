import { User } from "../../models/User.model";
import axios from 'axios'


export class UserObject {

    static async save(user: User): Promise<boolean> {
        
        const result = await axios({
            baseURL: 'http://localhost:3000',
            url: '/user',
            method: 'PATCH',
            data: {
                id: user.id,
                name: user.name,
                surname: user.surname,
                email: user.email,
             },
            headers: {
                'Content-Type' : 'application/json'
            }
        })
        .then(res => {
            return res.status === 200
        })
        .catch((err) => {
            return false
        })

        return Promise.resolve(result)
    }

    static async delete(user: User): Promise<boolean> {
        const result = await axios({
            baseURL: 'http://localhost:3000',
            url: '/user',
            method: 'DELETE',
            data: {
                id: user.id
            },
            headers: {
                'Content-Type' : 'application/json'
            }
        })
        .then(res => {
            user.deleted = true
            return res.status === 200
        })
        .catch((err) => {
            return false
        })

        return Promise.resolve(result)
    }

    static async create(user: User): Promise<User> {
        const result = await axios({
            baseURL: 'http://localhost:3000',
            url: '/user',
            method: 'POST',
            data: {
               name: user.name,
               surname: user.surname,
               email: user.email,
            },
            headers: {
                'Content-Type' : 'application/json'
            }
        })
        .then(res => {
            if(res.status !== 201) throw new Error('Incorrect status code - 201 expected')
            return res.data 
        })
        .catch((err) => {
            return false
        })

        return Promise.resolve(result)
    }

    static async all(): Promise<User[]> {
        const result = await axios({
            baseURL: 'http://localhost:3000',
            url: '/user',
            method: 'GET',
            headers: {
                'Content-Type' : 'application/json'
            }
        })
        .then(res => {
            if(res.status !== 200) throw new Error('Incorrect status code - 201 expected')
            return res.data 
        })
        .catch((err) => {
            return []
        })

        return result
    }

}

// const users: User[] = [
//     new UserObject({
//         name: 'David',
//         surname: 'Thorn',
//         email: 'david.thorn@atino.de'
//     }),
//     new UserObject({
//         name: 'Sven',
//         surname: 'Nocker',
//         email: 'sven.nocker@atino.de'
//     })
// ];

// export { users }
