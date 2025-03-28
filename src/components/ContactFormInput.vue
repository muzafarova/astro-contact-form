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
    <component
      :is="type === 'textarea' ? 'textarea' : 'input'"
      :id="id"
      :name="name"
      :type="type"
      :rows="type === 'textarea' && 7"
      :required="required"
      :autocomplete="autocomplete"
      class="field__input"
      @input="(e: Event) => value = (e.target as HTMLInputElement | HTMLTextAreaElement)?.value"
    />
  </ContactFormField>
</template>
