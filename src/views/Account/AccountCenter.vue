<template>
    <div>
        <BackHeader title="账户安全"/>
        <div class="has-header">
            <div class="account-box">
                <div class="line-item" v-for="(item, index) in items" :key="index" @click="tapBinding(item)">
                    <div class="item-header">
                        <i :class="['iconfont', item.icon]"></i>{{ item.name }}
                        <em class="item-meta" v-if="item.platform || item.nickname">
                            (
                            <span class="item-platform">{{ item.platform }}：</span>{{ item.nickname }})
                        </em>
                    </div>
                    <span :class="{'meta-text': !item.id}">{{ item.id ? '已绑定' : '未绑定' }}</span>
                    <i class="iconfont icon-chevron-right"></i>
                </div>
            </div>
        </div>
    </div>
</template>
<script setup lang="ts">
import BackHeader from '@/components/BackHeader.vue';
import { connectRemove, getConnect } from '@/api/user';
import type { IConnect } from '@/api/model';
import { ref } from 'vue';
import { iconfontFilter } from '../../pipes/iconfont';
import { useDialog } from '../../components/Dialog';
import { useI18n } from 'vue-i18n';
import { useWebAuthn } from '../../services';

const items = ref<IConnect[]>([]);
const toast = useDialog();
const i18n = useI18n();
const webAuthnn = useWebAuthn();

function tapBinding(item: IConnect) {
    if (item.id) {
        tapUnBind(item);
        return;
    }
    if (item.vendor === 'web_authn') {
        webAuthnn.create().then(() => {
            tapRefresh();
            toast.success(i18n.t('WeAuthn register successfully'));
        }).catch(err => {
            toast.error(err);
        });
        return;
    }
    if (item.vendor === '2fa') {
        // this.create2FA();
        return;
    }
}

function tapUnBind(item: IConnect) {
    toast.confirm(i18n.t('Are you sure to unbinding this account?')).then(() => connectRemove(item.id)).then(_ => {
        toast.success(i18n.t('Unbind successfully'));
        tapRefresh();
    });
}

function tapRefresh() {
    getConnect().then(res => {
        if (!res.data) {
            return;
        }
        items.value = res.data.map(item => {
            item.icon = iconfontFilter(item.icon);
            return item;
        });
    });
}
tapRefresh();
</script>
<style lang="scss" scoped>
.item-meta {
    font-size: .8rem;
    font-style: normal;
}
</style>
