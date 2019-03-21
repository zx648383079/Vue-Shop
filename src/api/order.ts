import { IOrder, IPage, IOrderCount, IOrderGoods, IData, IDataOne } from './model';
import { fetch, post } from '@/utils/http';


export const getOrder = (params: any) => fetch<IPage<IOrder>>('shop/order', params);

export const getOrderInfo = (id: number) => fetch<IOrder>('shop/order', {id});

export const getOrderSubtotal = () => fetch<IOrderCount>('shop/order/count');

export const receiveOrder = (id: number) => post<IOrder>('shop/order/receive', {id});

export const cancelOrder = (id: number) => post<IOrder>('shop/order/cancel', {id});

export const getCommentGoods = (params: any) => fetch<IPage<IOrderGoods>>('shop/order/comment', params);

export const getUnCommentGoods = (params: any) => fetch<IData<IOrderGoods>>('shop/order/comment_goods', params);

export const commentGoods = (params: any) => post<IDataOne<boolean>>('shop/order/comment_save', params);
