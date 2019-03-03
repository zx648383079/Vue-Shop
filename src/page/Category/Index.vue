<template>
    <div>
        <div class="has-header has-footer category-page">
            <div class="category-menu">
                <?php foreach($cat_list as $item):?>
                <div class="menu-item"><?=$item->name?></div>
                <?php endforeach;?>
            </div>

            <div class="category-main">
                <?php foreach($cat_list as $item):?>
                <div class="item active lazy-loading" data-url="<?=$this->url('./mobile/category/children', ['id' => $item->id])?>">
                    <div class="banner">
                        <img src="<?=$category->app_banner?>" alt="">
                    </div>
                    <div class="header">
                        <a href="<?=$this->url('./mobile/search', ['cat_id' => $category->id])?>"><?=$category->name?></a>
                    </div>
                    <div class="goods-list">
                        <?php foreach($hot_list as $item):?>
                        <div class="item-view">
                            <div class="item-img">
                                <a href="<?=$this->url('./mobile/goods', ['id' => $item->id])?>"><img src="<?=$item->thumb?>" alt=""></a>
                            </div>
                            <div class="item-title">
                                <?=$item->name?>
                            </div>
                            <div class="item-actions">
                                <span class="item-price"><?=$item->price?></span>
                                
                            </div>
                        </div>
                        <?php endforeach;?>
                    </div>
                    <ul class="tree-grid">
                        <?php foreach($category_tree as $item):?>
                        <li class="tree-item">
                            <a href="<?=$this->url('./mobile/search', ['cat_id' => $item['id']])?>"><?=$item['name']?></a>
                            <?php if(isset($item['children'])):?>
                            <ul class="tree-item-chidren">
                                <?php foreach($item['children'] as $it):?>
                                <li class="tree-item">
                                    <a href="<?=$this->url('./mobile/search', ['cat_id' => $it['id']])?>"><?=$it['name']?></a>
                                </li> 
                                <?php endforeach;?>
                            </ul>
                            <?php endif;?>
                        </li>
                        <?php endforeach;?>
                    </ul>
                </div>
                <?php endforeach;?>
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
