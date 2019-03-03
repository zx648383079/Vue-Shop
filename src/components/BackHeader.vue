<template>
    <div>
        <header class="top fixed">
            <a class="back" @click="tapBack">
                <i class="fa fa-chevron-left" aria-hidden="true"></i>
            </a>
            <span class="title">
                {{ title }}
            </span>
            <slot></slot>
        </header>
    </div>
</template>
<script>
import {
    showBack
} from '@/utils';
export default {
    data() {
        return {
            status: false
        }
    },
    props: {
        title: String
    },
    mounted: function () {
      showBack(status => {
        this.Status = status;
      })
    },
    methods: {
        tapBack() {
            let times = setInterval(() => {
                let top = document.body.scrollTop | document.documentElement.scrollTop;
                if (top <= 0) {
                    clearInterval(times);
                }
                document.body.scrollTop = top - (top / 50);
                document.documentElement.scrollTop = top - (top / 50);
            }, 1)
            document.addEventListener('touchstart', () => {
                clearInterval(times);
            }, {
                passive: true
            })

            document.addEventListener('touchmove', () => {
                clearInterval(times);
            }, {
                passive: true
            })
        }
    }
}
</script>
