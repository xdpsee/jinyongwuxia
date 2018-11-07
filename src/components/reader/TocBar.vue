<template>
  <transition name="slide-right">
    <div class="toc-wrapper" v-show="ifShowing">
      <div class="toc">
        <div class="title-wrapper">
          <span class="title">{{title}}</span>
          <div class="icon-wrapper" @click="onCloseClicked">
            <span class="iconfont icon icon-close"></span>
          </div>
        </div>
        <ul class="list">
          <li v-for="chapter in toc" class="chapter" :key="chapter.id" @click="onChapterSelect(chapter)">
            <span v-bind:class="{highlight: chapter.id == highlightChapter}">{{ chapter.label }}</span>
          </li>
        </ul>
      </div>
    </div>
  </transition>
</template>

<script>
export default {
  name: 'TocBar',
  props: {
    ifShowing: {
      type: Boolean,
      default: false
    },
    title: {
      type: String,
      default: ''
    },
    toc: {
      type: Array,
      default: () => []
    },
    highlightChapter: {
      type: String,
      default: null
    }
  },
  data () {
    return {

    }
  },
  methods: {
    onCloseClicked () {
      this.$emit('toc-close')
    },
    onChapterSelect (chapter) {
      this.$emit('toc-chapter-select', chapter)
    }
  }
}
</script>

<style lang="scss" scoped>
@import "../../assets/styles/global";
.toc-wrapper {
  position: absolute;
  left: 0;
  bottom: 0;
  top: 0;
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
          color: #444444;
          &.highlight {
            color: lightcoral;
          }
        }
        &.chapter:last-child {
          border: none;
        }
        &.chapter:nth-child(odd) {
          background: #fefefe;
        }
        &.chapter:nth-child(even) {
          background: #fdfdfd;
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
      box-shadow: 0 2px 2px rgba(0,0,0,.1);
      .title {
        flex: 1;
        font-size: px2rem(16);
        font-weight: bold;
        text-align: center;
        color: #444444;
      }
      .icon-wrapper {
        width: px2rem(48);
        height: 100%;
        text-align: center;
      }
    }
  }
}
</style>
