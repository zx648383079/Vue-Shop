export interface IPaging {
    limit: number;
    offset: number;
    total: number;
    more: boolean;
}

export interface IPage<T> {
    paging: IPaging;
    data: T[];
}

export interface IBaseResponse {
    appid?: string;
    sign?: string;
    sign_type?: string;
    timestamp?: string;
    encrypt?: string;
    encrypt_type?: string;
}
export interface IData<T> extends IBaseResponse {
    data?: T[];
}

export interface IAd {
    id?: number,
    name?: string,
    type?: number,
    url?: string,
    content: string
}

export interface ICategory {
    id: number,
    name: string,
    icon: string,
    banner: string,
    app_banner: string,
    parent_id?: number,
    expanded?: boolean,
    level?: number,
    children?: ICategoryObject
}

export interface ICategoryObject {
    [id: number]: ICategory
}

export interface IProduct {
    id: string;
    name: string;
    thumb: string;
    price: string;
    market_price: string;
    shop: string;
}

export interface IHomeProduct {
    hot_products: IProduct[];
    new_products: IProduct[];
    best_products: IProduct[];
}

export interface IStore {
    id: number;
    name: string;
}

export interface ICartItem {
    id: number;
    amount: number;
    price: number;
    goods: IProduct;
}

export interface ICart {
    shop: IStore;
    goods_list: ICartItem[];
}

export interface IUser {
    id: string;
    email: string;
    name: string;
    avatar: string;
    token?: string;
}
