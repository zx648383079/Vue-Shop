<template>
    <div>
        <div class="has-header">
            <div class="swipe-box address-list">
                <?php foreach(range(1, 5) as $item):?>
                <div class="swipe-row">
                    <div class="swipe-content address-item">
                        <div class="address-first">
                            <span>系</span>
                        </div>
                        <div class="address-info">
                            <h3>213213213123</h3>
                            <p>
                                <?=date('Y-m-d H:i:s')?>
                            </p>
                        </div>
                    </div>
                    <div class="actions-right">
                        <i class="fa fa-trash"></i>
                    </div>
                </div>
                <?php endforeach;?>
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
