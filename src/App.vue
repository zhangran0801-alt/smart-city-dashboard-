<script setup lang="ts">
</script>

<template>
  <router-view v-slot="{ Component }">
    <transition name="page" mode="out-in">
      <component :is="Component" />
    </transition>
  </router-view>
</template>

<style>
#app {
  width: 100vw;
  height: 100vh;
  overflow: hidden;
  background-color: #0a0e27;
}
</style>
