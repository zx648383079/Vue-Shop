import {fetch, post} from '../utils/http';
import {IUser} from './model';

export const getProfile = () => fetch<IUser>('auth/user');

export const login = (email: string, password: string) => post<IUser>('auth/login', {
    email,
    password,
});

export const register = (email: string, password: string) => post<IUser>('auth/register', {
    email,
    password,
});
