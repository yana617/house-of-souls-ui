# house-of-souls-ui

## Project setup

```bash
npm install
```

&nbsp;

## How to run

### Pre-requirements

Create **.env.local** file from **.env.example** file and setup local variables.

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
