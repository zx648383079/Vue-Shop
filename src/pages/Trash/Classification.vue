<template>
    <div>
        <BackHeader :title="this.$route.meta.title"></BackHeader>
        <div class="has-header">
            
        </div>
    </div>
</template>
<script lang="ts">
import { Vue, Component, Prop, Emit } from 'vue-property-decorator';

interface TrashClassification {
    name: string,
    image: string,
    introduce: string,
    contain: string,
    standard: string|string[]
}

@Component
export default class Classification extends Vue {

    public created() {
    }
}
</script>
<style lang="scss" scoped>

</style>
