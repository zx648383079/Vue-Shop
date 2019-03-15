import store from './';
import { ICategory, IUser, ILogin, ISubtotal, ICart } from '@/api/model';

export const dispatchCategories = (): Promise<ICategory[]> => store.dispatch('getCategories');

export const dispatchSubtotal = (): Promise<ISubtotal> => store.dispatch('getSubtotal');

export const dispatchUser = (): Promise<IUser> => store.dispatch('getUser');

export const dispatchLogin =
    (param: ILogin): Promise<IUser> => store.dispatch('loginUser', param);

export const dispatchLogout = (): Promise<any> => store.dispatch('logoutUser');

export const dispatchSetCart = (cart: ICart[]) => store.dispatch('setCart', cart);
