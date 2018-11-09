<template>
    <div class="title-bar-wrapper" v-show="showing">
        <div class="icon-wrapper">
            <span id="icon-toc" class="iconfont icon icon-menu" :style="{color: theme.body.color}" @click="onIconClick($event)"></span>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'TitleBar',
        props: {
            showing: {
                type: Boolean,
                default: false
            },
            title_text: {
                type: String,
                default: ''
            }
        },
        methods: {
            onIconClick (event) {
                if (event.target.id === "icon-toc") {
                    this.$emit('event-icon-menu-click')
                }
                if (event.target.id === "icon-about") {
                    this.$emit('event-icon-about-click')
                }
            }
        }
    }
</script>

<style lang="scss" scoped>
    @import "../../assets/styles/global";
    .title-bar-wrapper {
        position: absolute;
        width: 100%;
        height: px2rem(48);
        z-index: 200;
        display: flex;
        align-items: center;
        .icon-wrapper {
            width: px2rem(48);
            height: 100%;
            text-align: center;
            cursor: pointer;
        }
    }
</style>
