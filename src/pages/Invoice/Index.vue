<template>
    <div>
        <BackHeader title="发票管理"/>
        <div class="has-header">
            <div class="account-header">
                <p>可开发票总金额(元)</p>
                <div class="money">{{ subtotal.remain || 0 }}</div>
            </div>

            <div class="menu-list">
                <a @click="$router.push('/invoice/apply')">
                    <i class="fa fa-money-check-alt" aria-hidden="true"></i>
                    申请开票
                    <i class="fa fa-chevron-right" aria-hidden="true"></i>
                </a>
                <a @click="$router.push('/invoice/title')">
                    <i class="fa fa-wallet" aria-hidden="true"></i>
                    发票抬头
                    <i class="fa fa-chevron-right" aria-hidden="true"></i>
                </a>
                <a @click="$router.push('/invoice/log')">
                    <i class="fa fa-bookmark" aria-hidden="true"></i>
                    近期开票
                    <i class="fa fa-chevron-right" aria-hidden="true"></i>
                </a>
            </div>
        </div>

    </div>
</template>
<script lang="ts">
import { Vue, Component, Prop, Emit } from 'vue-property-decorator';
import BackHeader from '@/components/BackHeader.vue';
import { ISubtotal } from '../../api/model';
import { getSubtotal } from '../../api/invoice';

@Component({
    components: {
        BackHeader,
    },
})
export default class Index extends Vue {
    public subtotal: ISubtotal = {};

    public created() {
        getSubtotal().then(res => {
            this.subtotal = res;
        });
    }
}
</script>
<style lang="scss" scoped>

</style>
