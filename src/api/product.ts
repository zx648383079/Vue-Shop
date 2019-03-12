import {fetch} from '../utils/http'
import { IPage, IProduct, IHomeProduct, IData } from './model';

export const getList = (params: any) => fetch<IPage<IProduct>>('shop/goods', params);

export const getInfo = (id: number) => fetch<IProduct>('shop/goods', {
    id,
});

export const getHome = () => fetch<IHomeProduct>('shop/goods/home');

export const getHotKeywords = () => fetch<IData<string>>('shop/search/keywords');

export const getTips = (keywords: string) => fetch<IData<string>>('shop/search/tips', {
    keywords,
});
