<script setup lang="ts">
import { Icon } from '@iconify/vue'
import { useColors } from "vuestic-ui";
import { computed } from "vue";

const { applyPreset, currentPresetName } = useColors();

const switchValue = computed({
  get() { return currentPresetName.value },
  set(value) { 
    applyPreset(value)
  }
});

const iconValue = computed(() => switchValue.value ? 'light_mode' : 'dark_mode')
</script>


<template>
  <va-navbar
    color="primary"
  >

    <!-- Navbar Left -->
    <template #left>
      <va-navbar-item>
        <Icon icon="tabler:report" height="34" width="34" class="logo"/><a style="font-size:18px;">3Sダッシュボード</a>
      </va-navbar-item>
    </template>

    <!-- Navbar Menu -->
    <template #right>
      <va-switch v-model="switchValue" :value="iconValue" true-value="dark" false-value="light" color="#5123a1" class="mr-3 mt-2">
        <template #innerLabel>
          <va-icon
            :name="switchValue === 'dark' ? 'dark_mode' : 'light_mode'"
          />
        </template>
      </va-switch>
      <va-button class="mt-0.5">
          <Icon icon="line-md:github" width="24" height="24"/>
      </va-button>
    </template>
  </va-navbar>
</template>


<style scoped>
.logo {
     margin-right: 10px;
}
</style>

<script lang="ts">
export default {
  data() {
    return {
      value: true,
    };
  },
};
</script>