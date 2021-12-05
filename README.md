# test-prixa.ai

Hello, this project for technical test from Prixa.ai  
I call this project DailyNews, a News App project.  
in this project i use choose newsapi.org API for my data news.  
stack technology and library i user in project:

1. SASS/SCSS
2. TypeScript
3. Vue
4. vue-router
5. vue-a18n
6. moment

## Clone Poject

first of all we need clone the project.  
you can do with this command:

```
git clone https://github.com/ibrahimtrg18/prixa.ai-test-fe-ibrahimtarigan.git
```

## Project setup

second we need install all package in this project.  
you can do with this command:  
with npm

```
npm install
```

with yarn

```
yarn install
```

now you need to set environment, in file `.env`  
if you dont have it. you can use mine

```
VUE_APP_BASE_URL=https://newsapi.org/v2
VUE_APP_API_KEY=be73dde8022f44389a342242bfe0c2a8
```

now you can run this project as development or production for more detail check below.

### Compiles and hot-reloads for development

with npm

```
npm run serve
```

with yarn

```
yarn serve
```

### Compiles and minifies for production

when you want to go production mode, first you need build project  
you can do with this command:

with npm

```
npm run build
```

with yarn

```
yarn build
```

after that you can run the project in `dist` folder  
you can do with this command:

```
serve -s dist
```

if you get error (`serve` is not recognized as internal or external command) this problem because you dont have serve in your computer.
so to fix this problem you need install serve in your computer.  
you can do with this command:  
with npm

```
npm install -g serve
```

with yarn

```
yarn global add serve
```

### Lints and fixes files

with npm

```
npm run lint
```

with yarn

```
yarn lint
```

### Customize configuration

See [Configuration Reference](https://cli.vuejs.org/config/).
