import {fetch, post} from '../utils/http'

export const getCart = (params) => fetch('shop/cart', params)

export const addGoods = (goods, amount = 1, properties = []) => post('shop/cart/add', {
    goods: goods,
    amount: amount,
    properties: properties
})

export const updateItem = (id, amount = 1) => post('shop/cart/update', {
    id: id,
    amount: amount
})

export const deleteItem = (id) => post('shop/cart/delete', {
    id: id
})
