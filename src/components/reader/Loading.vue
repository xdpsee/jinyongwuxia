<template>
    <div class="load-indicator" v-show="showing">
        <img src="/static/ajax-loader.gif" alt="正在加载,请稍后">
        <span v-show="showError" :style="{color: theme.body.color}">加载失败,请刷新页面重试!</span>
    </div>
</template>

<script>
    export default {
        name: 'EPubBookLoading',
        props: {
            showing: {
                type: Boolean,
                default: false
            },
            showError: {
                type: Boolean,
                default: false
            },
            theme: {
                type: Object,
                default: {}
            }
        }
    }
</script>

<style lang="scss" scoped>
    @import "../../assets/styles/global";
    .load-indicator {
        position: absolute;
        left: 50%;
        top: px2rem(300);
        z-index: 200;
        width: px2rem(200);
        height: px2rem(200);
        margin-left: px2rem(-100);
        margin-top: px2rem(-100);
        text-align: center;
        img {
            width: px2rem(60);
            height: px2rem(60);
        }
        span {
            display: block;
            font-size: px2rem(16);
            font-weight: bold;
            margin-top: px2rem(20);
        }

    }
</style>
