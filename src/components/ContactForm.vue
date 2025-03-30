<script setup lang="ts">
import { ref } from 'vue';
import ContactFormInput from './ContactFormInput.vue';
import { safeParse, type FormFields } from '../services/validator';

const DEFAULTS: FormFields = {
  firstName: '',
  lastName: '',
  email: '',
  message: '',
};
const errors = ref<FormFields>({ ...DEFAULTS });
const fields = ref<FormFields>({ ...DEFAULTS });
const success = ref(false);

function validateForm() {
  const result = safeParse(fields.value);

  errors.value = !result.error
    ? { ...DEFAULTS }
    : result.error.issues.reduce(
        (res, { path, message }) => {
          const key = path.join();
          res = { ...res, [key]: message };
          return res;
        },
        { ...DEFAULTS }
      );

  return result.success;
}

async function onSubmit(e: Event) {
  e.preventDefault();
  const target = e.currentTarget as HTMLFormElement;
  const formData = new FormData(target);
  fields.value = Object.fromEntries(formData.entries()) as FormFields;

  const valid = validateForm();
  if (!valid) {
    // TODO focus on the first invalid field
    return;
  }

  const response = await fetch('/contact', {
    method: 'POST',
    body: formData,
  });
  if (response.status === 204) {
    success.value = true;
  }
}

function onChange(e: Event) {
  const { name, value }: { name: string; value: string } =
    e.target as HTMLTextAreaElement;
  fields.value = { ...fields.value, [name]: value };

  validateForm();
}
</script>

<template>
  <div v-if="success" class="contact-form contact-form--thanks">
    <h1>Thanks!</h1>
    <p>Go back <a href="/">home.</a></p>
  </div>

  <form
    v-else
    @submit="onSubmit"
    @change="onChange"
    method="post"
    action="/contact"
    class="contact-form"
  >
    <div class="field-group">
      <ContactFormInput
        id="first-name"
        name="firstName"
        label="First Name"
        required
        autocomplete="first-name"
        :error="errors['firstName']"
      />

      <ContactFormInput
        id="last-name"
        name="lastName"
        label="Last Name"
        required
        autocomplete="family-name"
        :error="errors['lastName']"
      />
    </div>

    <ContactFormInput
      id="work-email"
      name="email"
      label="Work Email"
      required
      autocomplete="email"
      type="email"
      :error="errors['email']"
    />

    <ContactFormInput
      id="message"
      name="message"
      label="Message"
      required
      type="textarea"
      autocomplete="message"
      :error="errors['message']"
    />

    <p class="mute">
      For information about our privacy practices and commitment to protecting
      your privacy, please review our <a href="#">Privacy Policy.</a>
    </p>

    <button type="submit">Send Message</button>
  </form>
</template>

<style>
.contact-form {
  --spacer: 0.75rem;

  display: flex;
  flex-direction: column;
  gap: var(--spacer);
  padding: 40px;
  background: #f1ecf6;
  border-radius: 10px;
  width: 500px;
  max-width: 100dvw;
  max-height: 100vh;
}

.contact-form--thanks {
  text-align: center;
  justify-content: center;
}

.contact-form button {
  align-self: flex-start;
}

@media screen and (max-width: 768px) {
  .contact-form {
    width: 100%;
    border-radius: 0;
    height: 100dvh;
    box-sizing: border-box;
    padding: 1rem;
    font-size: 16px;
  }
}
</style>

<style>
.field-box {
  position: relative;
  padding-bottom: 1.2rem;
}

.field-box__error {
  position: absolute;
  bottom: 0;
  left: 0;
  padding: 0 1rem;
  color: var(--color--error);
  font-size: 90%;
  line-height: 1;
}

.field {
  position: relative;

  border: 0;
  border-radius: var(--border-radius);
  background: var(--color--bg);
  color: var(--color--text);

  display: flex;
  flex-direction: column;
}

/* Outline */

.field-box .field {
  box-shadow: 0 0 0 1px var(--border-color);
}

.field-box:focus-within .field {
  box-shadow: 0 0 0 1px currentColor;
}

.field-box--valid:focus-within .field {
  box-shadow: 0 0 0 1px var(--color--success);
}

.field-box--invalid:focus-within .field {
  box-shadow: 0 0 0 1px var(--color--error);
}

/* Floating Label */

.field__label {
  position: absolute;

  transition: transform 200ms;
  transform-origin: top left;
  pointer-events: none;
  color: var(--color--mute);
}

.field__label,
.field__input {
  line-height: 1.375rem;
  padding: 1rem;
  display: block;
  background: transparent;
}

.field-box--traditional .field {
  margin-top: 2.25rem;
}

.field-box--filled .field__label,
.field:focus-within .field__label,
.field:has(:-webkit-autofill, :autofill) .field__label {
  display: block;
  transform: translate(0, -0.5rem) scale(0.9);
}

.field-box--traditional .field .field__label {
  top: -1.75rem;
  padding: 0;
  transform: none;
}

.field-box--traditional .field__label {
  color: currentColor;
}

.field-box--filled .field__input,
.field:focus-within .field__input,
.field:has(:-webkit-autofill, :autofill) .field__input {
  padding: 1.6rem 1rem 0.4rem;
}

.field-box--traditional .field .field__input {
  padding: 1rem;
}

/* Field Group */

.field-group {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(0, 1fr));
  border-radius: var(--border-radius);
  gap: 0;
}

.field-group .field {
  border-radius: 0;
  margin: 1px;
}

.field-group .field-box:first-child .field,
.field-group astro-island:first-of-type .field-box .field {
  border-top-left-radius: var(--border-radius);
  border-bottom-left-radius: var(--border-radius);
  margin-right: 0;
}

.field-group .field-box:first-child .field:focus-within,
.field-group astro-island:first-of-type .field-box .field:focus-within {
  margin-right: 1px;
}

.field-group .field-box:last-child .field,
.field-group astro-island:last-of-type .field-box .field {
  border-top-right-radius: var(--border-radius);
  border-bottom-right-radius: var(--border-radius);
}

@media screen and (max-width: 768px) {
  .field-group {
    display: flex;
    flex-direction: column;
    gap: var(--spacer);
  }

  .field-group .field-box .field:nth-child(n) {
    border-radius: var(--border-radius);
    margin: 1px;
  }
}
</style>
