<template>
    <div>
        <div class="form-ico auth-panel" v-if="input.mode == 8">
            <div class="title-bar" i18n>Two-factor authentication</div>
            <div class="zre-input-group">
                <input type="text" i18n-placeholder placeholder="Authentication code" v-model="input.twoFaCode">
                <i class="iconfont icon-shield" aria-hidden="true"></i>
            </div>


            <a @click="input.mode = 9" class="link-a" i18n>Use a recovery code or begin account recovery</a>

            <a class="btn btn-primary"  @click="tapConfirm" i18n>Verify</a>

            <div class="panel-tip" i18n>
                Open your two-factor authenticator (TOTP) app or browser extension to view your authentication code.
            </div>

        </div>

        <div class="form-ico auth-panel" v-if="input.mode == 9">
            <div class="title-bar" i18n>Use a Recovery Code</div>
            <div class="zre-input-group">
                <input type="text" i18n-placeholder placeholder="Recovery Code" v-model="input.recoveryCode">
                <i class="iconfont icon-shield" aria-hidden="true"></i>
            </div>

            <a class="btn btn-full" @click="tapConfirm" i18n>Verify</a>

            <div class="panel-tip" i18n>
                If you are unable to access your two-factor device, enter one of your recovery code to verify your identity
            </div>

        </div>
    </div>
</template>
<script setup lang="ts">
import { reactive } from 'vue';

const input = reactive({
    mode: 0,
    twoFaCode: '',
    recoveryCode: ''
});

function tapConfirm() {
    
}

</script>
<style lang="scss" scoped>
@import '../../../assets/css/theme';
.auth-panel {
    .title-bar {
        padding: 1rem 0;
        text-align: center;
        font-size: 1.5rem;
    }
    .panel-tip {
        margin: 1rem 0;
    }
    .btn {
        margin-top: 1rem;
    }
}
</style>