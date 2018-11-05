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
      ifShowTitleAndMenu: false
    }
  },
  methods: {
    showEpub () {
      let path = '/static/epubs/' + this.$route.params.id + '.epub'
      console.log(path)
      this.book = new Epub(path, {restore: true})
      console.log(this.book)
      this.redition = this.book.renderTo('page', {
        width: window.innerWidth,
        height: window.innerHeight
      })
      this.redition.display()
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
}
</style>
