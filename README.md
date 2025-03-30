# Contact Form

This form collects contact information and sends it to the given email (credentials are in `.env.example`). This demo uses [`nodemailer`](https://www.nodemailer.com/) to facilitate email sending and [Ethernal Email](https://ethereal.email/) as a email transporter. No message gets actually delivered, all messages are caught by the Ethernal Email and can be seen via their dashboard.

Project gets deployed to [Vercel](https://vercel.com/).

Client-side interactions are implemented with [Vue 3](https://vuejs.org/) components (TS, composition API). [`Zod`](https://zod.dev/) library is used to validate user input on both server and client side. The form supports autocompletion in the desktop browsers, mobile behavior can vary.

## 🚀 Dev setup

This is an [Astro](https://astro.build/) project. See the list of [commands](#-commands) below for all scripts available.

To run the project:

1. Create `.env` file if you wish to enable Ethernal Email (optional step)
2. Install dependencies `npm i`
3. Run dev server `npm run dev`

See [Astro documentation](https://docs.astro.build) for more details.

## 🚀 Project Structure

```text
/
├── public/
│   └── favicon.svg
├── src/
│   ├── css/
│       └── variables.css (configurable tokens)
│       └── base.css (basic HTML level styles)
│       └── patterns.css (utility classes tokens)
│   ├── components/
│   │   └── ContactForm.vue
│   │   └── ContactFormFiled.vue
│   │   └── ContactFormInput.vue
│   ├── layouts/
│   │   └── Layout.astro
│   └── pages/
│       └── index.astro
│       └── contact.ts
└── package.json
```

To learn more about the folder structure of an Astro project, refer to [our guide on project structure](https://docs.astro.build/en/basics/project-structure/).

## 🧞 Commands

All commands are run from the root of the project, from a terminal:

| Command                   | Action                                           |
| :------------------------ | :----------------------------------------------- |
| `npm install`             | Installs dependencies                            |
| `npm run dev`             | Starts local dev server at `localhost:4321`      |
| `npm run build`           | Build your production site to `./dist/`          |
| `npm run preview`         | Preview your build locally, before deploying     |
| `npm run astro ...`       | Run CLI commands like `astro add`, `astro check` |
| `npm run astro -- --help` | Get help using the Astro CLI                     |
