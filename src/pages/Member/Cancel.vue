<template>
    <div>
        <BackHeader :title="$route.meta.title"/>
        <div class="has-header">
            <div class="tip">
                请选择注销原因：
            </div>

            <div class="item" v-for="(item, index) in items" :key="index"  @click="selected = index">
                <i class="fa check-box" :class="{active: selected == index}"></i>
                {{ item }}
            </div>

            <div class="btn del-btn">确定注销</div>
        </div>
    </div>
</template>
<script lang="ts">
import { Vue, Component, Prop, Emit } from 'vue-property-decorator';
import BackHeader from '@/components/BackHeader.vue';
import { MessageBox } from 'mint-ui';

@Component({
    components: {
        BackHeader,
    },
})
export default class Cancel extends Vue {
    public items: string[] = [
        '需要解绑手机',
        '需要解绑邮箱',
        '安全/隐私顾虑',
        '这是多余的账户',
    ];

    public selected: number = 0;

    public mounted() {
        MessageBox.confirm('账户注销后，您已完成的交易将无法售后。', '账户注销确认', {
            confirmButtonText: '确定继续注销',
            cancelButtonText: '暂不注销',
        }).catch(() => {
            this.$router.back();
        });
    }
}
</script>
<style lang="scss" scoped>
.tip {
    line-height: 30px;
    padding: 10px;
}
.item {
    background-color: #fff;
    position: relative;
    padding-left: 60px;
    line-height: 40px;
    .fa {
        position: absolute;
        top: 12px;
        left: 20px;
    }
    &:not(:last-of-type) {
        border-bottom: 1px solid #ccc;
    }
}
</style>
