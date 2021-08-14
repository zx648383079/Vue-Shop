<template>
    <div>
        <div class="time-bar" v-if="status < 2">
            <span v-if="status < 1">距结束</span>
            <span v-if="status == 1">距开始</span>
            <em>{{ hour }}</em>:
            <em>{{ minute }}</em>:
            <em>{{ second }}</em>
        </div>
        <span v-if="status > 1">已结束</span>
    </div>
</template>
<script lang="ts">
import { Vue, Prop, Watch } from 'vue-property-decorator';
import { parseDate } from '@/utils';

export default class TimeTip extends Vue {

    @Prop([Date, String]) public readonly start!: string|Date;
    @Prop([Date, String]) public readonly end!: string|Date;

    public status = 0;
    public hour = 0;
    public minute = 0;
    public second = 0;
    private handle = 0;

    @Watch('start')
    public onStartChange() {
        this.begin();
    }

    @Watch('end')
    public onEndChange() {
        this.begin();
    }

    /**
     * refresh
     */
    public begin() {
        this.stop();
        const start = parseDate(this.start);
        const end = parseDate(this.end);
        this.handle = window.setInterval(() => {
            const now = new Date();
            if (end < now) {
                this.status = 2;
                this.stop();
                return;
            }
            if (start > now) {
                this.status = 1;
                this.setTimer(start, now);
                return;
            }
            this.status = 0;
            this.setTimer(start, now);
        }, 500);
    }

    public stop() {
        if (this.handle > 0) {
            clearInterval(this.handle);
        }
        this.handle = 0;
    }

    private setTimer(to: Date, from: Date) {
        const diff = Math.floor((to.getTime() - from.getTime()) / 1000);
        this.hour = Math.floor(diff / 3600);
        this.minute = Math.floor(diff % 3600 / 60);
        this.second = diff % 3600 % 60;
    }
}
</script>
<style lang="scss" scoped>
.time-bar {
    em {
        font-style: normal;
        background-color: #000;
        color: #fff;
        border-radius: 4px;
        padding: 0 2px;
    }
}
</style>