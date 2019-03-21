<template>
    <div>
        <BackHeader :title="mode > 0 ? '选择地址' : '我的地址'">
            <a class="right" @click="$router.push('/address/create')">
                <i class="fa fa-plus"></i>
            </a>
        </BackHeader>
      <div class="has-header">
            <div class="swipe-box address-list">
                <SwipeRow v-for="(item, index) in items" :name="['address-item', selected == item.id ? ' selected' : '']"  :key="index" :index="item.id" ref="swiperow" @click="tapSelected(item)">
                    <div slot="left" v-if="!item.is_default">
                        <a class="set-default" @click="tapDefault(item)">
                            设为默认
                        </a>
                    </div>
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
                            <span>{{ item.region.full_name }} {{ item.address }}</span>    
                        </p>
                    </div>
                    <div slot="right">
                        <a @click="tapEdit(item)">
                            <i class="fa fa-edit"></i>
                        </a>
                        <i class="fa fa-trash" @click="tapRemove(item)"></i>
                    </div>
                </SwipeRow>
            </div>
        </div>
    </div>
</template>
<script lang="ts">
import { Vue, Component, Prop, Emit } from 'vue-property-decorator';
import { IAddress } from '@/api/model';
import { getAddressList, deleteAddress, defaultAddress } from '@/api/address';
import BackHeader from '@/components/BackHeader.vue';
import SwipeRow from '@/components/SwipeRow.vue';
import { dispatchSetAddress, dispatchAddressList, dispatchSetAddressIfEmpty } from '@/store/dispatches';

@Component({
    components: {
        BackHeader,
        SwipeRow,
    }
})
export default class Index extends Vue {
    items: IAddress[] = [];
    selected: number = 0;
    mode: number = 0;

    created() {
        if (this.$route.query.selected) {
            this.mode = 1;
            this.selected = parseInt(this.$route.query.selected + '');
        }
        dispatchAddressList().then(res => {
            if (!res) {
                return;
            }
            this.items = res;
        });
    }

    public tapEdit(item: IAddress) {
        this.$router.push({name: 'address-edit', params: { id: item.id + ''}});
    }

    public tapSelected(item: IAddress) {
        if (this.mode < 1) {
            return;
        }
        this.selected = item.id;
        dispatchSetAddress(item);
        this.$router.replace('/cashier');
    }

    tapDefault(item: IAddress) {
        defaultAddress(item.id).then(() => {
            for (const it of this.items) {
                it.is_default = item.id == it.id;
            }
            const rows: SwipeRow[] = this.$refs.swiperow as SwipeRow[];
            for (const box of rows) {
                box.reset();
            }
            if (this.mode > 0) {
                dispatchSetAddressIfEmpty(item);
            }
        });
    }

    tapRemove(item: IAddress) {
        deleteAddress(item.id).then(() => {
            for (let i = 0; i < this.items.length; i++) {
                if (this.items[i].id == item.id) {
                    this.items.splice(i, 1);
                }
            }
        });
    }
}
</script>
<style lang="scss" scoped>
.set-default {
    line-height: 5rem;
    font-size: 16px;
    margin: 0 10px;
}
</style>
