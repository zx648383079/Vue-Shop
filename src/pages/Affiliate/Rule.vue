<template>
    <div>
        <BackHeader :title="$route.meta.title"/>
        <div class="has-header">

        </div>
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
export default class Rule extends Vue {

}
</script>
<style lang="scss" scoped>

</style>
