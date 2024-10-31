import axios, { AxiosInstance } from "axios";
import { HttpAdapter } from "./http.adapter";

type Options = {
    baseUrl: string;
    params: Record<string, string>;
}


export class AxiosAdapter implements HttpAdapter{

    private axiosInstance: AxiosInstance;

    constructor(options: Options){
        this.axiosInstance = axios.create({
            baseURL: options.baseUrl,
            params: options.params,
        })
    }

    async get<T>(url: string, options?: Record<string, unknown>): Promise<T> {
        try {
            const {data} = await this.axiosInstance.post(url, options);
            return data;
        } catch (error) {
            throw new Error(`Error fetching url: ${url}`);
        }
    };

}