<template>
  <div class="flex flex-col items-center">
    <Icon icon="tabler:alert-circle-filled" color="dodgerblue" class="text-4xl mb-4" height="50" width="50"/>
    <h1 class="text-2xl">この先はダッシュボード外のページです</h1>
    <br/>
    <h2 class="text-md ml-4">「スコア表示」ページは<a href="/score" class="text-blue-700">データベース > スコア表示</a>ページの一般公開版になります。このページを離れるとダッシュボードからはセキュリティ上の理由により自動でログアウトされます。</h2>
    <div class="mt-8">
    </div>
  </div>
</template>

<script setup>
import { Icon } from '@iconify/vue';
</script>