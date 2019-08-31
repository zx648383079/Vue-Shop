import {fetch} from '../utils/http';
import { IData, IActivityTime, IPage, ISeckillGoods } from './model';

export const getTimes = () => fetch<IData<IActivityTime>>('shop/activity/seckill/time');

export const getSeckill = (params: any) => fetch<IPage<ISeckillGoods>>('shop/activity/seckill/goods', params);
