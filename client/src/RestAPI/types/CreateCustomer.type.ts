export type CustomerCreate = {
    id_customer: number;
    name: string;
    phone: number;
    password: string;
    email: string;
    delivery?: string;
    delivery_city_ref?: string;
    delivery_dep?: string;
    delivery_dep_ref?: string;
    address?: string;
};
