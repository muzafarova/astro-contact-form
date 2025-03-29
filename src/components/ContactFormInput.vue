<script setup lang="ts">
import { ref } from 'vue';
import ContactFormField from './ContactFormField.vue';

interface Props {
  id: string;
  name: string;
  label: string;
  required?: boolean;
  autocomplete?: string;
  error?: string;
  type?: string;
}

const value = ref('');

withDefaults(defineProps<Props>(), { type: 'text' });
</script>

<template>
  <ContactFormField
    :id="id"
    :label="label"
    :required="required"
    :error="error"
    :class="{
      'field-box--filled': value,
      'field-box--valid': value && !error,
    }"
  >
    <textarea
      v-if="type === 'textarea'"
      :id="id"
      :name="name"
      rows="7"
      :autocomplete="autocomplete"
      class="field__input"
      @input="(e: Event) => value = (e.target as HTMLTextAreaElement)?.value"
    />
    <input
      v-else
      :id="id"
      :name="name"
      :type="type"
      :autocomplete="autocomplete"
      class="field__input"
      @input="(e: Event) => value = (e.target as HTMLInputElement)?.value"
    />
  </ContactFormField>
</template>
