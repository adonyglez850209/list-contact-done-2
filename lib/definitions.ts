import { Icon } from "next/dist/lib/metadata/types/metadata-types";

export type TypeLista = {
    id: string;
    nombrelista: string;
};

export type TypeContacto = {
    id: string;
    listaId: string;
    avatarurl: string;
    nombrecontacto: string;
    correo: string;  
    sexo: string;
    edad: number;
    cuota: number;
    // In TypeScript, this is called a string union type.
    // It means that the "status" property can only be one of the two strings: 'pending' or 'paid'.
    status: string;
    fecha: Date;  
};

export type TypeReporteEstadoCuotaGroupByTipo = {
    id: string;
    nombrelista: string;
    cantidad: number;
    total_pending: string;
    total_paid: string;
    total: string;    
};

export type TypeReporteEstadoCuotaGroupByGenero = {
    sexo: string;
    cantidad: number;
    total_pending: string;
    total_paid: string;
    total: string;    
};

export type TypeReporteEstadoCuotav0 = {
    total_pending: number;
    total_paid: number;
    total: number;    
};

export interface INavLink {
    key: string;
    value: string;
}

export interface MenuItem {
    title: string;
    route?: string;
    icono: any;
    children?: MenuItem[];
}