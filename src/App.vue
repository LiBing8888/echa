<template>
  <heade />
  <router-view class="router-view" v-slot="{ Component }">
    <transition :name="transitionName">
      <component :is="Component" />
    </transition>
  </router-view>
  <!-- <van-overlay :show="isLoading" >
      <van-loading />
  </van-overlay> -->
  <div class="wrapper" v-show="isLoading">
    <div class="rubik-loader"></div>
  </div>
</template>

<script >
import heade from "../src/pages/header.vue";
import { defineComponent, ref, onBeforeMount, watch } from "vue";
import { useRoute } from "vue-router";
import bus from "./libs/bus";
export default defineComponent({
  components: {
    heade,
  },
  setup(props, context) {
    let isLoading = ref(false);
    onBeforeMount(() => {
      bus.on("showLoading", (e) => {
        isLoading.value = e;
      });
    });

    const transition = ["slide-left", "slide-right"];
    let transitionName = ref(transition[0]);

    const route = useRoute();

    // 监控路由的变化
    watch(
      () => route.meta.index,
      (newIndex, oldIndex) => {
        if (newIndex > oldIndex) {
          transitionName.value = transition[0];
        } else {
          transitionName.value = transition[1];
        }
      }
    );

    return {
      isLoading,
      transitionName,
    };
  },
});
</script>

<style lang="less">
.van-field__error-message {
  text-align: right !important;
}
.van-overlay {
  display: flex;
  justify-content: center;
  align-items: center;
}

.wrapper {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: #fff;
  width: 100%;
  height: 100%;
  opacity: 0.9;
  z-index: 9999;
  .rubik-loader {
    width: 10vw;
    height: 10vw;
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    background-image: url("./assets/images/loading1.gif");
    background-repeat: no-repeat;
    background-position: center;
  }
  .rubik-loader-text {
  }
}

.router-view {
  width: 100%;
  height: 100%;
  position: absolute;
  top: 81px;
  bottom: 0;
  margin: 0 auto;
  overflow-y: hidden;
  overflow-x: hidden;
  -webkit-overflow-scrolling: touch;
}

.slide-right-enter-active,
.slide-right-leave-active,
.slide-left-enter-active,
.slide-left-leave-active {
  will-change: transform;
  transition: all 500ms;
  position: absolute;
}

.slide-right-enter-from {
  opacity: 0;
  transform: translate3d(-100%, 0, 0);
}

.slide-right-leave-active {
  opacity: 0;
  transform: translate3d(100%, 0, 0);
}

.slide-left-enter-from {
  opacity: 0;
  transform: translate3d(100%, 0, 0);
}

.slide-left-leave-active {
  opacity: 0;
  transform: translate3d(-100%, 0, 0);
}
</style>
