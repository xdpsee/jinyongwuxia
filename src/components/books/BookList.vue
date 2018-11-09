<template>
    <div>
        <div class="title-bar">
            <img class="stamp" src="/static/jinyong.png">
            <img class="logo" src="/static/logo.png">
        </div>
        <div class="title-space"></div>
        <div class="book-list">
            <div class="book-wrapper" v-for="book in books" :key="book.url">
                <div class="book" @click="loadBook(book)">
                    <img :src="book.cover" :alt="book.title" class="cover">
                </div>
            </div>
        </div>
        <div class="footer">
            <span>金庸武侠 1924年3月10日—2018年10月30日</span>
        </div>
    </div>
</template>

<script>
    import router from '../../router'

    export default {
        name: 'BookList',
        data () {
            return {
                books: [
                    {
                        title: '飞狐外传',
                        cover: '/static/covers/FHWZ.jpg',
                        url: '/book/feihuwaizhuan'
                    },
                    {
                        title: '雪山飞狐',
                        cover: '/static/covers/XSFH.jpg',
                        url: '/book/xueshanfeihu'
                    },
                    {
                        title: '连城诀',
                        cover: '/static/covers/LCJ.jpg',
                        url: '/book/lianchengjue'
                    },
                    {
                        title: '天龙八部',
                        cover: '/static/covers/TLBB.jpg',
                        url: '/book/tianlongbabu'
                    },
                    {
                        title: '射雕英雄传',
                        cover: '/static/covers/SDYXZ.jpg',
                        url: '/book/shediaoyingxiongzhuan'
                    },
                    {
                        title: '白马啸西风',
                        cover: '/static/covers/BMXXF.jpg',
                        url: '/book/baimaxiaoxifeng'
                    },
                    {
                        title: '鹿鼎记',
                        cover: '/static/covers/LDJ.jpg',
                        url: '/book/ludingji'
                    },
                    {
                        title: '笑傲江湖',
                        cover: '/static/covers/XAJH.jpg',
                        url: '/book/xiaoaojianghu'
                    },
                    {
                        title: '书剑恩仇录',
                        cover: '/static/covers/SJECL.jpg',
                        url: '/book/shujianenchoulu'
                    },
                    {
                        title: '神雕侠侣',
                        cover: '/static/covers/SDXL.jpg',
                        url: '/book/shendiaoxialu'
                    },
                    {
                        title: '倚天屠龙记',
                        cover: '/static/covers/YTTLJ.jpg',
                        url: '/book/yitiantulongji'
                    },
                    {
                        title: '碧血剑',
                        cover: '/static/covers/BXJ.jpg',
                        url: '/book/bixuejian'
                    },
                    {
                        title: '鸳鸯刀',
                        cover: '/static/covers/YYD.jpg',
                        url: '/book/yuanyangdao'
                    },
                    {
                        title: '侠客行',
                        cover: '/static/covers/XKX.jpg',
                        url: '/book/xiakexing'
                    },
                    {
                        title: '越女剑',
                        cover: '/static/covers/YNJ.jpg',
                        url: '/book/yuenujian'
                    },
                    {
                        title: '金刚经',
                        cover: '/static/covers/jingangjing.jpg',
                        url: '/book/jingangjing'
                    }
                ]
            }
        },
        methods: {
            loadBook (book) {
                router.push(book.url)
            }
        }
    }
</script>

<style lang="scss" scoped>
    @import '../../assets/styles/global';

    .title-bar {
        position: fixed;
        width: 100%;
        height: px2rem(60);
        background: white;
        border-bottom: lightgrey thin solid;
        box-shadow: 0 px2rem(8) px2rem(8) rgba(0, 0, 0, 0.2);
        vertical-align: center;
        .stamp {
            margin: px2rem(10) px2rem(0) px2rem(10) px2rem(10);
            height: px2rem(40);
        }
        .logo {
            margin: px2rem(17) px2rem(0) px2rem(17) px2rem(0);
            height: px2rem(26);
        }
    }

    .title-space {
        width: 100%;
        height: px2rem(60);
    }

    .book-list {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(px2rem(120), auto));
        grid-template-rows: px2rem(180);
        grid-auto-rows: px2rem(180);
        grid-row-gap: px2rem(10);
        margin: 2px 5px 0 5px;
        .book-wrapper {
            justify-self: center;
            width: px2rem(120);
            height: px2rem(180);
            background-size: px2rem(200);
            box-shadow: 0 px2rem(8) px2rem(8) rgba(0, 0, 0, .2);
            margin: px2rem(10) auto;
            .book {
                width: 100%;
                height: 100%;
                .cover {
                    width: 100%;
                    height: 100%;
                }
                &.book:hover {
                    cursor: pointer;
                }
            }
        }
    }

    .footer {
        width: 100%;
        height: px2rem(50);
        margin-top: px2rem(40);
        border-top: lightgray thin solid;
        text-align: center;
        span {
            color: gray;
            font-size: 0.3rem;
        }
    }
</style>
