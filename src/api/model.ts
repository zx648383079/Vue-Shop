export interface IPoint {
    x: number;
    y: number;
}

export interface ISize {
    width: number;
    height: number;
}

export interface IBound extends IPoint, ISize {

}

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

export interface IErrorResponse {
    [key: string]: any;
    code: number;
    message: string;
}

export interface IData<T> extends IBaseResponse {
    data?: T[];
}

export interface IDataOne<T> extends IBaseResponse {
    data?: T;
}

export interface IAd {
    id?: number,
    name?: string,
    type: number,
    url: string,
    content: string
}

export interface IArticle {
    id: number,
    title: string,
    description: string;
    thumb: string,
    category?: IArticleCategory,
    url?: string,
    content: string;
    created_at: string;
}

export interface IArticleCategory {
    id: number,
    name: string,
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
    children?: ICategory[],
    goods_list: IProduct[]
}

export interface ICategoryObject {
    [id: number]: ICategory
}

export interface IProduct {
    id: number;
    cat_id: number;
    brand_id: number;
    name: string;
    series_number: string;
    keywords: string;
    thumb: string;
    picture: string;
    description: string;
    brief: string;
    content: string;
    price: number;
    market_price: number;
    stock: number;
    attribute_group_id: number;
    weight: number;
    shipping_id: number;
    sales: string;
    is_best: number;
    is_hot: number;
    is_new: number;
    status: number;
    admin_note: string;
    type: number;
    position: number;
    seo_title?: string;
    seo_description?: string;
    seo_link?: string;
    dynamic_position: string;
    deleted_at: number;
    created_at: string;
    updated_at: string;
    shop: string;
    category?: ICategory;
    brand?: IBrand;
    gallery?: IGoodsGallery[];
    properties?: any[];
    coupons?: ICoupon[];
    promotes?: IActivity<any>[];
    is_collect?: boolean;
    static_properties?: any[];
    activity?: IActivity<any>;
    amount: number;
}

export interface IBrand {
    id: number;
    name: string;
    keywords?: string;
    description?: string;
    logo?: string;
    app_logo?: string;
    url: string;
    image?: string;
    price?: number;
}

export interface IGoodsGallery {
    id?: number;
    type: number;
    thumb: string;
    file: string;
    goods_id?: number;
}

export interface IHomeProduct {
    hot_products?: IProduct[];
    new_products?: IProduct[];
    best_products?: IProduct[];
}

export interface IImage {
    image: string
}

export interface IComment {
    id?: number;
    title: string;
    content: string;
    rank: number;
    user?: IUser;
    images?: IImage[];
    created_at?: string;
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
    logo: string;
    collect_count?: number;
    is_collected?: boolean
}

export interface ICartItem {
    id?: number;
    amount: number;
    price?: number;
    checked?: boolean;
    goods_id: number,
    goods?: IProduct;
}

export interface ICartGroup {
    shop?: IStore;
    name: string;
    checked?: boolean;
    goods_list: ICartItem[];
}

export interface IButton {
    action: string;
    text: string;
    reason?: any;
}

export interface ILink {
    text: string;
    url: string;
}

export interface ICartCell {
    popup_tip: string;
    link?: ILink;
}

export interface ICartSubtotal {
    total: number;
    total_weight: number;
    original_total: number;
    discount_amount: number;
    count: number;
}

export interface ICart {
    dialog: undefined;
    checkout_button?: IButton;
    data: ICartGroup[];
    promotion_cell?: ICartCell[];
    subtotal: ICartSubtotal;
}

export interface ICartDialog {
    dialog: boolean; // 需要弹窗选择属性
    data: IProduct;
}

export interface IPayment {
    id: number,
    name: string,
    icon?: string;
}

export interface IShipping {
    id: number,
    name: string,
    icon?: string;
}

export interface IConnect {
    id?: number,
    vendor?: string,
    nickname?: string,
    created_at?: string,
    name?: string,
    icon?: string;
    platform?: string;
}

export interface IUser {
    id: number;
    email: string;
    name: string;
    avatar: string;
    token?: string;
    sex?: number;
    sex_label?: string;
    birthday?: string;
}

export interface ICaptcha {
    type?: string;
    image: string;
    width: number;
    height: number;
    imageItems?: IBound[];
    control?: string;
    controlWidth?: number;
    controlHeight?: number;
    controlY?: number;
    count?: number;
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

export interface ICard {
    id: number,
    type: number,
    icon: string,
    bank: string,
    card_number: string,
    status: number,
    created_at: string
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
    captcha?: any;
    captcha_token?: string;
    code?: string;
    agree?: number|boolean;
}

export interface IRegister {
    name: string;
    email?: string;
    password?: string;
    confirm_password?: string;
    invite_code?: string;
    mobile?: string;
    code?: string;
    agree?: number|boolean;
}

export interface IRegion {
    id: number;
    name: string;
    parent_id?: number;
    children?: IRegionObject | IRegion[];
    full_name?: string;
}

export interface IRegionObject {
    [id: number]: IRegion;
}

export interface IAddress {
    id: number;
    name: string;
    tel: string;
    region_id: number;
    region?: IRegion;
    region_name?: string;
    address: string;
    is_default?: boolean;
}

export interface IOrder {
    id: number,
    series_number: string,
    status_label: string,
    status: number;
    goods_amount: number,
    payment_id: number,
    payment_name: string,
    shipping_id: number,
    shipping_name: string,
    goods?: IOrderGoods[];
    address?: IAddress;
    checked?: boolean;
    created_at?: string;
    pay_at?: string;
    shipping_at?: string;
    receive_at?: string;
    finish_at?: string;
    shipping_fee?: number;
    pay_fee?: number;
    discount?: number;
    order_amount?: number;
    shipping_status?: string;
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
    name?: string;
    status?: number;
    amount: number;
    price: number;
    goods_id: number;
    thumb: string;
    goods: IProduct;
    comment_id?: number;
}

export interface ICheckIn {
    id: number,
    created_at: string,
    running: number,
    type: number
}

export interface IPrePay {
    success?: boolean,
    url?: string,
    html?: string,
    params?: {[key: string]: string}
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

export interface ICoupon {
    id: number;
    name: string;
    thumb: string;
    type: number;
    rule: number;
    rule_value: number;
    min_money: number;
    money: number;
    send_type: number;
    send_value: number;
    received: number;
    can_receive?: boolean;
    every_amount: number;
    start_at: number;
    end_at: number;
    created_at: string;
    updated_at: string;
    expired?: boolean;
}

export interface IInvoiceTitle {
    id?: number;
    title_type: number;
    type: number;
    title: string;
    tax_no: string;
    tel: string;
    bank: string;
    account: string;
    address: string;
    user_id?: number;
    created_at?: string;
    updated_at?: string;
}

export interface IInvoiceLog {
    id?: string;
    title_type?: number;
    type?: number;
    title: string;
    tax_no?: string;
    tel?: string;
    bank?: string;
    account?: string;
    address?: string;
    user_id?: number;
    money?: number;
    status?: number;
    created_at?: string;
    updated_at?: string;
}

export interface IActivityTime {
    id?: number,
    title: string,
    start_at: string,
    end_at: string,
}

export interface ISeckillGoods {
    id: number,
    act_id: number,
    goods_id: number,
    goods: IProduct,
    price: number,
    amount: number,
    status: number,
    every_amount: number
}

export interface ISite {
    name: string;
    version: string;
    logo: string;
    goods: number;
    category: number;
    brand: number;
    currency: string;
}

export interface IDriver {
    id?: number;
    name: string;
    created_at: string;
}

export interface ICertification {
    name: string;
    sex: string;
    country: string;
    type: number;
    card_no: string;
    expiry_date: string;
    profession: string;
    address: string;
    front_side: string;
    back_side: string;
    status: number;
}



export interface IActivity<T = any> {
    id: number;
    name: string;
    thumb: string;
    description: string;
    type: number;
    scope_type: number;
    scope: string;
    configure: T;
    status: number;
    start_at: number|string;
    end_at: number|string;
    created_at: string;
    updated_at: string;
    goods?: IProduct;
    price?: number;
    log_count?: number;
    is_joined?: boolean;
    join_log?: any;
    log?: any;
    goods_items?: {
        price: number;
        amount: number;
        goods: IProduct;
    }[];
}

export interface IAuctionConfigure {
    mode: number;
    begin_price: number;
    fixed_price: number;
    step_price: number;
    deposit: number;
}

export interface IBargainConfigure {
    min: number;
    max: number;
    times: number;
    amount: number;
    shipping_fee: number;
}

export interface ICashBackConfigure {
    order_amount: number;
    star: number;
    money: number;
}

export interface IDiscountConfigure {
    type: number;
    amount: number;
    check_discount: number;
    check_money: number;
    check_gift: number;
    check_shipping: number;
    discount_value: number;
    discount_money: number;
    discount_goods: number;
}

export interface IFreeTrialConfigure {
    amount: number;
}

export interface IGroupBuyConfigure {
    deposit: number;
    amount: number;
    send_point: number;
    step: IGroupBuyStep[];
}

export interface IGroupBuyStep {
    amount: number;
    price: number;
}

export interface ILotteryConfigure {
    time_price: number;
    buy_times: number;
    start_times: number;
    btn_text: string;
    over_text: string;
    items: ILotteryGift[];
}

export interface ILotteryGift {
    name: string;
    goods?: IProduct;
    goods_id: number;
    chance: number;
    color: string;
}

export interface IMixConfigure {
    price: number;
    goods: IMixGoods[];
}

export interface IMixGoods {
    goods?: IProduct;
    goods_id: number;
    amount: number;
    price: number;
}

export interface IPreSaleConfigure {
    final_start_at: string;
    final_end_at: string;
    ship_at: string;
    price_type: number;
    price: number;
    step: IGroupBuyStep[];
    deposit: number;
    deposit_scale: number;
    deposit_scale_other: number;
}

