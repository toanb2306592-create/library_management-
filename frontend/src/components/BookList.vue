<template>
  <div class="book-list">
    <div v-for="book in books" :key="book.id" class="book-card">
      <img :src="book.image" alt="book cover" />
      <h3>{{ book.title }}</h3>
      <p>{{ book.author }}</p>
    </div>
  </div>
</template>

<script>
export default {
  name: 'BookList',
  data() {
    return {
      books: [
        { id: 1, title: "Lập trình Vue 3", author: "Nguyễn Văn A", image: "/assets/book1.jpg" },
        { id: 2, title: "Javascript cơ bản", author: "Trần Thị B", image: "/assets/book2.jpg" },
        { id: 3, title: "Thiết kế web", author: "Lê Văn C", image: "/assets/book3.jpg" },
      ]
    }
  }
}
</script>

<style scoped>
.book-list {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 1rem;
  padding: 2rem;
}

.book-card {
  border: 1px solid #ccc;
  border-radius: 5px;
  width: 180px;
  text-align: center;
  padding: 1rem;
}

.book-card img {
  width: 100%;
  height: 200px;
  object-fit: cover;
  margin-bottom: 0.5rem;
}
</style>
