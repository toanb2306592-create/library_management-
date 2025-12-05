<template>
  <div class="home-page">
    <AboutLibrary />
    <BookList />
  </div>
</template>

<script>
import AboutLibrary from '@/components/AboutLibrary.vue';
import BookList from '@/components/BookList.vue';

export default {
  name: 'HomePage',
  components: {
    AboutLibrary,
    BookList
  }
}
</script>

<style scoped>
.home-page {
    padding: 20px;
}
</style>