<template>
  <div class="home-page">
    <!-- Nội dung mà trước đây bạn đặt trong App.vue giờ nằm ở đây -->
    <AboutLibrary />
    <BookList />
  </div>
</template>

<script>
// Import các component nội dung cụ thể của trang chủ
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
/* Thêm kiểu dáng cho trang chủ nếu cần */
.home-page {
    padding: 20px;
}
</style>