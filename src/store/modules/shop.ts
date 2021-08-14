import {
    SET_CATEGORIES, SET_SITE, SET_CART, SET_ADDRESS_LIST, SET_ADDRESS, SET_ORDER,
} from '../types';
import { ICategory, IAddress, IOrder, ICartGroup, ISite } from '@/api/model';
import { getCategories } from '@/api/category';
import { getSiteInfo } from '@/api/site';
import { getAddressList } from '@/api/address';
import { dispatchAddressList } from '../dispatches';
import { getOrderInfo } from '@/api/order';
import { Action, Module, Mutation, VuexModule } from 'vuex-class-modules';

@Module({ generateMutationSetters: true })
export class ShopModule extends VuexModule {
    categories: ICategory[] = [];
    site: ISite | null = null;
    cart: ICartGroup[] = [];
    addressList: IAddress[] = [];
    address: IAddress | null = null;
    order: IOrder | null = null;

    @Mutation
    [SET_CATEGORIES](categories: ICategory[]) {
        this.categories = categories;
    }

    @Mutation
    [SET_SITE](subtotal: ISite) {
        this.site = subtotal;
    }

    @Mutation
    [SET_CART](cart: ICartGroup[]) {
        this.cart = cart;
    }

    @Mutation
    [SET_ADDRESS_LIST](items: IAddress[]) {
        this.addressList = items;
    }

    @Mutation
    [SET_ADDRESS](item: IAddress) {
        this.address = item;
    }

    @Mutation
    [SET_ORDER](order: IOrder) {
        this.order = order;
    }

    @Action
    setCart(cart: ICartGroup[]) {
        this[SET_CART](cart);
        return new Promise<ICartGroup[]>((resolve, reject) => {
            resolve(cart);
        });
    }

    @Action
    getCategories() {
        return new Promise<ICategory[]>((resolve, reject) => {
            if (this.categories && this.categories.length > 0) {
                resolve(this.categories);
                return;
            }
            getCategories().then(res => {
                this[SET_CATEGORIES](res.data as any);
                resolve(res.data as any);
            }).catch(reject);
        });
    }
    
    @Action
    getSite() {
        return new Promise<ISite>((resolve, reject) => {
            if (this.site) {
                resolve(this.site);
                return;
            }
            getSiteInfo().then(res => {
                this[SET_SITE](res);
                resolve(res);
            }).catch(reject);
        });
    }

    @Action
    getAddressList() {
        return new Promise<IAddress[]>((resolve, reject) => {
            if (this.addressList && this.addressList.length > 0) {
                resolve(this.addressList);
                return;
            }
            getAddressList().then(res => {
                this[SET_ADDRESS_LIST](res.data as any);
                resolve(res.data as any);
            }).catch(reject);
        });
    }

    @Action
    setAddressList(data: IAddress[]) {
        this[SET_ADDRESS_LIST](data);
    }

    @Action
    getAddress() {
        return new Promise<IAddress|null>((resolve, reject) => {
            if (this.address) {
                resolve(this.address);
                return;
            }
            dispatchAddressList().then(res => {
                for (const item of res) {
                    if (item.is_default) {
                        this[SET_ADDRESS](item);
                        resolve(item);
                        return;
                    }
                }
                resolve(null);
            }).catch(reject);
        });
    }

    @Action
    setAddress(address: IAddress) {
        this[SET_ADDRESS](address);
    }

    @Action
    setAddressIfEmpty(address: IAddress) {
        if (this.address) {
            return;
        }
        this[SET_ADDRESS](address);
    }

    @Action
    setOrder(order: IOrder) {
        this[SET_ORDER](order);
    }

    @Action
    getOrder(id: number) {
        return new Promise<IOrder>((resolve, reject) => {
            if (this.order && this.order.id === id) {
                resolve(this.order);
                return;
            }
            getOrderInfo(id).then(res => {
                this[SET_ORDER](res);
                resolve(res);
                return;
            }).catch(reject);
        });
    }
}
