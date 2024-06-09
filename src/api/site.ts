import type { ISite } from './model';
import { fetch, post } from '../utils/http';
import axios, {type AxiosRequestConfig } from 'axios';


export const getSiteInfo = () => fetch<ISite>('shop/home/index');


export function batch<T extends Record<string, any>>(data: Record<keyof T, any>, options?: AxiosRequestConfig<any>) {
    return axios.post('open/batch', data, options)
    .then(res => {
        return res.data;
    });
}

export function shopBatch<T extends Record<string, any>>(data: Record<keyof T, any>) {
    return post<T>('shop/batch', data);
}