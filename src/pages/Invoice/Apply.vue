<template>
    <div>
        <BackHeader title="申请开票"/>
        <div class="has-header has-double-footer">
            <div class="order-mini-item" v-for="(item, index) in items" :key="index">
                <i class="fa check-box" :class="{active: item.checked}" @click="toggleCheck(item)"></i>
                <div class="info">
                    <div class="name">{{ item.series_number }}</div>
                    <p>{{ item.created_at }}</p>
                </div>
                <div class="amount">
                    {{ item.goods_amount }}
                </div>
            </div>
        </div>
        <div class="invoice-footer">
            <div @click="toggleCheckAll">
                <i class="fa check-box" :class="{active: checkedAll}"></i>
                全选
            </div>
            <div>
                已选择 {{ selectedCount }} 笔订单
            </div>
            <div>
                <p>可开票金额{{ total }}</p>
                <p>已选金额{{ selectedMoney }}</p>
            </div>
            <div>
                <a href="">立即开票</a>
            </div>
        </div>
    </div>
</template>
<script lang="ts">
import { Vue, Options } from 'vue-property-decorator';
import BackHeader from '@/components/BackHeader.vue';
import { getOrderList } from '../../api/invoice';
import { IOrder } from '../../api/model';

@Options({
    components: {
        BackHeader,
    },
})
export default class Apply extends Vue {
    public items: IOrder[] = [];
    public checkedAll = false;
    public selectedCount = 0;
    public selectedMoney = 0;
    public total = 0;

    public created() {
        getOrderList().then(res => {
            if (!res.data) {
                return;
            }
            this.items = res.data;
        })
    }

    public toggleCheckAll() {
        this.checkedAll = !this.checkedAll;
        for (const item of this.items) {
            item.checked = this.checkedAll;
        }
        this.refresh();
    }

    public toggleCheck(item: IOrder) {
        item.checked = !item.checked;
        if (!item.checked) {
            this.checkedAll = false;
        }
        this.refresh();
    }

    private refresh() {
        this.total = 0;
        this.selectedCount = 0;
        this.selectedMoney = 0;
        for (const item of this.items) {
            this.total += item.goods_amount;
            if (!item.checked) {
                continue;
            }
            this.selectedCount ++;
            this.selectedMoney += item.goods_amount;
        }
    }
}
</script>
<style lang="scss" scoped>

</style>
