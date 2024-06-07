<template>
    <div>
        <BackHeader :title="$route.meta.title as string">
            <a class="right" @click="tapSubmit">
                <i class="iconfont icon-check"></i>
            </a>
        </BackHeader>
        <div class="has-header">
            <form class="form-inline" method="post">
                <div class="input-group">
                    <input type="text" name="name" class="form-control" placeholder="收货人" required  v-model="address.name">
                </div>
                <div class="input-group">
                    <input type="text" name="tel" class="form-control" placeholder="手机号" required v-model="address.tel">
                </div>
                <SelectPicker :items="regions" :column="3" v-model="region">
                    <div class="input-group region-box">
                        <span>{{ region && region.full_name ? region.full_name : '地址' }}</span>
                    </div>
                </SelectPicker>
                
                <div class="input-group">
                    <textarea name="address" class="form-control" placeholder="详细地址" required v-model="address.address"></textarea>
                </div>

                <div class="input-radio" @click="address.is_default = !address.is_default">
                    <span>设为默认地址</span>
                    <ToggleSwitch v-model="address.is_default"/>
                </div>
            </form>
        </div>

        <div class="fixed-footer" v-if="address.id > 0">
            <button class="btn btn-danger" type="button" @click="tapRemove">删除地址</button> 
        </div>

    </div>
</template>
<script setup lang="ts">
import type { IAddress, IRegionObject } from '@/api/model';
import { getRegionTree } from '@/api/region';
import { deleteAddress, getAddress, updateAddress, createAddress } from '@/api/address';
import BackHeader from '@/components/BackHeader.vue';
import ToggleSwitch from '../../components/ToggleSwitch.vue';
import SelectPicker from '@/components/SelectPicker.vue';
import { ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { useShopStore } from '../../stores/shop';
import { useDialog } from '../../components/Dialog/plugin';

const route = useRoute();
const router = useRouter();
const toast = useDialog();
const shopStore = useShopStore();
const address = ref<IAddress>({
    id: 0,
    name: '',
    tel: '',
    region_id: 0,
    region_name: '',
    address: '',
    is_default: false,
});
const region = ref<any>(null);
const back = ref(0);
const regions = ref<IRegionObject>({});

function tapSubmit() {
    if (!region.value) {
        toast.warning('请选择收货地址');
        return;
    }
    const data: IAddress = {
        id: address.value.id,
        name: address.value.name,
        tel: address.value.tel,
        region_id: region.value.id,
        address: address.value.address,
        is_default: address.value.is_default,
    };
    if (!data.name) {
        toast.warning('请输入收货人');
        return;
    }
    if (!data.tel) {
        toast.warning('请输入手机号');
        return;
    }
    if (address.value.id > 0) {
        updateAddress(data).then(res => {
            saveBack(res);
        });
        return;
    }
    createAddress(data).then(res => {
        saveBack(res);
    });
}

function tapRemove() {
    if (address.value.id < 1) {
        return;
    }

    deleteAddress(address.value.id).then(() => {
        shopStore.addressList = [];
        router.back();
    });
}

function saveBack(address: IAddress) {
    shopStore.addressList = [];
    if (back.value < 1) {
        router.back();
        return;
    }
    shopStore.address = address;
    if (back.value === 1) {
        router.replace('/cashier');
        return;
    }
    if (back.value === 2) {
        router.back();
        return;
    }
}

if (route.query.back) {
    back.value = parseInt(route.query.back + '', 10);
}
getRegionTree().then(res => {
    if (res.data) {
        regions.value = res.data;
    }
});
const id = parseInt(route.params.id as string, 10);
if (id) {
    getAddress(id).then(res => {
        address.value = res;
        region.value = res.region;
    });
}

</script>
<style lang="scss" scoped>
.region-box {
    padding-left: .4rem;
    span {
        display: block;
        line-height: 2.5rem;
    }
}
</style>
