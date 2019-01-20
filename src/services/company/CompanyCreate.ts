export interface CompanyCreate {
    name: string;
    address: string;
    phone: string;
}
export interface CompanyUpdate {
    name?: string;
    address?: string;
    phone?: string;
}
