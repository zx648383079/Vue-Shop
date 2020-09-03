<template>
    <div>
        <LargeHeader :title="$route.meta.title" @submited="tapSubmit()"/>
        <div >
            <div class="input-box">
                <input type="password" placeholder="旧密码" required  v-model="oldpassword">
            </div>
            <div class="input-box">
                <input type="password" placeholder="新密码" required v-model="password">
            </div>
            <div class="input-box">
                <input type="password" placeholder="确认新密码" required v-model="repassword">
            </div>
        </div>
    </div>
</template>
<script lang="ts">
import { Vue, Component, Prop, Emit } from 'vue-property-decorator';
import LargeHeader from '@/components/LargeHeader.vue';
import Toast from '@/components/toast.ts';
import { updatePassword } from '../../api/user';
import { dispatchLogout } from '../../store/dispatches';

@Component({
    components: {
        LargeHeader,
    },
})
export default class Password extends Vue {
    public oldpassword: string = '';
    public password: string = '';
    public repassword: string = '';

    /**
     * tapSubmit
     */
    public tapSubmit() {
        if (this.password !== this.repassword) {
            Toast('确认密码不一致！');
            return;
        }
        updatePassword(this.oldpassword, this.password, this.repassword).then(res => {
            dispatchLogout().then(() => {
                this.$router.push('/login');
            });
        });
    }
}
</script>
<style lang="scss" scoped>
</style>
