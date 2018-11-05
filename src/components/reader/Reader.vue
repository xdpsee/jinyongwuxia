<template>
  <div class="ebook">
    <title-bar :isShowing="ifShowTitleAndMenu"></title-bar>
    <div class="page-wrapper">
      <div id="page"></div>
      <div class="mask">
        <div class="left" @click="prevPage"></div>
        <div class="center" @click="toggleShowTitleAndMenu"></div>
        <div class="right" @click="nextPage"></div>
      </div>
    </div>
    <menu-bar :isShowing="ifShowTitleAndMenu" ref="menuBar"></menu-bar>
    <div class="load-indicator" v-show="!ifLoadFinished">
      <img src="/static/ajax-loader.gif" alt="正在加载,请稍后">
      <span v-show="ifError">加载失败,请刷新页面重试!</span>
    </div>
  </div>
</template>

<script>
import Epub from 'epubjs'
import TitleBar from './TitleBar'
import MenuBar from './MenuBar'

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
      ifError: false
    }
  },
  methods: {
    showEpub () {
      let path = '/static/epubs/' + this.$route.params.id + '.epub'
      this.book = new Epub({retore: true})
      this.book.open(path).then((data) => {
        this.ifLoadFinished = true
        this.redition = this.book.renderTo('page', {
          width: window.innerWidth,
          height: window.innerHeight
        })
        this.redition.display()
      }, (reason) => {
        console.log(reason)
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
    }
  },
  mounted () {
    this.showEpub()
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
        flex: 0 0 px2rem(150);
      }
      .center {
        flex: 1;
      }
      .right {
        flex: 0 0 px2rem(150);
      }
    }
  }
  .load-indicator {
    position: absolute;
    left: 50%;
    top: px2rem(260);
    z-index: 200;
    width: px2rem(200);
    height: px2rem(200);
    margin-left: px2rem(-100);
    margin-top: px2rem(-100);
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
