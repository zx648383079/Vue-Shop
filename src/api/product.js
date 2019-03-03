import {fetch} from '../utils/http'

export const getList = (params) => fetch('shop/goods', params)

export const getInfo = (id) => fetch('shop/goods', {
    id: id
})

export const getHome = () => fetch('shop/goods/home')

export const getHotKeywords = () => fetch('shop/search/keywords')

export const getTips = (keywords) => fetch('shop/search/tips', {
    keywords: keywords
})
