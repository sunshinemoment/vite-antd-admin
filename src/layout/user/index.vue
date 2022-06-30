<script setup lang="ts">
import { useScreen } from 'vue-screen';
const screen = useScreen();
</script>

<template>
  <div
    :class="[
      'layout-user',
      {
        'layout-user--m': screen.portrait,
        'layout-user--p': !screen.portrait,
      },
    ]"
  >
    <div class="layout-user__top">
      <img src="@/assets/images/top-bg.jpg" alt="cover" />
    </div>
    <div class="layout-user__inner">
      <h1>XXX模板 管理系统</h1>
      <div class="layout-user__main">
        <router-view></router-view>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.layout-user {
  height: 100vh;
  overflow-y: auto;
  background: rgb(0 0 0 / 4%);

  h1 {
    color: #fff;
    font-size: 36px;
    text-shadow: 4px 3px 0 rgb(0 0 0 / 80%), 4px 3px 0 rgb(0 0 0 / 20%);
  }
}

.layout-user__top {
  position: relative;
  width: 100%;
  height: 400px;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  &::after {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgb(0 0 0 / 40%);
    content: '';
  }
}

.layout-user__inner {
  position: relative;
  width: 420px;
  margin: -240px auto 60px;
  text-align: center;
  box-shadow: rgb(0 0 0 / 45%) 0 25px 20px -20px;
}

.layout-user__main {
  padding: 36px 48px;
  background: #fff;
}

.layout-user--m {
  .layout-user__top {
    height: 300px;
  }

  h1 {
    font-size: 28px;
  }

  .layout-user__inner {
    width: 90%;
  }
}
</style>
