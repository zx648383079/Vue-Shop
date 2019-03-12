<template>
    <div>
        <div class="has-header">
            <div class="log-hr">
                2018年12月
            </div>
            <div class="log-item" v-for="(item, index) in items" :key="index">
                <div class="info">
                    <div class="name">客户端签到</div>
                    <p>2222222</p>
                </div>
                <div class="amount">
                    +10
                </div>
            </div>
        </div>
    </div>
</template>
<script lang="ts">
import { Vue, Component, Prop, Emit } from 'vue-property-decorator';

@Component
export default class Log extends Vue {

}
</script>
<style lang="scss" scoped>

</style>
