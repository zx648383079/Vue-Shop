<template>
    <div>
        <BackHeader title="开票历史"/>
        <div class="has-header">
            <div class="log-hr">
                2018年12月
            </div>
            <div class="log-item" v-for="(item, index) in items" :key="index">
                <div class="info">
                    <div class="name">个人</div>
                    <p>2018-123</p>
                </div>
                <div class="amount">
                    ￥200
                </div>
            </div>
        </div>
    </div>
</template>
<script lang="ts">
import { Vue, Component, Prop, Emit } from 'vue-property-decorator';
import BackHeader from '@/components/BackHeader.vue';

@Component({
    components: {
        BackHeader,
    },
})
export default class Log extends Vue {
    public items = [];
}
</script>
<style lang="scss" scoped>

</style>
