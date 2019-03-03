import {fetch} from '../utils/http'

export const getCategories = () => fetch('shop/category')
