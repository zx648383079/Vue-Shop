<template>
    <div>
        <BackHeader :title="$route.meta.title"/>
        <div class="has-header">
            <div class="log-hr">
                2018年12月
            </div>
            <div class="log-item" v-for="(item, index) in items" :key="index">
                <div class="info">
                    <div class="name">12312332312</div>
                    <p>222</p>
                </div>
                <div class="amount">
                    +10
                </div>
            </div>
        </div>
    </div>
</template>
<script lang="ts">
import { Vue, Options } from 'vue-property-decorator';
import BackHeader from '@/components/BackHeader.vue';

@Options({
    components: {
        BackHeader,
    },
})
export default class Order extends Vue {
    public items = [1];
}
</script>
<style lang="scss" scoped>

</style>
