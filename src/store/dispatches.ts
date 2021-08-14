import store, { authModule } from './';
import { ICategory, IUser, ILogin, IAddress, IOrder, ICartGroup, ISite } from '@/api/model';
import { shopModule } from './';

export const dispatchCategories = (): Promise<ICategory[]> => shopModule.getCategories();

export const dispatchSite = (): Promise<ISite> => shopModule.getSite();

export const dispatchAddressList = (): Promise<IAddress[]> => shopModule.getAddressList();

export const dispatchSetAddressList = (address: IAddress[]) => shopModule.setAddressList(address);

export const dispatchAddress = (): Promise<IAddress|null> => shopModule.getAddress();

export const dispatchUser = (): Promise<IUser|null> => authModule.getUser();

export const dispatchSetUser = (user: IUser): Promise<void> => authModule.setUser(user);

export const dispatchSetToken = (token: string) => authModule.setToken(token);

export const dispatchLogin =
    (param: ILogin): Promise<IUser> => authModule.loginUser(param);

export const dispatchLogout = (): Promise<any> => authModule.logoutUser();

export const dispatchSetCart = (cart: ICartGroup[]) => shopModule.setCart(cart);

export const dispatchSetAddress = (address: IAddress) => shopModule.setAddress(address);

export const dispatchSetAddressIfEmpty = (address: IAddress) => shopModule.setAddressIfEmpty(address);

export const dispatchSetOrder = (order?: IOrder) => shopModule.setOrder(order as any);

export const dispatchOrder = (id: number): Promise<IOrder> => shopModule.getOrder(id);
