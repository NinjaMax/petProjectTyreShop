export type SupplierCreate = {
    id_supplier: number;
    name: string;
    city: string;
    city_ua?: string;
    phone: number;
    email: string;
    delivery?: string[];
    delivery_city_ref?: string[];
    delivery_dep?: string[];
    delivery_dep_ref?: string[];
    address?: string;
};