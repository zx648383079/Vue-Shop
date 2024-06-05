<template>
    <div class="agreement-outline">
        <a @click="visible = true">
            <slot></slot>
        </a>
        <div class="agreement-dialog" v-if="visible">
            <div class="title">精简注册协议</div>
            <div class="content">
                <p>本程序使用过程中产生的数据仅对本人公开，不会对外公布，但会存储了服务器，直到用户注销，用户产生的数据都会被删除。</p>

                <p class="link-more">
                    <a @click="tapAgreement">查看完整协议</a>
                    <i class="iconfont icon-arrow-right"></i>
                </p>
            </div>
            <div class="footer">
                <div class="btn btn-primary" @click="tapConfirm">我已阅读并同意协议</div>
            </div>
        </div>
    </div>
</template>
<script setup lang="ts">
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { useAuth } from '../../../services';

const router = useRouter();
const auth = useAuth();
const emit = defineEmits(['confirm']);
const visible = ref(false);

function tapConfirm() {
    visible.value = false;
    emit('confirm');
}

function tapAgreement() {
    router.push({name: 'browser', query: {url: auth.assetUri('agreement') as string, title: '服务协议'}});
}
</script>
<style lang="scss" scoped>
@import '../../../assets/css/theme';
.agreement-outline {
    display: inline-block;
    a {
        cursor: pointer;
    }
}

.link-more {
    margin: 3rem 0;
    text-align: right;
    color: var(--#{$prefix}-primary);
}
.agreement-dialog {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: var(--#{$prefix}-panel);
    z-index: 99;
    .title {
        text-align: center;
        margin-bottom: 0;
        line-height: 60px;
    }
    .content {
        padding: 10px;
        text-align: left;
    }
    .footer {
        height: auto;
        margin-top: 1.875rem;
        text-align: center;
        .btn {
            display: inline-block;
            margin-bottom: 0;
        }
    }

}
</style>