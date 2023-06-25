import { defineStore } from "pinia";
import type { IAddress, ICartGroup, ICategory, IOrder, ISite } from "../api/model";
import { getCategories } from "../api/category";
import { getSiteInfo } from "../api/site";
import { getAddressList } from "../api/address";
import { getOrderInfo } from "../api/order";

interface ShopState {
    categories: ICategory[];
    site: ISite | null;
    cart: ICartGroup[];
    addressList: IAddress[];
    address: IAddress | null;
    order: IOrder | null;
}

export const useShopStore = defineStore('shop', {
    state(): ShopState {
        return {
            categories: [],
            site: null,
            cart: [],
            addressList: [],
            address: null,
            order: null,
        };
    },
    actions: {
        setCart(cart: ICartGroup[]) {
            this.cart = cart;
            return new Promise<ICartGroup[]>((resolve, _) => {
                resolve(cart);
            });
        },
        getCategories() {
            return new Promise<ICategory[]>((resolve, reject) => {
                if (this.categories && this.categories.length > 0) {
                    resolve(this.categories);
                    return;
                }
                getCategories().then(res => {
                    this.categories = res.data as any;
                    resolve(res.data as any);
                }).catch(reject);
            });
        },
        getSite() {
            return new Promise<ISite>((resolve, reject) => {
                if (this.site) {
                    resolve(this.site);
                    return;
                }
                getSiteInfo().then(res => {
                    this.site = res;
                    resolve(res);
                }).catch(reject);
            });
        },
        getAddressList() {
            return new Promise<IAddress[]>((resolve, reject) => {
                if (this.addressList && this.addressList.length > 0) {
                    resolve(this.addressList);
                    return;
                }
                getAddressList().then(res => {
                    this.addressList = res.data as any;
                    resolve(res.data as any);
                }).catch(reject);
            });
        },
        getAddress() {
            return new Promise<IAddress|null>((resolve, reject) => {
                if (this.address) {
                    resolve(this.address);
                    return;
                }
                this.getAddressList().then(res => {
                    for (const item of res) {
                        if (item.is_default) {
                            this.address = item;
                            resolve(item);
                            return;
                        }
                    }
                    resolve(null);
                }).catch(reject);
            });
        },
        setAddressIfEmpty(address: IAddress) {
            if (this.address) {
                return;
            }
            this.address = address;
        },
        getOrder(id: number) {
            return new Promise<IOrder>((resolve, reject) => {
                if (this.order && this.order.id === id) {
                    resolve(this.order);
                    return;
                }
                getOrderInfo(id).then(res => {
                    this.order = res;
                    resolve(res);
                    return;
                }).catch(reject);
            });
        }
    }
});