<template>
  <div id="app">
    <HeaderLibrary />
    <BookList />
    <FooterLibrary />
  </div>
</template>

<script>
import HeaderLibrary from './components/HeaderLibrary.vue';
import BookList from './components/BookList.vue';
import FooterLibrary from './components/FooterLibrary.vue';

export default {
  name: 'App',
  components: {
    HeaderLibrary,
    BookList,
    FooterLibrary
  }
}
</script>

<style>
body {
  margin: 0;
  font-family: Arial, sans-serif;
}
#app {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}
</style>
