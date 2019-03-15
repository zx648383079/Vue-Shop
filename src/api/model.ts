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
    children?: ICategoryObject | ICategory[],
    goods_list: IProduct[]
}

export interface ICategoryObject {
    [id: number]: ICategory
}

export interface IProduct {
    id: number;
    name: string;
    thumb: string;
    price: number;
    market_price: number;
    stock?: number;
    shop?: string;
    is_collect?: boolean;
}

export interface IHomeProduct {
    hot_products: IProduct[];
    new_products: IProduct[];
    best_products: IProduct[];
}

export interface IComment {
    id: number;
    title: string;
    content: string;
    rank: number;
    user?: IUser;
    images?: {image: string}
}

export interface ITag {
    label: string;
    count: number;
}

export interface ICommentSubtotal {
    total: number;
    good: number;
    middle: number;
    bad: number;
    avg: number;
    favorable_rate: number;
    tags: ITag[];
    comments: IComment[];
}

export interface IStore {
    id: number;
    name: string;
}

export interface ICartItem {
    id: number;
    amount: number;
    price: number;
    checked?: boolean;
    goods: IProduct;
}

export interface ICart {
    shop?: IStore;
    name: string;
    checked?: boolean;
    goods_list: ICartItem[];
}

export interface IUser {
    id: number;
    email: string;
    name: string;
    avatar: string;
    token?: string;
}

export interface IAccountLog {
    id?: number,
    type?: number;
    item_id?: number,
    money?: number,
    status?: number,
    remark: string;
    created_at?: string;
}

export interface ICollect {
    id?: number,
    goods: IProduct;
    goods_id: number;
    created_at?: string;
}

export interface ILogin {
    email?: string;
    password?: string;
    mobile?: string;
    code?: string;
}

export interface IAddress {
    id: number;
    name: string;
    tel: string;
    region_id: number;
    region_name: string;
    address: string;
}

export interface IOrder {
    id: number,
    series_number: string,
    status_label: string,
    status: number;
    goods_amount: number,
    goods?: IOrderGoods[];
    address?: IAddress
}

export interface ISubtotal {
    [key: string]: number
}

export interface IOrderCount {
    un_pay?: number,
    shipped?: number,
    finish?: number,
    cancel?: number,
    invalid?: number,
    paid_un_ship?: number,
    received?: number,
    uncomment?: number,
    refunding?: number
}

export interface IOrderGoods {
    id: number;
    amount: number;
    price: number;
    goods_id: number;
    goods: IProduct;
}

export enum ORDER_STATUS {
    CANCEL = 1,
    INVALID = 2,
    UN_PAY = 10,
    PAID_UN_SHIP = 20,
    SHIPPED = 40,
    RECEIVED = 60,
    FINISH = 80,
}
