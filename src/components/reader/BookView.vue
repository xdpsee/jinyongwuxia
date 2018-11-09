<template>
    <div class="ebook-view">
        <div class="nav-prev" @click.stop="clickLeftNav" :style="{color: theme.body.color, background: theme.body.background}">
            <div class="nav-prev-wrapper">
                <div class="icon-wrapper" @click.stop.prevent="onTocClick">
                    <span id="icon-toc" class="iconfont icon icon-menu" :style="{color: theme.body.color}"></span>
                </div>
                <img src="/static/prev.png" v-show="navShow"/>
            </div>
        </div>
        <div id="content"></div>
        <div class="mask" @click.stop.prevent="clickPage"></div>
        <div class="nav-next" @click.stop.prevent="clickRightNav" :style="{color: theme.body.color, background: theme.body.background}">
            <img src="/static/next.png" v-show="navShow"/>
        </div>
    </div>
</template>

<script>
    import TitleBar from './TitleBar'
    import ProgressBar from './ProgressBar'

    export default {
        name: 'EPubBookView',
        components: {TitleBar, ProgressBar},
        comments: {TitleBar, ProgressBar},
        props: {
            navShow: {
                type: Boolean,
                default: false
            },
            theme: {
                type: Object,
                default: {}
            }
        },
        methods: {
            render (epub) {
                return epub.renderTo('content')
            },
            onTocClick () {
                this.$emit('event-toc-toggle')
            },
            clickLeftNav () {
                this.$emit('event-page-prev')
            },
            clickRightNav () {
                console.log('click next')
                this.$emit('event-page-next')
            },
            clickPage () {
                console.log('click page')
                this.$emit('event-page-click')
            }
        }
    }
</script>

<style lang="scss" scoped>
    @import "../../assets/styles/global";

    .ebook-view {
        width: 100%;
        height: 100%;
        .nav-prev {
            position: absolute;
            top: 0;
            left: 0;
            bottom: 0;
            z-index: 100;
            width: px2rem(42);
            .nav-prev-wrapper {
                height: 100%;
                .icon-wrapper {
                    position: absolute;
                    top: 0;
                    width: 100%;
                    height: px2rem(42);
                    text-align: center;
                    cursor: pointer;
                }
                img {
                    position: absolute;
                    top: 50%;
                    padding-top: px2rem(-12);
                    width: px2rem(24);
                    height: px2rem(24);
                    margin-left: px2rem(8);

                }
            }
        }
        .nav-next {
            position: absolute;
            top: 0;
            right: 0;
            bottom: 0;
            z-index: 100;
            width: px2rem(42);
            text-align: center;
            img {
                position: absolute;
                top: 50%;
                width: px2rem(24);
                height: px2rem(24);
                padding-top: px2rem(-12);
                margin-left: px2rem(-10);
            }
        }
        #content {
            position: absolute;
            top: 0;
            left: px2rem(43);
            right: px2rem(43);
            bottom: 0;
            z-index: 99;
        }
        .mask {
            position: absolute;
            top: 0;
            left: px2rem(43);
            right: px2rem(43);
            bottom: 0;
            z-index: 100;
        }
    }


</style>
