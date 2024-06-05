<template>
    <div>
        <BackHeader :title="queries.mode > 0 ? '选择地址' : '我的地址'">
            <a class="right" @click="$router.push('/address/create')">
                <i class="iconfont icon-plus"></i>
            </a>
        </BackHeader>
      <div class="has-header">
            <div class="swipe-box address-list">
                <SwipeRow v-for="(item, index) in items" :name="['address-item', queries.selected == item.id ? ' selected' : '']"  :key="index" :index="item.id" ref="swiperow"             @tapped="tapSelected(item)">
                    <slot name="left" v-if="!item.is_default">
                        <a class="set-default" @click="tapDefault(item)">
                            设为默认
                        </a>
                    </slot>
                    <div class="address-first">
                        <span>{{ item.name }}</span>
                    </div>
                    <div class="address-info">
                        <p>
                            <span class="name">{{ item.name }}</span>
                            <span class="tel">{{ item.tel }}</span>
                        </p>
                        <p>
                            <span class="default" v-if="item.is_default">默认</span>
                            <span>{{ item.region?.full_name }} {{ item.address }}</span>    
                        </p>
                    </div>
                    <slot name="right">
                        <a @click="tapEdit(item)">
                            <i class="iconfont icon-edit"></i>
                        </a>
                        <i class="iconfont icon-trash" @click="tapRemove(item)"></i>
                    </slot>
                </SwipeRow>
            </div>
        </div>
    </div>
</template>
<script setup lang="ts">
import type { IAddress } from '@/api/model';
import { deleteAddress, defaultAddress } from '@/api/address';
import BackHeader from '@/components/BackHeader.vue';
import SwipeRow from '@/components/SwipeRow.vue';
import { reactive, ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { useShopStore } from '../../stores/shop';

const route = useRoute();
const router = useRouter();
const shopStore = useShopStore();
const items = ref<IAddress[]>([]);
const queries = reactive({
    selected: 0,
    mode: 0
});
const rows = ref<typeof SwipeRow[]>();

function tapEdit(item: IAddress) {
    router.push({name: 'address-edit', params: { id: item.id + ''}});
}

function tapSelected(item: IAddress) {
    if (queries.mode < 1) {
        return;
    }
    queries.selected = item.id;
    shopStore.address = item;
    if (queries.mode === 1) {
        router.replace('/cashier');
        return;
    }
    if (queries.mode === 2) {
        router.back();
        return;
    }
}

function tapDefault(item: IAddress) {
    defaultAddress(item.id).then(() => {
        for (const it of items.value) {
            it.is_default = item.id === it.id;
        }
        if (!rows.value) {
            return;
        }
        for (const box of rows.value) {
            box.reset();
        }
        if (queries.mode > 0) {
            shopStore.setAddressIfEmpty(item);
        }
    });
}

function tapRemove(item: IAddress) {
    deleteAddress(item.id).then(() => {
        for (let i = 0; i < items.value.length; i++) {
            if (items.value[i].id === item.id) {
                items.value.splice(i, 1);
            }
        }
    });
}

if (route.query.selected) {
    queries.mode = route.query.back ? parseInt(route.query.back + '', 10) : 1;
    queries.selected = parseInt(route.query.selected + '', 10);
}
shopStore.getAddressList().then(res => {
    if (!res) {
        return;
    }
    items.value = res;
});
</script>
<style lang="scss" scoped>
.set-default {
    line-height: 5rem;
    font-size: 16px;
    margin: 0 10px;
}
</style>
