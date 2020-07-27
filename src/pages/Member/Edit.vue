<template>
    <div>
        <BackHeader :title="$route.meta.title"/>
        <div class="has-header">
            <form class="form-inline" method="post" @submit="tapSubmit">
                <div class="input-box">
                    <input type="text" :placeholder="title" required  v-model="value">
                </div>

                <button class="btn btn-primary">确定</button>
            </form>
        </div>
    </div>
</template>
<script lang="ts">
import { Vue, Component, Prop, Emit } from 'vue-property-decorator';
import BackHeader from '@/components/BackHeader.vue';
import Toast from '@/components/toast.ts';
import { updatePassword, updateProfile } from '../../api/user';
import { dispatchUser, dispatchSetUser } from '@/store/dispatches';
import { IUser } from '../../api/model';

const PROFILE_NAMES: any = {
    name: '昵称',
};

@Component({
    components: {
        BackHeader,
    },
})
export default class Edit extends Vue {
    public field = 'name';
    public value = '';
    public title = '昵称';
    public user: IUser | null = null;

    public created() {
        this.field = this.$route.params.field || 'name';
        this.title = PROFILE_NAMES.hasOwnProperty(this.field) ? PROFILE_NAMES[this.field]  : '信息';
        dispatchUser().then(res => {
            if (!res) {
                this.$router.back();
                return;
            }
            this.user = res;
            this.value = res.hasOwnProperty(this.field) ? (res as any)[this.field]  : '';
        });
    }

    /**
     * tapSubmit
     */
    public tapSubmit() {
        if (this.value.length < 2) {
            Toast('请输入' + this.title + '！');
            return;
        }
        updateProfile({
            [this.field]: this.value,
        }).then(res => {
            dispatchSetUser(res).then(() => {
                this.$router.back();
            });
        });
    }
}
</script>
<style lang="scss" scoped>
</style>
