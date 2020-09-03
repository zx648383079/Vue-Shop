import store from './';
import { ICategory, IUser, ILogin, IAddress, IOrder, ICartGroup, ISite } from '@/api/model';

export const dispatchCategories = (): Promise<ICategory[]> => store.dispatch('getCategories');

export const dispatchSite = (): Promise<ISite> => store.dispatch('getSite');

export const dispatchAddressList = (): Promise<IAddress[]> => store.dispatch('getAddressList');

export const dispatchSetAddressList = (address: IAddress[]) => store.dispatch('setAddressList', address);

export const dispatchAddress = (): Promise<IAddress> => store.dispatch('getAddress');

export const dispatchUser = (): Promise<IUser> => store.dispatch('getUser');

export const dispatchSetUser = (user: IUser): Promise<void> => store.dispatch('setUser', user);

export const dispatchSetToken = (token: string) => store.dispatch('setToken', token);

export const dispatchLogin =
    (param: ILogin): Promise<IUser> => store.dispatch('loginUser', param);

export const dispatchLogout = (): Promise<any> => store.dispatch('logoutUser');

export const dispatchSetCart = (cart: ICartGroup[]) => store.dispatch('setCart', cart);

export const dispatchSetAddress = (address: IAddress) => store.dispatch('setAddress', address);

export const dispatchSetAddressIfEmpty = (address: IAddress) => store.dispatch('setAddressIfEmpty', address);

export const dispatchSetOrder = (order?: IOrder) => store.dispatch('setOrder', order);

export const dispatchOrder = (id: number): Promise<IOrder> => store.dispatch('getOrder', id);
