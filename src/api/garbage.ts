import {fetch} from '../utils/http';
import { IData } from './model';

export interface IGarbage {
    name: string,
    classification: IClassification,
}

export interface IClassification {
    name: string,
    en_name: string,
    image: string,
    introduce: string,
    contain: string,
    standard: string|string[],
    content: string,
}

export const getClassification = () => fetch<IData<IClassification>>('garbage/home/classification');

export const getTips = (keywords: string) => fetch<IData<string>>('garbage/home/suggest', {
    keywords,
});

export const getGarbage = (keywords: string) => fetch<IGarbage>('garbage', {
    keywords,
});
