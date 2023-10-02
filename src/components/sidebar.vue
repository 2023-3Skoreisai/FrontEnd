<script setup>
import { Icon } from '@iconify/vue';
import packageJson from '../../package.json';

const version = packageJson.version;
</script>

<template>
  <div class="app-layout__sidebar-wrapper app-layout__content">
    <va-sidebar width="14rem">
      <va-sidebar-item to="/" :active="$route.path === '/'" activeColor="success">
        <va-sidebar-item-content>
          <Icon icon="tabler:layout-dashboard" width="24" height="24"/>
          <va-sidebar-item-title>ダッシュボード</va-sidebar-item-title>
        </va-sidebar-item-content>
      </va-sidebar-item>

      <va-accordion>
        <va-collapse body-color="#00000022">
          <template #header="{ value: isCollapsed }">
            <va-sidebar-item>
              <va-sidebar-item-content>
                <Icon icon="tabler:database" width="24" height="24" />
                <va-sidebar-item-title>データベース</va-sidebar-item-title>
                <va-spacer />
                <va-icon :name="isCollapsed ? 'va-arrow-up' : 'va-arrow-down'" />
              </va-sidebar-item-content>
            </va-sidebar-item>
          </template>

          <template #body>
            <va-sidebar-item to="/score" :active="$route.path === '/score'" activeColor="success">
              <va-sidebar-item-content>
                <Icon icon="tabler:clipboard-data" width="24" height="24" />
                <va-sidebar-item-title>スコアボード</va-sidebar-item-title>
              </va-sidebar-item-content>
            </va-sidebar-item>

            <va-sidebar-item to="/data" :active="$route.path === '/data'" activeColor="success">
              <va-sidebar-item-content>
                <Icon icon="tabler:database-search" width="24" height="24" />
                <va-sidebar-item-title>データ</va-sidebar-item-title>
              </va-sidebar-item-content>
            </va-sidebar-item>
          </template>
        </va-collapse>
      </va-accordion>

      <va-accordion>
        <va-collapse body-color="#00000022">
          <template #header="{ value: isCollapsed }">
            <va-sidebar-item>
              <va-sidebar-item-content>
                <Icon icon="tabler:file-code" width="24" height="24" />
                <va-sidebar-item-title>ページ</va-sidebar-item-title>
                <va-spacer />
                <va-icon :name="isCollapsed ? 'va-arrow-up' : 'va-arrow-down'" />
              </va-sidebar-item-content>
            </va-sidebar-item>
          </template>

          <template #body>
            <va-sidebar-item to="/page/score" :active="$route.path === '/page/score'" activeColor="success">
              <va-sidebar-item-content>
                <Icon icon="tabler:clipboard-data" width="24" height="24" />
                <va-sidebar-item-title>スコア表示</va-sidebar-item-title>
              </va-sidebar-item-content>
            </va-sidebar-item>

            <va-sidebar-item to="/page/result" :active="$route.path === '/page/result'" activeColor="success">
              <va-sidebar-item-content>
                <Icon icon="tabler:discount-check" width="24" height="24" />
                <va-sidebar-item-title>結果表示</va-sidebar-item-title>
              </va-sidebar-item-content>
            </va-sidebar-item>
          </template>
        </va-collapse>
      </va-accordion>

      <va-sidebar-item to="/support" :active="$route.path === '/support'" activeColor="success">
        <va-sidebar-item-content>
          <Icon icon="tabler:help-circle" width="24" height="24" />
          <va-sidebar-item-title>サポート</va-sidebar-item-title>
        </va-sidebar-item-content>
      </va-sidebar-item>

      <va-spacer />
      <va-sidebar-item>
        <va-sidebar-item-content>
          <Icon icon="tabler:settings" width="24" height="24" />
          <va-sidebar-item-title>設定</va-sidebar-item-title>
        </va-sidebar-item-content>
      </va-sidebar-item>

      <va-sidebar-item @click="showModal = true">
        <va-sidebar-item-content >
          <Icon icon="tabler:info-circle" width="24" height="24" />
          <va-sidebar-item-title>バージョン情報</va-sidebar-item-title>
        </va-sidebar-item-content>
      </va-sidebar-item>
    </va-sidebar>
    <!-- Modal Window-->
    <va-modal
      v-model="showModal"
      ok-text="OK"
      cancelText="キャンセル"
      close-button
      blur
      noDismiss
      >
        <h4 class="va-h4">
          バージョン情報
        </h4>
        <div>
          <p>
            3S 工嶺祭ダッシュボードは3S企画の管理、システム実行を行うためのシステムです。
          </p>
          <br>
            <b>システム情報</b>
            <p>実行バージョン: {{ version }}</p>
          <br>
            <b>アプリケーション情報</b>
            <li>Node.js v18.4.0</li>
            <li>Vue.js v3.3.4</li>
          <br>
            <b>Copylight</b>
            <p>Web Application: Crysta World</p>
            <p>Game System: K.Fukushima</p>
            <p>All: 2023 Grade3 Electrics</p>
        </div>
    </va-modal>
  </div>
</template>

<script>
export default {
  data() {
    return {
      showModal: false,
    };
  },
};
</script>

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


