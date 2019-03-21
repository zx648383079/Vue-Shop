<template>
    <div>
        <BackHeader title="我的资料"/>
        <div class="has-header">

            <div class="profile-box" v-if="user">
                <div class="line-item avatar-item">
                    <span>头像</span>
                    <span class="avatar">
                        <img :src="user.avatar" alt="">
                    </span>
                    <i class="fa fa-chevron-right"></i>
                </div>
                <div class="line-item">
                    <span>昵称</span>
                    <span>{{user.name}}</span>
                    <i class="fa fa-chevron-right"></i>
                </div>
                <div class="line-item">
                    <span>性别</span>
                    <span>{{user.sex}}</span>
                    <i class="fa fa-chevron-right"></i>
                </div>
                <DatePicker v-model="user.birthday" format="yyyy-mm-dd">
                    <div class="line-item">
                        <span>生日</span>
                        <span>{{user.birthday}}</span>
                        <i class="fa fa-chevron-right"></i>
                    </div>
                </DatePicker>
            </div>

            
            <div class="menu-list">
                <a @click="$router.push('/address')">
                    我的收货地址
                    <i class="fa fa-chevron-right" aria-hidden="true"></i>
                </a>
                <a @click="$router.push('/address')">
                    修改密码
                    <i class="fa fa-chevron-right" aria-hidden="true"></i>
                </a>
                <a @click="$router.push('/address')">
                    实名认证
                    <i class="fa fa-chevron-right" aria-hidden="true"></i>
                </a>
                
            </div>

            <a class="btn del-btn" @click="tapLogout">
                退出
            </a>
        </div>

    </div>
</template>
<script lang="ts">
import { Vue, Component, Prop, Emit } from 'vue-property-decorator';
import BackHeader from '@/components/BackHeader.vue';
import DatePicker from '@/components/DatePicker.vue';
import { IUser } from '@/api/model';
import { dispatchUser, dispatchLogout } from '@/store/dispatches';

@Component({
    components: {
        BackHeader,
        DatePicker,
    },
})
export default class Profile extends Vue {
    public user: IUser | null = null;

    public created() {
        dispatchUser().then(res => {
            this.user = res;
        });
    }

    public tapLogout() {
        dispatchLogout().then(() => {
            this.$router.push('/login');
        });
    }
}
</script>
<style lang="scss" scoped>

</style>
