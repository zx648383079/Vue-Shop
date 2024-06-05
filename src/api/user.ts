import {fetch, post, deleteRequest, put, uploadFile} from '../utils/http';
import type {IUser, ILogin, IPage, IAccountLog, ICollect, IData, IConnect, IDataOne, ICard, ISubtotal, IRegister, ICaptcha} from './model';

export const getProfile = () => fetch<IUser>('auth/user');

export const getAccountLog = (params: any) => fetch<IPage<IAccountLog>>('shop/account/log', params);

export const getBankCardList = (params: any) => fetch<IPage<ICard>>('shop/account/card', params);

export const getConnect = () => fetch<IData<IConnect>>('shop/account/connect');

export const getAccountSubtotal = () => fetch<ISubtotal>('shop/account/subtotal');

export const getCollect = (params: any) => fetch<IPage<ICollect>>('shop/collect', params);

export const toggleCollect = (id: number) => post<IDataOne<boolean>>('shop/collect/toggle', {id});

export const removeCollect = (id: number) => deleteRequest<IDataOne<boolean>>('shop/collect/delete?id=' + id);

export const login = (param: ILogin) => post<IUser>('auth/login', param);

export const logout = () => fetch('auth/logout');

export const register = (param: IRegister) => post<IUser>('auth/register', param);

export const sendFindEmail = (email: string) => post<IDataOne<boolean>>('auth/password/send_find_email', {
    email,
});

export const sendMobileCode = (mobile: string, type = 'login') => post<IDataOne<boolean>>('auth/password/send_mobile_code', {
    mobile,
    type,
});

export const resetPassword = (email: string, code: string,  password: string, confirmPassword: string) =>
    post<IDataOne<boolean>>('auth/password/reset', {
    email,
    code,
    password,
    confirm_password: confirmPassword,
});

export const updatePassword = (oldPassword: string, password: string, confirmPassword: string) =>
    post<IDataOne<boolean>>('auth/password/update', {
    old_password: oldPassword,
    password,
    confirm_password: confirmPassword,
});

export const updateProfile = (param: any) => put<IUser>('auth/user/update', param);


export const uploadAvatar = (img: File) => uploadFile<IUser>('auth/user/avatar', img);

export const getCaptcha = (token: string) => fetch<ICaptcha>('auth/captcha', {
    captcha_token: token,
    type: 'hint',
});
