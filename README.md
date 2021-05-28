# house-of-souls-ui

Volunteers come to the house of the rescued souls (HOS, in russian - Домик Спасенных Душ или ДСД) every day to look after the animals, in the morning and in the evening. To control when and who will be, a schedule is kept in Excel. Purpose - to automate the process of recording people on a schedule.

## Project setup

```bash
npm install
```

&nbsp;

## How to run

### Pre-requirements

Create **.env.local** file from **.env.example** file and setup local variables.

To have a mock server via service worker it's required to provide env variable `VUE_APP_MSW` with value `true`

Run:

```bash
npm start
```

&nbsp;

### Build for production

```bash
npm run build
```

&nbsp;

### Lints and fixes files

```bash
npm run lint
```

&nbsp;

## Deployment

- If the project is configured on the server earlier:

```bash
npm run deploy
```

- If not:

**Removes project .env variables!**

```bash
npm run deploy-with-setup
```

And setup .env.production file in project source directory on the server
