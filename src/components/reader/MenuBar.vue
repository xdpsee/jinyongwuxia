<template>
  <div class="menu-bar">
    <transition name="slide-up">
      <div class="menu-wrapper" v-show="isShowing" :class="{'hide-box-shadow': isSettingShowing||!isShowing}">
        <div class="icon-wrapper">
          <span class="iconfont icon icon-menu"></span>
        </div>
        <div class="icon-wrapper">
          <span class="iconfont icon icon-progress"></span>
        </div>
        <div class="icon-wrapper">
          <span class="iconfont icon icon-brightness"></span>
        </div>
        <div class="icon-wrapper">
          <span class="iconfont icon icon-font" @click="showSetting()"></span>
        </div>
      </div>
    </transition>
    <transition name="slide-up">
      <div class="setting-wrapper" v-show="isSettingShowing">

      </div>
    </transition>
  </div>

</template>

<script>
export default {
  name: 'MenuBar',
  props: {
    isShowing: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      isSettingShowing: false
    }
  },
  methods: {
    showSetting () {
      this.isSettingShowing = true
    },
    hideSetting () {
      this.isSettingShowing = false
    }
  }
}
</script>

<style lang="scss" scoped>
@import "../../assets/styles/global";
.menu-bar {
  .menu-wrapper {
    position: absolute;
    left: 0;
    bottom: 0;
    z-index: 101;
    width: 100%;
    height: px2rem(48);
    background: white;
    box-shadow: 0 px2rem(-8) px2rem(8) rgba(0, 0, 0, 0.15);
    display: flex;
    .icon-wrapper {
      flex: 1;
      @include center;
    }
    &.hide-box-shadow {
      box-shadow: none;
    }
  }
  .setting-wrapper {
    position: absolute;
    bottom: px2rem(48);
    left: 0;
    width: 100%;
    z-index: 101;
    height: px2rem(60);
    background: white;
    box-shadow: 0 px2rem(-8) px2rem(8) rgba(0, 0, 0, 0.15);
  }
}
</style>
