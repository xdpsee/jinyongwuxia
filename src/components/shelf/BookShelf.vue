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
    export default {
        name: 'BookShelf',
        data () {
            return {
                books: [
                    {
                        title: '飞狐外传',
                        cover: '/static/covers/FHWZ.jpg',
                        id: 'feihuwaizhuan'
                    },
                    {
                        title: '雪山飞狐',
                        cover: '/static/covers/XSFH.jpg',
                        id: 'xueshanfeihu'
                    },
                    {
                        title: '连城诀',
                        cover: '/static/covers/LCJ.jpg',
                        id: 'lianchengjue'
                    },
                    {
                        title: '天龙八部',
                        cover: '/static/covers/TLBB.jpg',
                        id: 'tianlongbabu'
                    },
                    {
                        title: '射雕英雄传',
                        cover: '/static/covers/SDYXZ.jpg',
                        id: 'shediaoyingxiongzhuan'
                    },
                    {
                        title: '白马啸西风',
                        cover: '/static/covers/BMXXF.jpg',
                        id: 'baimaxiaoxifeng'
                    },
                    {
                        title: '鹿鼎记',
                        cover: '/static/covers/LDJ.jpg',
                        id: 'ludingji'
                    },
                    {
                        title: '笑傲江湖',
                        cover: '/static/covers/XAJH.jpg',
                        id: 'xiaoaojianghu'
                    },
                    {
                        title: '书剑恩仇录',
                        cover: '/static/covers/SJECL.jpg',
                        id: 'shujianenchoulu'
                    },
                    {
                        title: '神雕侠侣',
                        cover: '/static/covers/SDXL.jpg',
                        id: 'shendiaoxialu'
                    },
                    {
                        title: '倚天屠龙记',
                        cover: '/static/covers/YTTLJ.jpg',
                        id: 'yitiantulongji'
                    },
                    {
                        title: '碧血剑',
                        cover: '/static/covers/BXJ.jpg',
                        id: 'bixuejian'
                    },
                    {
                        title: '鸳鸯刀',
                        cover: '/static/covers/YYD.jpg',
                        id: 'yuanyangdao'
                    },
                    {
                        title: '侠客行',
                        cover: '/static/covers/XKX.jpg',
                        id: 'xiakexing'
                    },
                    {
                        title: '越女剑',
                        cover: '/static/covers/YNJ.jpg',
                        id: 'yuenujian'
                    }
                ]
            }
        },
        methods: {
            loadBook (book) {
                let route = this.$router.resolve({ path: '/book', query: {id: book.id}});
                window.open(route.href, '_blank');
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
        border-top: lightgray 1px solid;
        text-align: center;
        span {
            color: gray;
            font-size: 0.2rem;
        }
    }
</style>
