<template>
    <div>
        <BackHeader :title="$route.meta.title">
            <a class="right" @click="tapSubmit">
                <i class="fa fa-check"></i>
            </a>
        </BackHeader>
        <div class="has-header">
            <form class="form-inline" method="post">
                <div class="input-group">
                    <input type="text" name="name" placeholder="收货人" required  v-model="address.name">
                </div>
                <div class="input-group">
                    <input type="text" name="tel" placeholder="手机号" required v-model="address.tel">
                </div>
                <SelectPicker :items="regions" :column="3" v-model="address.region">
                    <div class="input-group region-box">
                        <span>{{ address.region && address.region.full_name ? address.region.full_name : '地址' }}</span>
                    </div>
                </SelectPicker>
                
                <div class="input-group">
                    <textarea name="address" placeholder="详细地址" required v-model="address.address"></textarea>
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
import { IAddress, IRegionObject } from '@/api/model';
import { getRegionTree } from '@/api/region';
import { getAddressList, deleteAddress, getAddress } from '@/api/address';
import BackHeader from '@/components/BackHeader.vue';
import SelectPicker from '@/components/SelectPicker.vue';

@Component({
    components: {
        BackHeader,
        SelectPicker,
    }
})
export default class Edit extends Vue {

    address: IAddress = {
        id: 0,
        name: '',
        tel: '',
        region_id: 0,
        region_name: '',
        region: {
            id: 377,
            name: '朝阳区'
        },
        address: '',
    };

    regions: IRegionObject = {};

    created() {
        getRegionTree().then(res => {
            if (res.data) {
                this.regions = res.data;
            }
        });
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
