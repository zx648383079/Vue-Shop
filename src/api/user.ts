import {fetch, post, deleleRequest} from '../utils/http';
import {IUser, ILogin, IPage, IAccountLog, ICollect, IData, IConnect} from './model';

export const getProfile = () => fetch<IUser>('auth/user');

export const getAccountLog = (params: any) => fetch<IPage<IAccountLog>>('shop/account/log', params);

export const getConnect = () => fetch<IData<IConnect>>('shop/account/connect');

export const getCollect = (params: any) => fetch<IPage<ICollect>>('shop/collect', params);

export const toggleCollect = (id: number) => post<IData<boolean>>('shop/collect/toggle', {id});

export const removeCollect = (id: number) => deleleRequest<IData<boolean>>('shop/collect/delete?id=' + id);

export const login = (param: ILogin) => post<IUser>('auth/login', param);

export const logout = () => fetch('auth/logout');

export const register = (email: string, password: string) => post<IUser>('auth/register', {
    email,
    password,
});