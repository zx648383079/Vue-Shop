import {fetch, post} from '../utils/http';
import type { ISubtotal, IPage, IInvoiceTitle, IInvoiceLog, IData, IOrder } from './model';

export const getSubtotal = () => fetch<ISubtotal>('shop/invoice/subtotal');

export const getOrderList = () => fetch<IData<IOrder>>('shop/invoice');

export const getLogList = (params: any) => fetch<IPage<IInvoiceLog>>('shop/invoice/log', params);

export const getTitleList = (params: any) => fetch<IPage<IInvoiceTitle>>('shop/invoice/title', params);

export const getTitle = (id: number) => fetch<IInvoiceTitle>('shop/invoice/title', {id});

export const saveTitle = (params: any) => post<IInvoiceTitle>('shop/invoice/save_title', params);
