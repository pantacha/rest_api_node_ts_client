

export type ProductType = {
    [k: string]: FormDataEntryValue;
}

export type Product = {
    id: number,
    name: string,
    price: number,
    availability: boolean,
}