<template>
    <transition name="slide-right">
        <div class="toc-wrapper" :style="{background: theme.body.background, color: theme.body.color}">
            <div class="toc">
                <div class="title-wrapper" :style="{background: theme.body.background, color: theme.body.color}">
                    <span>{{title}}</span>
                    <div class="icon-wrapper" @click="onCloseClicked">
                        <span :style="{color: theme.body.color}" class="iconfont icon icon-menu"></span>
                    </div>
                </div>
                <ul class="list">
                    <li class="chapter" v-for="chapter in contents" :key="chapter.id" @click="onChapterClick(chapter)">
                        <span v-bind:class="{highlight: chapter.id === curr_chapter.id}">{{chapter.label}}</span>
                    </li>
                </ul>
            </div>
        </div>
    </transition>
</template>

<script>
    export default {
        name: 'EPubBookToc',
        props: {
            title: {
                type: String,
                default: ''
            },
            theme: {
                type: Object,
                default: {}
            },
            contents: {
                type: Array,
                default: () => {
                    return [
                        {
                            id: '1',
                            label: '好啊好啊',
                            href: 'href'
                        },
                        {
                            id: '2',
                            label: '好啊好啊',
                            href: 'href'
                        }, {
                            id: '3',
                            label: '好啊好啊',
                            href: 'href'
                        }, {
                            id: '4',
                            label: '好啊好啊',
                            href: 'href'
                        }, {
                            id: '5',
                            label: '好啊好啊',
                            href: 'href'
                        }, {
                            id: '6',
                            label: '好啊好啊',
                            href: 'href'
                        }, {
                            id: '7',
                            label: '好啊好啊',
                            href: 'href'
                        }, {
                            id: '8',
                            label: '好啊好啊',
                            href: 'href'
                        }, {
                            id: '9',
                            label: '好啊好啊',
                            href: 'href'
                        }, {
                            id: '10',
                            label: '好啊好啊',
                            href: 'href'
                        },
                    ]
                }
            },
            curr_chapter: {
                type: Object,
                default: {}
            }
        },
        methods: {
            onChapterClick (chapter) {
                this.$emit('event-toc-chapter-click', chapter)
            },
            onCloseClicked () {
                this.$emit('event-toc-close-click')
            }
        }
    }
</script>

<style lang="scss" scoped>
    @import "../../assets/styles/global";

    .toc-wrapper {
        position: absolute;
        left: 0;
        top: 0;
        bottom: 0;
        z-index: 201;
        width: px2rem(240);
        box-shadow: px2rem(8) 0 px2rem(8) rgba(0, 0, 0, .2);
        .toc {
            height: 100%;
            overflow-y: auto;
            &.toc::-webkit-scrollbar {
                width: 0 !important;
                -ms-overflow-style: none;
                overflow: -moz-scrollbars-none;
            }
            .title-wrapper {
                display: flex;
                align-items: center;
                height: px2rem(48);
                position: absolute;
                width: 100%;
                box-shadow: 0 2px 2px rgba(0, 0, 0, .1);
                span {
                    flex: 1;
                    font-size: px2rem(16);
                    font-weight: bold;
                    text-align: center;
                }
                .icon-wrapper {
                    width: px2rem(48);
                    height: 100%;
                    text-align: center;
                }
            }

            .list {
                list-style: none;
                .chapter {
                    padding-left: px2rem(6);
                    padding-right: px2rem(6);
                    line-height: px2rem(40);
                    vertical-align: middle;
                    border-bottom: lightgray thin dashed;
                    cursor: pointer;
                    span {
                        display: inline-block;
                        vertical-align: middle;
                        font-size: px2rem(13);
                        font-weight: bold;
                        &.highlight {
                            color: lightcoral;
                        }
                    }
                    &.chapter:last-child {
                        border: none;
                    }
                }
            }
        }
    }

    .slide-right-enter, .slide-right-leave-to {
        transform: translate3d(-100%, 0, 0)
    }
    .slide-right-enter-to, .slide-right-leave{
        transform: translate3d(0, 0, 0)
    }
    .slide-right-enter-active, .slide-right-leave-active {
        transition: all .3s linear;
    }
</style>
