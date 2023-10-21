<template>
  <div class="flex flex-row-reverse">
    <va-input
        v-model="filter"
        class="sm:col-span-2 md:col-span-3"
        placeholder="検索"
    />
    <va-button class="mr-4" @click="del = !del" color="danger"><Icon icon="tabler:trash" height="18" width="18"/>&ensp;削除 </va-button>
    <va-button class="mr-4" @click="create = !create"><Icon icon="tabler:square-plus" height="18" width="18"/>&ensp;新規追加 </va-button>
  </div>
  <va-data-table
    class="table-inline"
    :items="items"
    :columns="columns"
    :per-page="perPage"
    :current-page="currentPage"
    :filter="filter"
    @filtered="filtered = $event.items"
    no-data-filtered-html="検索結果がありません"
    no-data-html="データがありません"
  >
    <template #bodyAppend>
      <tr>
        <td colspan="6">
          <div class="flex justify-center mt-4">
            <va-pagination
              v-model="currentPage"
              :pages="pages"
            />
          </div>
        </td>
      </tr>
    </template>

    <template
      v-for="item in columns"
      :key="item.key"
      #[`cell(${item.key})`]="{ value, row }"
    >
      <div class="table-inline__cell">
        <va-value #default="doShowInput">
          <va-input
            v-if="doShowInput.value"
            :model-value="value"
            @change="($event) => {
              row.rowData[item.key] = $event.target.value
              doShowInput.value = false
            }"
            @blur="doShowInput.value = false"
            @vue:mounted="$event.component.ctx.focus()"
          />
          <span
            class="table-inline__item"
            :class="doShowInput.value ? 'table-inline__item--hidden' : ''"
            @click="doShowInput.value = true"
          >
            {{ value }}
          </span>
        </va-value>
      </div>
    </template>
  </va-data-table>
  <p class="mt-4">※テーブルの編集後に「上書き保存」を押してください。ページをリロードすると編集内容が削除されます。</p>
  <va-modal
    v-slot="{ hide }"
    v-model="create"
    ok-text="追加"
    :noDismiss="true"
    cancel-text="キャンセル"
    hide-default-actions
  >
    <div class="flex items-center">
      <Icon icon="tabler:database-plus" height="30" width="30" color="#208EEA"/>
      <h3 class="va-h4 ml-2">
        データの追加
      </h3>
    </div>
    <p>データベースに項目を追加できます。次にある項目を埋めて送信してください。<br>(<font color="red">*</font>は必須項目です。)</p>
    <div class="mt-4">
      <va-input
      v-model="id"
      label="Id"
      placeholder="ID"
      class="mb-4"
      :rules="[(v) => v.length > 0 || `数字を入力してください`]"
      style="width: 600px;"
      mask="numeral"
      :requiredMark="true"
      />
      <va-input
      v-model="passphase"
      label="Pass"
      placeholder="パスフレーズ"
      class="mb-4"
      :rules="[(v) => v.length > 0 || `テキストを入力してください`]"
      style="width: 600px;"
      :requiredMark="true"
      />
      <va-input
      v-model="score"
      label="Score"
      placeholder="スコア"
      class="mb-4"
      :rules="[(v) => v.length > 0 || `数字を入力してください`]"
      style="width: 600px;"
      mask="numeral"
      :requiredMark="true"
      />
      <va-input
      v-model="result"
      label="Result"
      placeholder="結果"
      class="mb-4"
      :rules="[(v) => v === 'true'|| v === 'false' || 'trueまたはfalseを入力してください']"
      style="width: 600px;"
      :requiredMark="true"
      />
      <va-input
      v-model="player"
      label="Player No."
      placeholder="プレイヤーNo."
      class="mb-4"
      :rules="[(v) => v === '1'|| v === '2' || v === '3' ||'1~3の整数を入力してください']"
      style="width: 600px;"
      mask="numeral"
      :requiredMark="true"
      />
    </div>
    <div class="flex justify-end mt-4 gap-2">
      <va-button
        preset="secondary"
        color="secondary"
        @click="hide()"
      >
        キャンセル
      </va-button>
      <va-button
        @click="senddata()"
      >
        実行
      </va-button>
    </div>
  </va-modal>


  <va-modal
    v-slot="{ hide }"
    v-model="del"
    ok-text="追加"
    :noDismiss="true"
    cancel-text="キャンセル"
    hide-default-actions
  >
    <div class="flex items-center">
      <Icon icon="tabler:database-minus" height="30" width="30" color="#EA2020"/>
      <h3 class="va-h4 ml-2">
        データの削除
      </h3>
    </div>
    <p>データベースの項目を削除できます。次にある項目を埋めて送信してください。<br>(<font color="red">*</font>は必須項目です。)</p>
    <div class="mt-4">
      <va-input
      v-model="id"
      label="Id"
      placeholder="ID"
      class="mb-4"
      :rules="[(v) => v.length > 0 || `数字を入力してください`]"
      style="width: 600px;"
      mask="numeral"
      :requiredMark="true"
      />
      <va-input
      v-model="passphase"
      label="Pass"
      placeholder="パスフレーズ"
      class="mb-4"
      :rules="[(v) => v.length > 0 || `テキストを入力してください`]"
      style="width: 600px;"
      :requiredMark="true"
      />
    </div>
    <div class="flex justify-end mt-4 gap-2">
      <va-button
        preset="secondary"
        color="secondary"
        @click="hide()"
      >
        キャンセル
      </va-button>
      <va-button
        @click="deldata()"
      >
        実行
      </va-button>
    </div>
  </va-modal>
</template>

<script>
import { defineComponent, onMounted } from "vue";
import axios from "axios";

export default defineComponent({
  emits: ['accepted'],
  data() {
    onMounted(async () => {
      const res = await axios.get('https://api.crystaworld1221.com/3s_class/v1/user/get');
        this.items = res.data;
    })

    const items = [];

    const columns = [
      { label: "ID", key: "id", sortable: true },
      { label: "パスワード", key: "pass", sortable: true },
      { label: "スコア", key: "score", sortable: true },
      { label: "結果", key: "result", sortable: true },
      { label: "登録日時", key: "date", sortable: true},
      { label: "プレイヤーNo.", key: "player", sortable: true},
    ];

    return {
      items: [],
      columns,
      currentPage: 1,
      perPage: 10,
      filter: "",
      filtered: items,
      create: false,
      del: false,
      edit: false,
      id:"",
      passphase:"",
      score:"",
      result:"",
      player:"",
    };
  },
  computed: {
    pages() {
      return this.perPage && this.perPage !== 0
        ? Math.ceil(this.filtered.length / this.perPage)
        : this.filtered.length;
    },
  },
  methods: {
    senddata() {
      if (!this.id || !this.passphase || !this.score || !this.result || !this.player) {
        this.$vaToast.init({ message: '項目にデータがありませんでした', color: 'danger' });
        this.create = false;
        return;
      } else {
        axios.defaults.headers.common["auth"] = "bW9yaW5vZGFpeW91c2VpXzNzX2NsYXNzX2FwaV90b2tlbg==";
        axios.post(`https://api.crystaworld1221.com/3s_class/v1/user/post?id=${this.id}&pass=${this.passphase}&score=${this.score}&result=${this.result}&player=${this.player}`)
        .then(() => {
          this.$vaToast.init({ message: 'データを追加しました', color: 'success' });
          this.create = false;
          this.$router.go(0);
        })
        .catch(() => {
          this.$vaToast.init({ message: 'データを追加できませんでした', color: 'danger' });
          this.create = false;
        })
      }
    },
    deldata() {
      if (!this.id || !this.passphase) {
        this.$vaToast.init({ message: '項目にデータがありませんでした', color: 'danger' });
        this.del = false;
        return;
      } else {
        axios.defaults.headers.common["auth"] = "bW9yaW5vZGFpeW91c2VpXzNzX2NsYXNzX2FwaV90b2tlbg==";
        axios.post(`https://api.crystaworld1221.com/3s_class/v1/user/del?id=${this.id}&pass=${this.passphase}`)
        .then(() => {
          this.$vaToast.init({ message: 'データを削除しました', color: 'success' });
          this.del = false;
          this.$router.go(0);
        })
        .catch(() => {
          this.$vaToast.init({ message: 'データを削除できませんでした', color: 'danger' });
          this.del = false;
        })
      }
    }
  }
});
</script>

<style lang="scss" scoped>
.table-inline {
  &__cell {
    position: relative;
    height: 100%;
    width: 100%;
    display: flex;
    align-items: center;
  }

  &__item {
    cursor: pointer;

    &--hidden {
      z-index: -1;
      opacity: 0;
      pointer-events: none;
    }
  }

  .va-input {
    position: absolute;
    width: 100%;
  }
}
</style>

<script setup>
import { Icon } from '@iconify/vue';
</script>