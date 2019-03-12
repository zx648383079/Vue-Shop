<template>
    <div>
      <div class="has-header">
            <div class="swipe-box address-list">
                <div class="swipe-row" v-for="(item, index) in items" :key="index">
                    <div class="swipe-content address-item<?=$selected == $item->id ? ' selected' : ''?>">
                        <div class="address-first">
                            <span><?=$item->name?></span>
                        </div>
                        <div class="address-info">
                            <p>
                                <span class="name"><?=$item->name?></span>
                                <span class="tel"><?=$item->tel?></span>
                            </p>
                            <p>
                                <span class="default">默认</span>
                                <span><?=$item->region->full_name?> <?=$item->address?></span>    
                            </p>
                        </div>
                    </div>
                    <div class="actions-right">
                        <a href="<?=$this->url('./mobile/address/edit', ['id' => $item->id])?>">
                            <i class="fa fa-edit"></i>
                        </a>
                        <i class="fa fa-trash"></i>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script lang="ts">
import { Vue, Component, Prop, Emit } from 'vue-property-decorator';

@Component
export default class Index extends Vue {

}
</script>
<style lang="scss" scoped>

</style>
