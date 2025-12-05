<template>
  <div class="book-detail">
    <div v-if="book" class="detail-container">
      <h2 class="title">{{ book.TenSach }}</h2>

      <div class="detail-content">
        <img :src="getBookImage(book)" alt="Hình bìa sách" class="book-img" />

        <div class="book-info">
          <p><strong>Mã sách:</strong> {{ book.MaSach }}</p>
          <p><strong>NXB:</strong> {{ book.TenNXB }}</p>
          <p><strong>Đơn giá:</strong> {{ book.DonGia }} VNĐ</p>
          <p><strong>Số quyển:</strong> {{ book.SoQuyen }}</p>
          <p><strong>Năm xuất bản:</strong> {{ book.NamXuatBan }}</p>
          <p v-if="book.description"><strong>Mô tả:</strong> {{ book.description }}</p>

          <div class="buttons">
            <button class="back-btn" @click="$router.back()">← Quay về</button>
            <button
              v-if="!isAdmin"
              class="borrow-btn"
              @click="borrowBook(book._id)"
            >
              📚 Mượn sách
            </button>
          </div>
        </div>
      </div>
    </div>

    <div v-else class="loading-text">
      Đang tải thông tin sách...
    </div>
  </div>
</template>

<script>
import axios from "axios";
import BookService from "@/services/book.service";

export default {
  name: "BookDetail",
  data() {
    return {
      book: null,
      publishers: [],
      user: null,
    };
  },
  computed: {
    isAdmin() {
      return this.user?.email === "admin@gmail.com";
    },
  },
  methods: {
    async fetchBook() {
      try {
        const [bookRes, publishersRes] = await Promise.all([
          BookService.get(this.$route.params.id),
          axios.get("http://localhost:3000/api/publishers")
        ]);

        const publishers = publishersRes.data;
        const book = bookRes.data;

        const nxb = publishers.find(p => p.MaNXB === book.MaNXB);
        book.TenNXB = nxb ? nxb.TenNXB : "NXB không xác định";

        this.book = book;

        const userData = localStorage.getItem("user"); 
        this.user = userData ? JSON.parse(userData) : null;

      } catch (err) {
        console.error("Lỗi khi lấy thông tin sách:", err);
      }
    },
    getBookImage(book) {
      if (!book.image) return "/default-book.png";
      const img = Array.isArray(book.image) ? book.image[0] : book.image;
      if (typeof img === "string") {
        if (img.startsWith("data:")) return img;
        return `data:image/jpeg;base64,${img}`;
      }
      return "/default-book.png";
    },
    borrowBook(bookId) {
      if (!this.user) {
        this.$router.push({
          path: "/login",
          query: { redirect: `/borrow-book?bookId=${bookId}` } 
        });
        return;
      }
      this.$router.push({ path: "/borrow-book", query: { bookId } });
    }
  },
  mounted() {
    this.fetchBook();
  }
};
</script>

<style scoped>
.book-detail {
  padding: 2rem;
  max-width: 900px;
  margin: 0 auto;
}
.title {
  font-size: 2rem;
  font-weight: 700;
  margin-bottom: 1.5rem;
  text-align: center;
  color: #ffd700;
}
.detail-content {
  display: flex;
  flex-wrap: wrap;
  gap: 2rem;
  justify-content: center;
  align-items: flex-start;
  background-color: #1f1f2e;
  padding: 2rem;
  border-radius: 12px;
  box-shadow: 0 8px 20px rgba(0,0,0,0.3);
}
.book-img {
  width: 250px;
  height: 350px;
  object-fit: cover;
  border-radius: 10px;
  box-shadow: 0 5px 15px rgba(0,0,0,0.5);
}
.book-info {
  flex: 1;
  font-size: 1rem;
  color: #f0f0f0;
  min-width: 250px;
}
.book-info p {
  margin-bottom: 0.7rem;
}
.buttons {
  margin-top: 1.5rem;
  display: flex;
  gap: 1rem;
  flex-wrap: wrap;
}
.back-btn {
  background-color: #ffd700;
  color: #1f1f2e;
  border: none;
  border-radius: 25px;
  padding: 0.6rem 1.3rem;
  font-weight: 600;
  cursor: pointer;
  transition: 0.3s;
}
.back-btn:hover {
  background-color: #ffb700;
}
.borrow-btn {
  background-color: #28a745;
  color: white;
  border: none;
  border-radius: 25px;
  padding: 0.6rem 1.3rem;
  font-weight: 600;
  cursor: pointer;
  transition: 0.3s;
}
.borrow-btn:hover {
  background-color: #218838;
}
.loading-text {
  text-align: center;
  color: #ccc;
  font-size: 1.2rem;
  margin-top: 5rem;
}
</style>
