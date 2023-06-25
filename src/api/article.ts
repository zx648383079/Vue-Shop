import {fetch} from '../utils/http';
import type { IData, IAd, IArticle, IArticleCategory } from './model';

export const getArticleList = (params: any) => fetch<IData<IArticle>>('shop/article', params);

export const getCategories = (parentId = 0) =>
    fetch<IData<IArticleCategory>>('shop/article/category', {parent_id: parentId});
export const getArticle = (id: number) => fetch<IArticle>('shop/article', {id});
