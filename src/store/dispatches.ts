import store from './';
import { ICategory, IUser, ILogin } from '@/api/model';

export const dispatchCategories = (): Promise<ICategory[]> => store.dispatch('getCategories');

export const dispatchUser = (): Promise<IUser> => store.dispatch('getUser');

export const dispatchLogin =
    (param: ILogin): Promise<IUser> => store.dispatch('loginUser', param);

export const dispatchLogout = (): Promise<any> => store.dispatch('logoutUser');
