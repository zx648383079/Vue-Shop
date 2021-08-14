<template>
    <div>
        <BackHeader :title="$route.meta.title"/>
        <div class="has-header">
            <ApplyCertification v-if="!user"></ApplyCertification>
            <div v-else>
                <div class="top-header"></div>
                <div class="user-box">
                    <div class="avatar">
                        <img :src="avatar">
                    </div>
                    <h3>您已实名制</h3>
                    <div class="name">*zz</div>
                    <div class="card">4************</div>
                    <a href="">查看详情</a>
                </div>
                <div class="menu-list">
                    <MenuItem title="上传证件" icon="fa-camera" uri="/checkin"/>
                </div>
            </div>
        </div>
    </div>
</template>
<script lang="ts">
import { Options, Vue } from 'vue-property-decorator';
import BackHeader from '@/components/BackHeader.vue';
import ApplyCertification from './Child/ApplyCertification.vue';
import { dispatchUser } from '../../store/dispatches';
import { IUser } from '../../api/model';
import MenuItem from './Child/MenuItem.vue';
import { assetsFilter } from '../../pipes';

@Options({
    components: {
        BackHeader,
        ApplyCertification,
        MenuItem,
    },
})
export default class Certification extends Vue {

    public user: IUser| null =  null;

    public get avatar() {
        return assetsFilter(this.user ? this.user.avatar : '/assets/images/avatar/1.png');
    }

    public created() {
        dispatchUser().then(res => {
            // this.user = res;
        });
    }
}
</script>
<style lang="scss" scoped>
.top-header {
    background: #05a6b1;
    color: #fff;
    height: 160px;
    padding-top: 40px;
}
.user-box {
    background-color: #fff;
    width: 300px;
    margin: -120px auto 20px;
    position: relative;
    padding: 60px 20px 20px;
    .avatar {
        border-radius: 50%;
        height: 80px;
        width: 80px;
        position: absolute;
        top: -30px;
        left: 110px;
        img {
            width: 100%;
            height: 100%;
            border-radius: 50%;
        }
    }
    .name,
    .card {
        line-height: 30px;
    }
}
</style>
