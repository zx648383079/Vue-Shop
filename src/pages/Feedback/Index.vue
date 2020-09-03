<template>
    <div>
        <LargeHeader :title="$route.meta.title" @submited="tapSubmit()"/>
        <div class="input-box">
            <input type="text" placeholder="称呼" required  v-model="name">
        </div>
        <div class="input-box">
            <input type="email" placeholder="邮箱" v-model="email">
        </div>
        <div class="input-box">
            <input type="text" placeholder="联系方式" v-model="phone">
        </div>
        <div class="input-box">
            <textarea placeholder="留言内容" v-model="content"></textarea>
        </div>
    </div>
</template>
<script lang="ts">
import { Vue, Component, Prop, Emit } from 'vue-property-decorator';
import LargeHeader from '@/components/LargeHeader.vue';
import Toast from '@/components/toast.ts';
import { updatePassword, updateProfile } from '../../api/user';
import { dispatchUser, dispatchSetUser } from '@/store/dispatches';
import { IUser } from '../../api/model';
import { saveFeedback } from '@/api/account';

@Component({
    components: {
        LargeHeader,
    },
})
export default class Index extends Vue {
    public name = '';
    public email = '';
    public phone = '';
    public content = '';

    /**
     * tapSubmit
     */
    public tapSubmit() {
        const name = this.name;
        const email = this.email;
        const phone = this.phone;
        const content = this.content;
        if (this.name.length < 1) {
            Toast('请输入称呼！');
            return;
        }
        if (this.content.length < 1) {
            Toast('请输入留言内容！');
            return;
        }
        saveFeedback({name, email, phone, content}).then(_ => {
            Toast('留言成功！');
            this.$router.back();
        });
    }
}
</script>
<style lang="scss" scoped>
</style>
