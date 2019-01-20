export interface CompanyCreate {
    name: string;
    address: string;
    street: string;
    phone: string;
}
export interface CompanyUpdate {
    name?: string;
    address?: string;
    street?: string;
    phone?: string;
}
