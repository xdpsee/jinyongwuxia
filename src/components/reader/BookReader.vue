<template>
    <div class="ebook-wrapper" :style="{background: currTheme.body.background}">
        <EPubBookToc v-show="isShowToc" :title="book.title" :contents="toc" :curr_chapter="currChapter"
                     @event-toc-chapter-click="chapterSelect" @event-toc-close-click="toggleToc"
                     :theme="currTheme">
        </EPubBookToc>
        <EPubBookView ref="bookView" @event-toc-toggle="toggleToc"
                      @event-page-prev="prevPage"
                      @event-page-next="nextPage"
                      @event-page-click="pageClick"
                      @event-setting-click="settingOpen" :nav-show="!isShowLoading" :theme="currTheme">
        </EPubBookView>
        <EPubBookLoading :showing="isShowLoading" :showError="isShowLoadError"
                         :theme="this.currTheme"></EPubBookLoading>
        <MenuBar ref="menuBar" :showing="isShowMenu" :theme="currTheme" :font-sizes="fontSizes" :default-font-size="currFontSize"
                 @event-font-size-select="fontSizeSelect"></MenuBar>
    </div>
</template>

<script>
    import Epub from 'epubjs'
    import MenuBar from './MenuBar'
    import TocBar from './TocBar'
    import BookView from './BookView'
    import Loading from './Loading'
    import LocalForage from 'localforage'

    export default {
        name: 'BookReader',
        components: {MenuBar, EPubBookToc: TocBar, EPubBookView: BookView, EPubBookLoading: Loading},
        data () {
            return {
                themes: {
                    WHITE: {
                        body: {
                            color: '#000000',
                            background: '#ffffff'
                        },
                        name: 'WHITE'
                    },
                    BEIGE: {
                        body: {
                            color: '#000000',
                            background: '#f3e8d2'
                        },
                        name: 'BEIGE'
                    },
                    NIGHT: {
                        body: {
                            color: '#ffffff',
                            background: '#4a4a4a'
                        },
                        name: 'NIGHT'
                    }
                },
                currTheme: {
                    body: {
                        color: '#000000',
                        background: '#ffffff'
                    },
                    name: 'WHITE'
                },
                fontSizes: [18, 20, 22, 24, 26, 28, 30],
                currFontSize: 20,
                book: {
                    title: ''
                },
                isShowToc: false,
                isShowMenu: false,
                isShowLoading: true,
                isShowLoadError: false,
                ePub: null,
                redition: null,
                toc: [],
                currChapter: {},
                isReady: false,

            }
        },
        mounted () {
            let path = '/static/epubs/' + this.$route.params.id + '.epub'
            this.ePub = new Epub({restore: true})
            this.ePub.loaded.metadata.then((meta) => {
                this.book.title = meta.title
                console.log('load meta')
            })

            this.initReader(path)

            this.ePub.loaded.navigation.then(({toc}) => {
                this.toc = toc
                console.log('load toc')
                this.initLocation()
            })

        },
        methods: {
            toggleToc () {
                if (this.isShowMenu) {
                    this.isShowMenu = false
                    this.$refs.menuBar.hideSetting()
                } else {
                    this.isShowToc = !this.isShowToc
                }
            },
            chapterSelect (chapter) {
                if (chapter.id !== this.currChapter.id) {
                    this.currChapter = chapter
                    this.isShowToc = false
                    setTimeout(() => {
                        this.isShowLoading = true
                        this.redition.display(chapter.href).then(() => {
                            this.isShowLoading = false
                        }, () => {
                            this.isShowLoading = false
                            this.isShowLoadError = true
                        })
                    }, 300)
                }
            },
            initReader (path) {
                console.log('init reader')
                this.ePub.open(path).then(() => {
                    this.redition = this.$refs.bookView.render(this.ePub)
                    this.redition.themes.register(this.themes)
                    this.redition.themes.fontSize(this.currFontSize + 'px')
                    this.themeSelect(this.currTheme.name)

                    document.addEventListener('keyup', this.onKeyUp)
                }, () => {
                    this.isShowLoadError = true
                })
            },
            initLocation () {
                console.log('init location')
                this.loadLocation()
                this.ePub.ready.then(() => {
                    return this.ePub.locations.generate()
                }).then((locations) => {
                    this.locations = locations
                    this.isReady = true
                    this.redition.on('relocated', (location) => {
                        this.saveLocation(location)
                    })
                })
            },
            loadLocation () {
                console.log('load location')
                LocalForage.getItem('chapter-' + this.$route.params.id).then((value) => {
                    let chapter = this.toc.find(e => e.href === value)
                    if (chapter) {
                        this.currChapter = chapter
                    } else {
                        this.currChapter = this.toc[0]
                    }
                })
                LocalForage.getItem('location-' + this.$route.params.id).then((cfi) => {
                    console.log(cfi + ' -<')
                    if (cfi) {
                        this.redition.display(cfi).then(() => {
                            this.isShowLoading = false
                        })
                    } else {
                        this.redition.display().then(() => {
                            this.isShowLoading = false
                        })
                    }
                })
            },
            saveLocation (location) {
                console.log('save location')
                let chapter = this.toc.find(e => e.href === location.start.href)
                if (chapter) {
                    this.currChapter = chapter
                    LocalForage.setItem('chapter-' + this.$route.params.id, chapter.href).then(()=>{})
                }
                LocalForage.setItem('location-' + this.$route.params.id, location.start.cfi).then((value) => {
                    console.log(value + ' ->')
                })
            },
            onKeyUp (e) {
                if ((e.keyCode || e.which) === 37) {
                    this.redition.prev()
                }
                if ((e.keyCode || e.which) === 39) {
                    this.redition.next()
                }
            },
            prevPage () {
                if (this.isShowMenu) {
                    this.isShowMenu = false
                    this.$refs.menuBar.hideSetting()
                } else if (this.redition) {
                    this.redition.prev()
                }
            },
            nextPage () {
                if (this.isShowMenu) {
                    this.isShowMenu = false
                    this.$refs.menuBar.hideSetting()
                } else if (this.redition) {
                    this.redition.next()
                }
            },
            pageClick () {
                if (this.isShowToc) {
                    this.isShowToc = false
                } else if (this.isShowMenu) {
                    this.isShowMenu = false
                    if (!this.isShowMenu) {
                        this.$refs.menuBar.hideSetting()
                    }
                }
            },
            settingOpen () {
                if (!this.isShowMenu) {
                    this.isShowMenu = true
                }
            },
            fontSizeSelect (size) {
                if (this.redition) {
                    this.redition.themes.fontSize(size + 'px')
                    this.currFontSize = size
                }
            },
            themeSelect (themeName) {
                if (this.themes.BEIGE.name === themeName) {
                    this.currTheme = this.themes.BEIGE
                }
                if (this.themes.WHITE.name === themeName) {
                    this.currTheme = this.themes.WHITE
                }
                if (this.themes.NIGHT.name === themeName) {
                    this.currTheme = this.themes.NIGHT
                }

                if (themeName === this.currTheme.name && this.redition) {
                    this.redition.themes.select(themeName)
                }
            }
        }
    }
</script>

<style lang="scss" scoped>
    @import "../../assets/styles/global";

    .ebook-wrapper {
        position: absolute;
        width: 100%;
        height: 100%;
    }
</style>
