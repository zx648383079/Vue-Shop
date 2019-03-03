import {fetch, post} from '../utils/http'

export const getProfile = () => fetch('auth/user')

export const login = (email, password) => post('auth/login', {
    email: email,
    password: password
})

export const register = (email, password) => post('auth/register', {
    email: email,
    password: password
})
