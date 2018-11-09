<template>
    <div class="menu-bar">
        <transition name="slide-up">
            <div class="menu-wrapper" v-show="showing" :style="{background: theme.body.background}" :class="{'hide-box-shadow': isSettingShowing||!showing}">
                <div class="icon-wrapper" @click="brightnessClicked($event)">
                    <span class="iconfont icon icon-brightness" :style="{color: theme.body.color}"></span>
                </div>
                <div class="icon-wrapper">
                    <span class="iconfont icon icon-progress" :style="{color: theme.body.color}"></span>
                </div>
                <div class="icon-wrapper">
                    <span class="iconfont icon icon-font" :style="{color: theme.body.color}"></span>
                </div>
                <div class="icon-wrapper" @click="toggleSetting($event)">
                    <span class="iconfont icon icon-font-size" :style="{color: theme.body.color}"></span>
                </div>
            </div>
        </transition>
        <transition name="slide-up">
            <div class="setting-wrapper" v-show="isSettingShowing" :style="{background: theme.body.background, color: theme.body.color}">
                <div class="font-size-wrapper">
                    <div class="min-indicator" :style="{'font-size': fontSizes[0] + 'px'}">A</div>
                    <div class="option" v-for="size in fontSizes" :key="size"
                         @click="onFontSizeClicked($event,size)">
                        <div class="slide-a" v-show="size !== fontSizes[0]"></div>
                        <div class="slide-b"
                             v-show="size !== fontSizes[fontSizes.length - 1]"></div>
                        <div class="mark"></div>
                        <div class="thumb" v-show="size === defaultFontSize">
                            <div class="pointer"></div>
                        </div>
                    </div>
                    <div class="max-indicator" :style="{'font-size': fontSizes[fontSizes.length - 1] + 'px'}">
                        A
                    </div>
                </div>
            </div>
        </transition>
    </div>

</template>

<script>
    export default {
        name: 'MenuBar',
        props: {
            showing: {
                type: Boolean,
                default: true
            },
            fontSizes: {
                type: Array,
                default: () => []
            },
            defaultFontSize: {
                type: Number,
                default: 20
            },
            theme: {
                type: Object,
                default: {}
            }
        },
        data () {
            return {
                isSettingShowing: false
            }
        },
        methods: {
            brightnessClicked (event) {
                event.preventDefault()
                this.$emit('event-brightness-click')
            },
            toggleSetting (event) {
                event.preventDefault()
                if (this.isSettingShowing === true) {
                    this.isSettingShowing = false
                } else {
                    this.isSettingShowing = true
                }
            },
            hideSetting () {
                this.isSettingShowing = false
            },
            onFontSizeClicked (event, fontSize) {
                event.preventDefault()
                this.$emit('event-font-size-select', fontSize)
            }
        }
    }
</script>

<style lang="scss" scoped>
    @import "../../assets/styles/global";

    .menu-bar {
        .menu-wrapper {
            position: absolute;
            left: 0;
            bottom: 0;
            z-index: 200;
            width: 100%;
            height: px2rem(48);
            background: white;
            box-shadow: 0 px2rem(-8) px2rem(8) rgba(0, 0, 0, 0.15);
            display: flex;
            .icon-wrapper {
                flex: 1;
                @include center;
            }
            &.hide-box-shadow {
                box-shadow: none;
            }
        }
        .setting-wrapper {
            position: absolute;
            bottom: px2rem(48);
            left: 0;
            width: 100%;
            z-index: 100;
            height: px2rem(60);
            background: white;
            box-shadow: 0 px2rem(-8) px2rem(8) rgba(0, 0, 0, 0.2);
            .font-size-wrapper {
                display: flex;
                justify-content: space-around;
                align-items: center;
                width: 100%;
                height: 100%;
                .min-indicator {
                    width: px2rem(60);
                    text-align: right;
                    font-weight: bold;
                }
                .max-indicator {
                    width: px2rem(60);
                    text-align: left;
                    font-weight: bold;
                }
                .option {
                    flex: 1;
                    height: 100%;
                    display: flex;
                    align-items: center;
                    position: relative;
                    cursor: pointer;
                    .slide-a {
                        position: absolute;
                        width: 50%;
                        height: 0;
                        border-top: lightgray thin solid;
                    }
                    .slide-b {
                        position: absolute;
                        width: 50%;
                        margin-left: 50%;
                        height: 0;
                        border-top: lightgray thin solid;
                    }
                    .mark {
                        position: absolute;
                        left: 50%;
                        width: px2rem(1);
                        height: px2rem(10);
                        background: lightgray;
                    }
                    .thumb {
                        position: absolute;
                        left: 50%;
                        width: px2rem(24);
                        height: px2rem(24);
                        margin-left: px2rem(-12);
                        border-radius: px2rem(12);
                        background: white;
                        border: lightgrey thin solid;
                        box-shadow: 0 px2rem(8) px2rem(8) rgba(0, 0, 0, 0.2);
                        .pointer {
                            background: #333333;
                            margin-left: px2rem(9);
                            margin-top: px2rem(9);
                            width: px2rem(6);
                            height: px2rem(6);
                            border-radius: px2rem(3);
                        }
                    }
                }
            }
        }
    }
</style>
