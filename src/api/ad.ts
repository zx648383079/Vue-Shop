import {fetch} from '../utils/http';
import  type { IData, IAd } from './model';

export const getAds = (position: number) => fetch<IData<IAd>>('ad', {
    position,
});

export const getBanners = () => fetch<IData<IAd>>('ad/banner');
