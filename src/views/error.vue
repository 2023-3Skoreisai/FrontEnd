<template>
  <div class="flex flex-col items-center">
    <Icon icon="tabler:alert-triangle" color="#ffd100" class="text-4xl mb-4" height="50" width="50"/>
    <h1 class="text-2xl">エラーが発生しました</h1>
    <br/>
    <h2 class="text-md">アプリケーションの実行中に予期しない例外が発生しました。詳しくはブラウザのデベロッパーツールにあるコンソールを確認してください。</h2>
    <div class="mt-8">
      <va-accordion
        v-model="value"
        class="max-w-4xl w-full"
        multiple
      >
        <va-collapse
          v-for="(collapse, index) in collapses"
          :key="index"
          :header="collapse.title"
        >
          <template #content>
            {{ collapse.content }}
          </template>
        </va-collapse>
      </va-accordion>
    </div>
  </div>
</template>

<script setup>
import { Icon } from '@iconify/vue';
</script>

<script>
export default {
  data() {
    return {
      value: [false, false, false],
      collapses: [
        { title: "API接続エラーに関する問題が発生した場合", content: "本ダッシュボードの設定にある「API エンドポイント」が正しく設定されているかご確認ください。設定できない場合は、パッケージディレクトリにあるconfig.jsonを直接編集してください。" },
        { title: "その他の問題", content: "上記以外で問題が発生した場合は速やかに管理者へ連絡をしてください。" },
      ],
    };
  },
};
</script>