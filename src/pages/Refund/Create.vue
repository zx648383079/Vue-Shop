<template>
    <div>
        <BackHeader :title="$route.meta.title"/>
        <div class="has-header">
            <div>
                <div class="goods-item" v-for="(item, index) in items" :key="index">

                </div>
            </div>
            <div v-if="mode < 2">
                <div class="actions" v-if="status == ORDER_STATUS.SHIPPED">
                    <span>您是否已收到货?</span>
                    <div class="radio-box">
                        <span :class="{ active: mode < 1 }" @click="mode = 0">未收货</span>
                        <span :class="{ active: mode == 1 }" @click="mode = 1">已收货</span>
                    </div>
                </div>
                <RefundGrid v-if="mode < 1"/>
                <div class="choose-mode">
                    <button @click="mode = 2">申请返修/退换货</button>
                </div>
            </div>
            <div class="menu-list" v-if="mode == 2">
                <MenuItem title="维修" icon="fa-hammer" @click="mode = 3"/>
                <MenuItem title="退货" icon="fa-undo" @click="mode = 4"/>
                <MenuItem title="换货" icon="fa-exchange-alt" @click="mode = 5"/>
            </div>
            <AfterSalegGrid v-if="mode > 2" :mode="mode"/>
        </div>
    </div>
</template>
<script lang="ts">
import { Vue, Component, Prop, Emit } from 'vue-property-decorator';
import BackHeader from '@/components/BackHeader.vue';
import { IOrderGoods, ORDER_STATUS } from '@/api/model';
import { getRefundGoods } from '@/api/order';
import RefundGrid from './Child/RefundGrid.vue';
import AfterSalegGrid from './Child/AfterSalegGrid.vue';
import MenuItem from '@/pages/Member/Child/MenuItem.vue';

@Component({
    components: {
        BackHeader,
        RefundGrid,
        MenuItem,
        AfterSalegGrid,
    },
})
export default class Create extends Vue {
    public ORDER_STATUS = ORDER_STATUS;
    items: IOrderGoods[] = [];
    mode: number = 0;
    status: ORDER_STATUS = ORDER_STATUS.PAID_UN_SHIP;

    created() {
        getRefundGoods(this.$route.query).then(res => {
            if (!res.data || res.data.length < 1) {
                this.$router.push('/');
                return;
            }
            this.items = res.data;
            this.status = res.data[0].status as ORDER_STATUS;
            if (this.status == ORDER_STATUS.RECEIVED || this.status == ORDER_STATUS.FINISH) {
                this.mode = 2;
            }
        });
    }

}
</script>
<style lang="scss" scoped>

</style>
