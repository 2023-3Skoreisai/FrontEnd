<script setup>
import Navbar from '@/components/navbar.vue';
import Sidebar from '@/components/sidebar.vue';
import login from '@/components/login/login.vue';
import { ref } from 'vue';

import { useBreakpoint } from "vuestic-ui";
const logged = ref(true);
const breakpoint = useBreakpoint();
</script>

<template>
  <div v-if="logged">
    <div v-if="breakpoint.xs">
      <navbar />
      <div class="w-full md:w-1/2 mx-auto mt-8">
      <div class="flex p-5 rounded-lg shadow bg-white dark:bg-gray-300">
        <div>
          <svg class="w-6 h-6 fill-current text-yellow-500" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M0 0h24v24H0V0z" fill="none"/><path d="M12 5.99L19.53 19H4.47L12 5.99M12 2L1 21h22L12 2zm1 14h-2v2h2v-2zm0-6h-2v4h2v-4z"/></svg>
        </div>
        <div class="ml-3">
          <h2 class="font-semibold text-gray-800">表示非対応デバイスが検出されました</h2>
          <p class="mt-2 text-sm text-gray-600 leading-relaxed">このダッシュボードは、画面サイズが640px以下のデバイスでお使いになることができません。<br>タブレット端末をご利用の場合はタブレットを横に傾けてご利用ください。</p>
        </div>
      </div>
      </div>
    </div>

    <div class="app-layout" v-else>
      <navbar />
      <div class="app-layout__content">
        <div class="app-layout__sidebar-wrapper">
          <sidebar/>
        </div>
        <div class="app-layout__page">
          <div class="p-2 md:px-6 md:py-9">
            <router-view />
          </div>
        </div>
      </div>
    </div>
  </div>
  <div v-else>
    <login />
  </div>
</template>


<style lang="scss">
  $mobileBreakPointPX: 640px;
  $tabletBreakPointPX: 768px;

  .app-layout {
    height: 100vh;
    display: flex;
    flex-direction: column;
    &__navbar {
      min-height: 4rem;
    }

    &__content {
      display: flex;
      height: calc(100vh - 4rem);
      flex: 1;

      @media screen and (max-width: $tabletBreakPointPX) {
        height: calc(100vh - 6.5rem);
      }

      .app-layout__sidebar-wrapper {
        position: relative;
        height: 100%;
        background: #ffffff;

        @media screen and (max-width: $tabletBreakPointPX) {
          &:not(.minimized) {
            width: 100%;
            height: 100%;
            position: fixed;
            top: 0;
            z-index: 999;
          }

          .va-sidebar:not(.va-sidebar--minimized) {
            .va-sidebar__menu {
              padding: 0;
            }
          }
        }
      }
    }
    &__page {
      flex-grow: 2;
      overflow-y: scroll;
    }
  }
</style>