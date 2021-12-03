<template>
  <Header />
  <RiotBank />
</template>

<script>
import Header from './components/Header.vue';
import RiotBank from './components/RiotBank.vue';
export default {
  name: 'App',
  components: { RiotBank, Header },
  module: {
    rules: [
      {
        test: /\.svg$/,
        loader: 'vue-svg-loader',
      },
    ],
  },
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
body {
  background-color: #dfe3e6;
}
</style>
