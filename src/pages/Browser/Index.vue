<template>
    <div>
        <BackHeader :title="title"/>
        <iframe id="iframe" class="content-wrapper" :style="getFrameStyle" :src="getUrl"></iframe>

    </div>
</template>
<script lang="ts">
import { Vue, Component, Prop, Emit } from 'vue-property-decorator';
import BackHeader from '@/components/BackHeader.vue';

@Component({
    components: {
        BackHeader,
    },
})
export default class Index extends Vue {
    public title = '';
    public height = 0;

    
    public get getUrl() : string {
        return this.$route.query.url as string;
    }

    
    public get getFrameStyle() {
        return {
            height: this.height + 'px',
        };
    }
    
    public mounted() {
        this.height = document.body.scrollHeight - 44;
        let iframe = document.getElementById("iframe") as HTMLIFrameElement;
        let title = this.$route.query.title;
        if (title && title.length) {
            this.title = title.toString();
            return;
        }
        this.title = (iframe.contentWindow as Window).document.title;
    }
}
</script>
<style lang="scss" scoped>
</style>
