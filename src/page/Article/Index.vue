<template>
    <div>
        <div class="has-header">
            <div class="item-list">
                <a v-for="(item, index) in items" :key="index" href="<?=$this->url('./mobile/article/category', ['id' => $item->id])?>">
                    <?=$item->name?>
                    <i class="fa fa-chevron-right" aria-hidden="true"></i>
                </a>

            </div>
            
        </div>
    </div>
</template>
<script>
export default {
    data() {
        return {
            items: [

            ]
        }
    },
    created() {

    },
    methods: {

    }
}
</script>
<style lang="scss" scoped>

</style>
