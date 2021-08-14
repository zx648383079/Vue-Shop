<template>
    <DialogPanel title="充值">
        <a>
            <i class="iconfont fa-money-check-alt" aria-hidden="true"></i>
            充值
            <i class="iconfont fa-chevron-right" aria-hidden="true"></i>
        </a>
        <div slot="panel">
            <p>充值金额</p>
            <div class="money-input">
                <em>￥</em>
                <input type="text" placeholder="0.00">
            </div>
        </div>
        <div slot="footer">
            <button class="dialog-yes">下一步</button>
        </div>
    </DialogPanel>
</template>
<script lang="ts">
import { Vue, Options } from 'vue-property-decorator';
import DialogPanel from '@/components/DialogPanel.vue';

@Options({
    components: {
        DialogPanel,
    },
})
export default class RechargePanel extends Vue {

}
</script>
<style lang="scss" scoped>
</style>
