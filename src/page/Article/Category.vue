<template>
    <div>
        <div class="has-header">
            <div class="article-box">
                <dl class="article-item" v-for="(item, index) in items" :key="index">
                    <dt><a href="http://zodream.localhost/blog/detail?id=16">CentOs 7 安装apche php mysql</a>
                        <span class="book-time">2018-06-20 12:47:23</span></dt>
                    <dd>
                        <p>CentOs 7 安装apche php mysql,yum 安装，源码安装</p>
                        <span class="author"><i class="fa fa-edit"></i><b>admin</b></span>
                        <span class="category"><i class="fa fa-bookmark"></i><b>其他</b></span>
                        <span class="comment"><i class="fa fa-comments"></i><b>0</b></span>
                        <span class="agree"><i class="fa fa-thumbs-o-up"></i><b>0</b></span>
                        <span class="click"><i class="fa fa-eye"></i><b>31</b></span>
                    </dd>
                </dl>

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
