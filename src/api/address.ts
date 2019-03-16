import { IAddress, IData } from './model';
import { fetch, post } from '@/utils/http';


export const getAddressList = () => fetch<IData<IAddress>>('shop/address');

export const getAddress = (id: number) => fetch<IAddress>('shop/address', {id});

export const createAddress = (param: any) => post<IAddress>('shop/address/create', param);

export const updateAddress = (param: any) => post<IAddress>('shop/address/update', param);

export const deleteAddress = (id: number) => deleteAddress<boolean>('shop/address/delete', {id});


