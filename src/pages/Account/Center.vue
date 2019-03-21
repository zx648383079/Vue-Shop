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

interface IConnectMapItem {
    name?: string;
    icon?: string;
}

interface IConnectMap {
    [key: string]: IConnectMapItem
}

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
            this.refresh();
        }); 
    }

    public refresh() {
        const maps: IConnectMap = {
            qq: {
                name: 'QQ',
                icon: 'fa-qq'
            },
            wx: {
                name: '微信',
                icon: 'fa-weixin'
            },
            alipay: {
                name: '支付宝',
                icon: 'fa-alipay'
            },
            weibo: {
                name: '微博',
                icon: 'fa-weibo'
            },
            paypal: {
                name: 'PayPal',
                icon: 'fa-paypal'
            },
            github: {
                name: 'Github',
                icon: 'fa-github'
            },
            google: {
                name: 'Google',
                icon: 'fa-google'
            },
        };
        for (const item of this.items) {
            if (item.vendor && !maps.hasOwnProperty(item.vendor)) {
                maps[item.vendor] = item;
                continue;
            }
            if (!item.vendor) {
                continue;
            }
            maps[item.vendor] = Object.assign(maps[item.vendor], item);
        }
        this.items = [];
        for (const key in maps) {
            if (maps.hasOwnProperty(key)) {
                this.items.push(maps[key]);
            }
        }
    }
}
</script>
<style lang="scss" scoped>

</style>
