<template>
    <div>
        <BackHeader title="账户安全"/>
        <div class="has-header">
            <div class="account-box">
                <div class="line-item" v-for="(item, index) in items" :key="index">
                    <span><i :class="['fab', item.icon]"></i>{{ item.name }}</span>
                    <span>{{ item.id ? '已绑定' : '未绑定' }}</span>
                    <i class="fa fa-chevron-right"></i>
                </div>
            </div>
        </div>
    </div>
</template>
<script lang="ts">
import { Vue, Component, Prop, Emit } from 'vue-property-decorator';
import BackHeader from '@/components/BackHeader.vue';
import { getConnect } from '@/api/user';
import { IConnect } from '@/api/model';

@Component({
    components: {
        BackHeader,
    },
})
export default class Center extends Vue {

    public items: IConnect[] = [];

    public created() {
        getConnect().then(res => {
            if (!res.data) {
                return;
            }
            this.items = res.data;
        });
    }
}
</script>
<style lang="scss" scoped>

</style>
