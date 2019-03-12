import {fetch, post} from '../utils/http';
import { IData, ICart } from './model';

export const getCart = (params: any) => fetch<IData<ICart>>('shop/cart', params)

export const addGoods = (goods: number, amount: number = 1, properties = []) => post<IData<ICart>>('shop/cart/add', {
    goods,
    amount,
    properties,
});

export const updateItem = (id: number, amount: number = 1) => post<IData<ICart>>('shop/cart/update', {
    id,
    amount,
});

export const deleteItem = (id: number) => post<IData<ICart>>('shop/cart/delete', {
    id,
});
