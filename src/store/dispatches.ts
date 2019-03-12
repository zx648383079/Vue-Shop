import store from './';
import { ICategory, IUser } from '@/api/model';

export const dispatchCategories = (): Promise<ICategory[]> => store.dispatch('getCategories');

export const dispatchUser = (): Promise<IUser> => store.dispatch('getUser');
