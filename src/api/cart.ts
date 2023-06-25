import {fetch, post} from '../utils/http';
import type { IData, ICart, IPayment, IShipping, ICartItem, IOrder, ICoupon, ICartDialog } from './model';

export const getCart = (params?: any) => fetch<ICart>('shop/cart', params)

export const addGoods = (goods: number, amount = 1, properties = []) =>
    post<ICart| ICartDialog>('shop/cart/add', {
    goods,
    amount,
    properties,
});

export const updateItem = (id: number, amount = 1) => post<ICart>('shop/cart/update', {
    id,
    amount,
});

export const deleteItem = (id: number) => post<ICart>('shop/cart/delete', {
    id,
});

export const getCouponList = (goods?: number[] | ICartItem[], type = 0) =>
    post<IData<ICoupon>>('shop/cashier/coupon', {goods, type});

export const getPaymentList = (goods?: number[], shipping?: number) =>
    post<IData<IPayment>>('shop/cashier/payment', {goods, shipping});
export const getShippingList = (goods: number[] | ICartItem[], address: number, type = 0) =>
    post<IData<IShipping>>('shop/cashier/shipping', {goods, address, type});

export const previewOrder = (goods: number[] | ICartItem[],
                             address: number, shipping = 0, payment = 0, type = 0) =>
    post<IOrder>('shop/cashier/preview', {goods, address, shipping, payment, type});

export const checkoutOrder = (goods: number[] | ICartItem[],
                              address: number, shipping: number, payment: number, type = 0) =>
    post<IOrder>('shop/cashier/checkout', {goods, address, shipping, payment, type});
