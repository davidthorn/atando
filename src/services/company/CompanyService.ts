import { BaseService } from '../BaseService';
export type ResponeType = { status: number, data?: { [key: string]: any } , errors?: { [key: string]: any } }
import  { Company } from './Company'
import { CompanyCreate, CompanyUpdate } from './CompanyCreate';

export class CompanyService extends BaseService<Company,CompanyCreate,CompanyUpdate> {
    constructor () {
       super('/companies')
    }
}
