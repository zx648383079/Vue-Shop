import {fetch, post} from '../utils/http';
import { IData, ICart, IPayment, IShipping, ICartItem } from './model';

export const getCart = (params?: any) => fetch<IData<ICart>>('shop/cart', params)

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

export const getPaymentList = (goods?: number[], shipping?: number) =>
    fetch<IData<IPayment>>('shop/cashier/payment', {goods, shipping});
export const getShippingList = (goods: ICartItem[], address: number) =>
    fetch<IData<IShipping>>('shop/cashier/shipping', {goods, address});

