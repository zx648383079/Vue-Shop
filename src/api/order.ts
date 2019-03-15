import { IOrder, IPage, IOrderCount } from './model';
import { fetch } from '@/utils/http';


export const getOrder = (params: any) => fetch<IPage<IOrder>>('shop/order', params);

export const getOrderInfo = (id: number) => fetch<IOrder>('shop/order', {id});

export const getOrderSubtotal = () => fetch<IOrderCount>('shop/order/count');
