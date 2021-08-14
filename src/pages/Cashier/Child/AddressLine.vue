<template>
    <div @click="tapClick">
        <div class="address-box" v-if="address">
            <i class="iconfont fa-map-marker"></i>
            <p>
                <a >
                    <span class="name">{{ address.name }}</span>
                    <span class="tel">{{ address.tel }}</span>
                </a>
            </p>
            <p>{{ address.region?.full_name }} {{ address.address }}</p>
            <i class="iconfont fa-chevron-right"></i>
        </div>
        <div class="address-box empty-address" v-else>
            <i class="iconfont fa-map-marker"></i>
            <h3>
                <a>请选择地址</a>
            </h3>
            <i class="iconfont fa-chevron-right"></i>
        </div>
    </div>
</template>
<script lang="ts">
import { Vue, Prop, Emit } from 'vue-property-decorator';
import { IAddress } from '@/api/model';


export default class AddressLine extends Vue {
    @Prop(Object) public readonly address!: IAddress;

    @Emit('click')
    public tapClick() {
        // 
    }
}
</script>
<style lang="scss" scoped>
.address-box {
    background-color: #fff;
}
</style>