<template>
  <div class="book-list">
    <div v-for="book in books" :key="book.id" class="book-card">
      <img :src="book.image" alt="book cover" />
      <h3>{{ book.title }}</h3>
      <p>{{ book.author }}</p>
      <button @click="viewBook(book.id)">Xem thông tin</button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'BookList',
  data() {
    return {
      books: [
        { id: 1, title: "Lập trình Vue 3", author: "Nguyễn Văn A", image: "/book1.jpg" },
        { id: 2, title: "Javascript cơ bản", author: "Trần Thị B", image: "/book2.jpg" },
        { id: 3, title: "Thiết kế web", author: "Lê Văn C", image: "/book3.jpg" },
      ]
    }
  },
  methods: {
    viewBook(id) {
      alert(`Xem thông tin sách có ID: ${id}`);
      // Hoặc bạn có thể chuyển hướng sang trang chi tiết sách
      // this.$router.push(`/books/${id}`)
    }
  }
}
</script>

<style scoped>
.book-list {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 1.5rem;
  padding: 2rem;
}

.book-card {
  background-color: #1c1c1c;
  color: #f0f0f0;
  border-radius: 10px;
  width: 180px;
  text-align: center;
  padding: 1rem;
  transition: transform 0.3s, box-shadow 0.3s;
}

.book-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 8px 20px rgba(0,0,0,0.5);
}

.book-card img {
  width: 100%;
  height: 200px;
  object-fit: cover;
  border-radius: 5px;
  margin-bottom: 0.5rem;
}

.book-card h3 {
  font-size: 1rem;
  margin: 0.5rem 0 0.3rem;
}

.book-card p {
  font-size: 0.85rem;
  color: #bbb;
  margin-bottom: 0.8rem;
}

.book-card button {
  background-color: #ffd700;
  color: #2a2f45;
  border: none;
  border-radius: 20px;
  padding: 0.5rem 1rem;
  cursor: pointer;
  font-weight: 500;
  transition: 0.3s;
}

.book-card button:hover {
  background-color: #ffb700;
}
</style>
