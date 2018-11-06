<template>
  <div class="ebook" @keyup="onKeyUp($event)">
    <title-bar :isShowing="ifShowTitleAndMenu"></title-bar>
    <div class="page-wrapper">
      <div id="page"></div>
      <div class="mask">
        <div class="left" @click="prevPage"></div>
        <div class="center" @click="toggleShowTitleAndMenu"></div>
        <div class="right" @click="nextPage"></div>
      </div>
    </div>
    <menu-bar :isShowing="ifShowTitleAndMenu" :defaultFontSize="currentFontSize" :fontSizeList="fontSizeList" @fontSizeSelected="onFontSizeSelected" ref="menuBar"></menu-bar>
    <div class="load-indicator" v-show="!ifLoadFinished">
      <img src="/static/ajax-loader.gif" alt="正在加载,请稍后">
      <span v-show="ifError">加载失败,请刷新页面重试!</span>
    </div>
    <div class="toc-wrapper">
      <div class="toc">
        <div class="title-wrapper">
          <span class="title">{{title}}</span>
          <div class="icon-wrapper">
            <span class="iconfont icon icon-close"></span>
          </div>
        </div>
        <ul class="list">
          <li class="chapter" v-for="chapter in toc" :key="chapter.id"><span>{{ chapter.label }}</span></li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import Epub from 'epubjs'
import TitleBar from './TitleBar'
import MenuBar from './MenuBar'
import Settings from '../../Settings'

export default {
  name: 'Reader',
  components: {
    TitleBar,
    MenuBar
  },
  data () {
    return {
      ifShowTitleAndMenu: false,
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
      metadata: {}
    }
  },
  methods: {
    loadEpub () {
      let path = '/static/epubs/' + this.$route.params.id + '.epub'
      this.book = new Epub({retore: true})
      this.book.open(path).then(() => {
        this.ifLoadFinished = true
        this.redition = this.book.renderTo('page', {
          width: window.innerWidth,
          height: window.innerHeight
        })
        this.redition.themes.fontSize(this.currentFontSize + 'px')
        this.redition.display()
        this.book.loaded.navigation.then((navi) => {
          this.toc = navi.toc
        })
        console.log(this.book)
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
    toggleShowTitleAndMenu () {
      this.ifShowTitleAndMenu = !this.ifShowTitleAndMenu
      if (!this.ifShowTitleAndMenu) {
        this.$refs.menuBar.hideSetting()
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
    onKeyUp (e) {
      console.log(e)
    }
  },
  mounted () {
    Settings.load(Settings.key.fontSize).then((data) => {
      if (data != null) {
        this.currentFontSize = data
      }
    }).catch((reason) => {
      console.log('load current font size error, reason: ' + reason)
    })
    this.loadEpub()
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
  .toc-wrapper {
    position: absolute;
    left: 0;
    bottom: 30px;
    top: 30px;
    z-index: 200;
    width: px2rem(240);
    .toc {
      background: white;
      border-right: lightgray;
      box-shadow: px2rem(20) px2rem(10) px2rem(10) 0 rgba(0,0,0,.2);
      height: 100%;
      margin-bottom: 10px;
      overflow-y: auto;
      .list {
        margin-top: px2rem(50);
        list-style: none;
        margin-left: px2rem(6);
        margin-right: px2rem(6);
        .chapter {
          line-height: px2rem(30);
          vertical-align: middle;
          border-bottom: lightgray thin solid;
          cursor: pointer;
          span {
            display: inline-block;
            vertical-align: middle;
            font-size: px2rem(13);
            font-weight: bold;
          }
          &.chapter:last-child {
            border: none;
          }
        }
      }
      &.toc::-webkit-scrollbar {
        width: 0 !important;
        -ms-overflow-style: none;
        overflow: -moz-scrollbars-none;
      }
      .title-wrapper {
        display: flex;
        justify-content: space-between;
        align-items: center;
        height: px2rem(48);
        position: absolute;
        width: 100%;
        background: white;
        box-shadow: 0 2px 2px rgba(0,0,0,.2);
        .title {
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
    }
  }
}
</style>
