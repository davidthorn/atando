import axios from 'axios';
export type ResponeType = { status: number, data?: { [key: string]: any }, errors?: { [key: string]: any } }

export class BaseService<T, Create, Update> {

    host: string

    port: string

    path: string

    token?: string = localStorage.getItem('idToken') || undefined

    constructor(path: string) {
        this.path = path
        this.host = 'localhost'
        this.port = '3000'
    }

    async request(type: 'ITEM' | 'GET' | 'POST' | 'PATCH' | 'DELETE', id?: string, data?: any): Promise<ResponeType> {

        let resourcePath = this.path

        if (['DELETE', 'PATCH', 'ITEM'].includes(type)) {
            resourcePath += `/${id}`
        }


        let headers: { [key: string]: string } = {
            'Content-Type': 'application/json'
        }

        if (this.token !== undefined) {
            headers['Authorization'] = `Bearer ${this.token}`
        }

        const result = await axios({
            baseURL: `http://${this.host}:${this.port}`,
            url: resourcePath,
            method: type,
            data,
            headers: headers
        })
            .then(res => {
                return {
                    status: res.status,
                    data: res.data
                }
            })
            .catch((err) => {

                if (err.response.status === 401) {
                    localStorage.removeItem('idToken')
                }

                return Promise.reject({
                    status: err.status,
                    errors: err.response.data
                })
            })

        return Promise.resolve(result)
    }

    async create(body: Create): Promise<ResponeType> {
        return this.request('POST', undefined, body)
    }

    async all<T>(): Promise<T[]> {
        return this.request('GET').then(data => data.data as T[])
    }

    async get(id: string): Promise<ResponeType> {
        return this.request('ITEM', id)
    }

    async update<Update>(id: string, data: Update): Promise<ResponeType> {
        return this.request('PATCH', id, data)
    }

    async delete(id: string): Promise<ResponeType> {
        return this.request('DELETE', id)
    }

}
