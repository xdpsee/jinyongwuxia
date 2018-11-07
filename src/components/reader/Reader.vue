<template>
  <div class="ebook">
    <title-bar :isShowing="isShowTitleAndMenu"></title-bar>
    <div class="page-wrapper">
      <div id="page"></div>
      <div class="mask">
        <div class="left" @click="prevPage"></div>
        <div class="center" @click="toggleShowTitleAndMenu"></div>
        <div class="right" @click="nextPage"></div>
      </div>
    </div>
    <menu-bar :isShowing="isShowTitleAndMenu" :defaultFontSize="currentFontSize" :fontSizeList="fontSizeList" @font-size-select="onFontSizeSelected" @toc-open="openToc" ref="menuBar"></menu-bar>
    <div class="load-indicator" v-show="!ifLoadFinished">
      <img src="/static/ajax-loader.gif" alt="正在加载,请稍后">
      <span v-show="ifError">加载失败,请刷新页面重试!</span>
    </div>
    <toc-bar ref="tocBar" :ifShowing="isShowToc" :highlightChapter="currentChapter" :title="title" :toc="toc" @toc-close="closeToc" @toc-chapter-select="selectChapter"></toc-bar>
  </div>
</template>

<script>
import Epub from 'epubjs'
import TocBar from './TocBar'
import TitleBar from './TitleBar'
import MenuBar from './MenuBar'
import Settings from '../../Settings'
import localStorage from 'localforage'

export default {
  name: 'Reader',
  components: {
    TitleBar,
    TocBar,
    MenuBar
  },
  data () {
    return {
      isShowToc: false,
      isShowTitleAndMenu: false,
      ifLoadFinished: false,
      ifError: false,
      fontSizeList: [
        {
          size: 18
        },
        {
          size: 20
        },
        {
          size: 22
        },
        {
          size: 24
        },
        {
          size: 26
        },
        {
          size: 28
        },
        {
          size: 30
        }
      ],
      currentFontSize: 20,
      title: '',
      book: null,
      toc: [],
      metadata: {},
      currentChapter: null,
      isReady: false,
      themes: {
        white: {
          body: {
            color: '#000000',
            background: '#ffffff'
          },
          name: 'WHITE'
        },
        beige: {
          body: {
            color: '#000000',
            background: '#f3e8d2'
          },
          name: 'BEIGE'
        },
        night: {
          body: {
            color: '#ffffff',
            background: '#4a4a4a'
          },
          name: 'NIGHT'
        }
      }
    }
  },
  mounted () {
    this.loadSettings()
    this.book = new Epub({retore: true, reload: true})
    this.book.loaded.navigation.then((navigation) => {
      this.toc = navigation.toc
      console.log(navigation)
    })
    this.initReader()
    this.book.ready.then(() => {
      return this.book.locations.generate()
    }).then(() => {
      this.locations = JSON.parse(this.book.locations.save())
      console.log(this.locations)
      this.isReady = true
      this.redition.on('relocated', (location) => {
        const percent = this.book.locations.percentageFromCfi(location.start.cfi)
        const percentage = Math.floor(percent * 100)
        console.log(percentage)
      })
    })
  },
  methods: {
    loadSettings () {
      Settings.load(Settings.key.fontSize).then((data) => {
        if (data != null) {
          this.currentFontSize = data
        }
      })
    },
    initReader () {
      let path = '/static/epubs/' + this.$route.params.id + '.epub'
      this.book.open(path).then(() => {
        console.log(this.book)
        this.ifLoadFinished = true
        this.redition = this.book.renderTo('page', {
          width: window.innerWidth,
          height: window.innerHeight
        })
        this.redition.themes.register(this.themes)
        this.redition.themes.fontSize(this.currentFontSize + 'px')
        this.redition.display()
        this.onKeyUp(this.redition)
        this.book.loaded.metadata.then((meta) => {
          this.title = meta.title
        })
      }, (reason) => {
        this.ifError = true
      })
    },
    prevPage () {
      if (this.redition) {
        this.redition.prev()
      }
    },
    nextPage () {
      if (this.redition) {
        this.redition.next()
      }
    },
    selectChapter (chapter) {
      if (this.redition) {
        this.redition.display(chapter.href)
        this.currentChapter = chapter.href
        this.isShowToc = false
      }
    },
    toggleShowTitleAndMenu () {
      if (this.isShowToc) {
        this.isShowToc = false
      } else {
        this.isShowTitleAndMenu = !this.isShowTitleAndMenu
        if (!this.isShowTitleAndMenu) {
          this.$refs.menuBar.hideSetting()
        }
      }
    },
    onFontSizeSelected (fontSize) {
      this.currentFontSize = fontSize.size
      if (this.book && this.redition) {
        this.redition.themes.fontSize(this.currentFontSize + 'px')
      }
      Settings.save(Settings.key.fontSize, this.currentFontSize).then(() => {
        console.log('save current file size done.')
      }).catch((reason) => {
        console.log('save current font size error, reason: ' + reason)
      })
    },
    openToc () {
      this.isShowToc = true
      this.isShowTitleAndMenu = false
      this.$refs.menuBar.hideSetting()
    },
    closeToc () {
      this.isShowToc = false
    },
    onKeyUp (redition) {
      document.addEventListener('keyup', (e) => {
        if ((e.keyCode || e.which) === 37) {
          redition.prev()
        }
        if ((e.keyCode || e.which) === 39) {
          redition.next()
        }
      })
    },
    loadLocations () {
      var key = this.book.key() + '-locations'
      localStorage.getItem(key).then((location) => {
        console.log(location)
        this.redition.display()
      })
    },
    onRelocated (location) {
      this.currentChapter = location.start.href
      console.log(location.start.href + ',' + location.start.displayed.page + '/' + location.start.displayed.total)
      console.log(location)
      if (this.book) {
        localStorage.setItem(this.book.key() + '-locations', location.start.cfi)
      }
    }
  }
}
</script>

<style lang='scss' scoped>
@import "../../assets/styles/global";
.ebook {
  position: relative;
  .page-wrapper {
    .mask {
      position: absolute;
      left: 0;
      top: 0;
      z-index: 100;
      width: 100%;
      height: 100%;
      display: flex;
      .left {
        flex: 0 0 px2rem(100);
      }
      .center {
        flex: 1;
      }
      .right {
        flex: 0 0 px2rem(100);
      }
    }
  }
  .load-indicator {
    position: absolute;
    left: 50%;
    top: px2rem(260);
    z-index: 200;
    width: px2rem(128);
    height: px2rem(128);
    margin-left: px2rem(-64);
    margin-top: px2rem(-64);
    text-align: center;
    span {
      display: block;
      color: #333333;
      font-size: 0.4em;
      margin-top: px2rem(20);
    }
  }
}

</style>
