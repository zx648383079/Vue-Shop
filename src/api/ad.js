import {fetch} from '../utils/http'

export const getAds = (position) => fetch('shop/ad', {
    position: position
})

export const getBanners = () => fetch('shop/ad/banner')