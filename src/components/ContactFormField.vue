<script setup lang="ts">
interface Props {
  id: string;
  label: string;
  required?: boolean;
  error?: string;
}

defineProps<Props>();
</script>

<template>
  <div
    class="field-box"
    :class="{
      'field-box--invalid': error,
    }"
  >
    <div class="field">
      <label
        :for="id"
        :title="error ? error : label"
        class="field__label truncate"
      >
        {{ label }} {{ required ? ' *' : '' }}
      </label>
      <slot />
    </div>
    <div class="field-box__error">{{ error }}</div>
  </div>
</template>
