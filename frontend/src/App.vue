<template>
  <div id="app">
    <!-- Header và Footer hiển thị cố định trên mọi trang -->
    <HeaderLibrary /> 
    
    <!-- ĐIỂM QUAN TRỌNG NHẤT: Đây là nơi nội dung của trang hiện tại sẽ được tải. -->
    <!-- Khi URL là '/', nó sẽ tải HomePage.vue -->
    <!-- Khi URL là '/signup', nó sẽ tải SignupPage.vue -->
    <main class="page-content">
      <router-view />
    </main>
    
    <FooterLibrary />
  </div>
</template>

<script>
// Chỉ giữ lại các component cố định
import HeaderLibrary from '@/components/HeaderLibrary.vue';
import FooterLibrary from '@/components/FooterLibrary.vue';


export default {
  name: 'App', // Đổi tên thành 'App' thay vì 'HomePage'
  components: {
    HeaderLibrary,
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
/* Thêm class để dễ dàng quản lý nội dung chính */
.page-content {
    flex-grow: 1; /* Đảm bảo nội dung chính chiếm không gian còn lại */
}
</style>