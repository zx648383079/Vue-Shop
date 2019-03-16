<template>
    <div>
        <BackHeader :title="$route.meta.title">
            <a class="right" @click="tapSubmit">
                <i class="fa fa-check"></i>
            </a>
        </BackHeader>
        <div class="has-header">
            <form class="form-inline" data-type="ajax" action="<?=$this->url('./mobile/address/save')?>" method="post">
                <div class="input-group">
                    <input type="text" name="name" placeholder="收货人" required  value="<?=$model->name?>">
                </div>
                <div class="input-group">
                    <input type="text" name="tel" placeholder="手机号" required value="<?=$model->tel?>">
                </div>
                <div class="input-group region-box">
                    <span>地址</span>
                    <input type="hidden" name="region_id" value="<?=$model->region_id ?: 1?>">
                </div>
                <div class="input-group">
                    <textarea name="address" placeholder="详细地址" required><?=$model->address?></textarea>
                </div>

                <div class="input-radio">
                    <span>设为默认地址</span>
                    <i class="fa toggle-box"></i>
                </div>

                <input type="hidden" name="id" value="<?=$model->id?>">
            </form>
        </div>

        <div class="fixed-footer">
            <button class="btn" type="button">删除地址</button> 
        </div>

    </div>
</template>
<script lang="ts">
import { Vue, Component, Prop, Emit } from 'vue-property-decorator';
import { IAddress } from '@/api/model';
import { getAddressList, deleteAddress, getAddress } from '@/api/address';
import BackHeader from '@/components/BackHeader.vue';

@Component({
    components: {
        BackHeader,
    }
})
export default class Edit extends Vue {

    address: IAddress = {
        id: 0,
        name: '',
        tel: '',
        region_id: 0,
        region_name: '',
        address: '',
    };

    created() {
        const id = parseInt(this.$route.params.id);
        if (!id) {
            return;
        }
        getAddress(id).then(res => {
            this.address = res;
        });
    }

    tapSubmit() {

    }
}
</script>
<style lang="scss" scoped>

</style>
