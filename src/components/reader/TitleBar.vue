<template>
  <transition name="slide-down">
      <div class="title-wrapper" v-show="isShowing">
        <div class="left">
          <span class="iconfont icon icon-back"></span>
        </div>
        <div class="right">
          <div class="icon-wrapper">
            <span class="iconfont icon icon-font"></span>
          </div>
          <div class="icon-wrapper">
            <span class="iconfont icon icon-theme"></span>
          </div>
          <div class="icon-wrapper">
            <span class="iconfont icon icon-about"></span>
          </div>
        </div>
      </div>
    </transition>
</template>

<script>
export default {
  name: 'TitleBar',
  props: {
    isShowing: {
      type: Boolean,
      default: false
    }
  }
}
</script>

<style lang="scss" scoped>
@import "../../assets/styles/global";
.title-wrapper {
  position: absolute;
  left: 0;
  top: 0;
  z-index: 101;
  width: 100%;
  height: px2rem(48);
  display: flex;
  background: white;
  box-shadow: 0 px2rem(8) px2rem(8) rgba(0, 0, 0, 0.15);
  .left {
    flex: 0 0 px2rem(60);
    @include center;
  }
  .right {
    flex: 1;
    display: flex;
    justify-content: flex-end;
    .icon-wrapper {
      flex: 0 0 px2rem(40);
      @include center;
      .icon-cart {
        font-size: px2rem(17);
      }
    }
  }
}
</style>
