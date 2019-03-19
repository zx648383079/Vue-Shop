<template>
    <div @click="tapClick">
        <div class="address-box" v-if="address">
            <i class="fa fa-map-marker"></i>
            <p>
                <a >
                    <span class="name">{{ address.name }}</span>
                    <span class="tel">{{ address.tel }}</span>
                </a>
            </p>
            <p>{{ address.region.full_name }} {{ address.address }}</p>
            <i class="fa fa-chevron-right"></i>
        </div>
        <div class="address-box empty-address" v-else>
            <i class="fa fa-map-marker"></i>
            <h3>
                <a>请选择地址</a>
            </h3>
            <i class="fa fa-chevron-right"></i>
        </div>
    </div>
</template>
<script lang="ts">
import { Vue, Component, Prop, Emit } from 'vue-property-decorator';
import { IAddress } from '@/api/model';

@Component
export default class AddressLine extends Vue {
    @Prop(Object) readonly address?: IAddress;

    @Emit('click')
    tapClick() {
    }
}
</script>
<style lang="scss" scoped>
.address-box {
    background-color: #fff;
}
</style>