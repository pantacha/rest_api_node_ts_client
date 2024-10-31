import { number, object, string, InferInput, safeParse, InferOutput, boolean, array } from "valibot"
import { ProductType } from "../types"
import axios from "axios";

// VALIBOT - SCHEMA before charge data to the BD
export const ProductDataSchema = object({
    name: string(),
    price: number(),
});

// Type derved from ProductDataSchema Schema
type ProductData = InferInput<typeof ProductDataSchema>;

// VALIBOT - SCHEMA get data from the BD
export const getProductDataSchema = object({
    id: number(),
    name: string(),
    price: number(),
    availability: boolean(),
});

// Type derved from Schema from ProductData Schema
export type getProductData = InferOutput<typeof getProductDataSchema>;

export const getProductsDataSchema = array(getProductDataSchema);

export type getProductsData = InferOutput<typeof getProductsDataSchema>;

export const addProduct = async (data: ProductType) => {
    try {
        const result = safeParse(ProductDataSchema, {
            name: data.name,
            price: typeof data.price==='string' ? parseFloat(data.price) : data.price
        });
        console.log(result);
        if(result.success){
            console.log('Parsed data: ', result);
            const apiUrl = `${import.meta.env.VITE_API_URL}/api/products/`
            await axios.post(apiUrl, result.output);
            // return data;
        }
    } catch (error) {
        console.log(error)
    }
}

export const getProducts = async () => {
    try {
            const apiUrl = `${import.meta.env.VITE_API_URL}/api/products/`
            const {data} = await axios.get(apiUrl).then((response) => response.data); // to get basically one 'data' instead of two in the response
            console.log({data});
            const result = safeParse(getProductsDataSchema, data);
            console.log(result);
            if (result.success) {
                return result.output;
            } else {
                throw new Error;
            }
    } catch (error) {
        console.log(error)
    }
}

export const getProductById = async (id: getProductData['id']) => {
    try {
            const apiUrl = `${import.meta.env.VITE_API_URL}/api/products/${id}`
            const {data} = await axios.get(apiUrl).then((response) => response.data); // to get basically one 'data' instead of two in the response
            console.log({data});
            const result = safeParse(getProductDataSchema, data);
            console.log(result);
            if (result.success) {
                return result.output;
            } else {
                throw new Error;
            }
    } catch (error) {
        console.log(error)
    }
}

export const updateProduct = async (data: ProductType, id: getProductData['id']) => {
    try {
            const result = safeParse(getProductDataSchema, { // Validación de la data que se envía al server
                id,
                name: data.name,
                price: Number(data.price),
                availability: Boolean(data.availability),
            });
            console.log(result);
            if (result.success) {
                const apiUrl = `${import.meta.env.VITE_API_URL}/api/products/${id}`;
                await axios.put(apiUrl, result.output);
            } else {
                throw new Error;
            }
    } catch (error) {
        console.log(error)
    }
}

export const deleteProduct = async (id: getProductData['id']) => {
    try {
        const apiUrl = `${import.meta.env.VITE_API_URL}/api/products/${id}`;
        await axios.delete(apiUrl);
    } catch (error) {
        console.log(error)
    }
}

export const updateProductAvailability = async (id: getProductData['id']) => {
    try {
        const apiUrl = `${import.meta.env.VITE_API_URL}/api/products/${id}`;
        await axios.put(apiUrl);
    } catch (error) {
        console.log(error)
    }
}