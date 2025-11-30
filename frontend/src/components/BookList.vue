<template>
  <div class="book-list">
    <h2 class="text-center text-2xl font-bold mb-6">Tất cả sách theo NXB</h2>

    <div
      v-for="publisher in publishersWithBooks"
      :key="publisher.TenNXB"
      class="publisher-section"
    >
      <h3 class="publisher-title">{{ publisher.TenNXB }}</h3>

      <div class="book-grid">
        <div v-for="book in publisher.books" :key="book._id" class="book-card">
          <img :src="getBookImage(book)" alt="book cover" />
          <h4>{{ book.TenSach }}</h4>
          <p>Đơn giá: {{ book.DonGia }} VNĐ</p>
          <p>Số quyển: {{ book.SoQuyen }}</p>
          <button @click="viewBook(book._id)">Xem thông tin</button>
        </div>
      </div>
    </div>

    <div v-if="publishersWithBooks.length === 0" class="text-center text-gray-500">
      Chưa có sách nào
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "BookList",
  data() {
    return {
      books: [],
      publishers: []
    };
  },
  computed: {
    publishersWithBooks() {
      // Nhóm sách theo TenNXB
      const map = {};
      this.books.forEach(book => {
        const key = book.TenNXB || "NXB không xác định";
        if (!map[key]) map[key] = { TenNXB: key, books: [] };
        map[key].books.push(book);
      });
      return Object.values(map);
    }
  },
  methods: {
    async fetchBooksAndPublishers() {
      try {
        const [booksRes, publishersRes] = await Promise.all([
          axios.get("http://localhost:3000/api/books"),
          axios.get("http://localhost:3000/api/publishers")
        ]);

        const publishers = publishersRes.data; // [{MaNXB, TenNXB}, ...]
        const books = booksRes.data.map(b => {
          const nxb = publishers.find(p => p.MaNXB === b.MaNXB);
          return {
            ...b,
            TenNXB: nxb ? nxb.TenNXB : "NXB không xác định"
          };
        });

        this.books = books;
        this.publishers = publishers;
      } catch (err) {
        console.error("Lỗi khi lấy sách hoặc NXB:", err);
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
    viewBook(id) {
      this.$router.push({ path: `/books/${id}` });
    }
  },
  mounted() {
    this.fetchBooksAndPublishers();
  }
};
</script>

<style scoped>
.book-list {
  padding: 2rem;
}

.publisher-section {
  margin-bottom: 3rem;
}

.publisher-title {
  font-size: 1.5rem;
  font-weight: 600;
  margin-bottom: 1rem;
  color: #ffd700;
  border-bottom: 2px solid #ffd700;
  padding-bottom: 0.3rem;
}

.book-grid {
  display: flex;
  flex-wrap: wrap;
  gap: 1.5rem;
  justify-content: center;
}

.book-card {
  background-color: #1f1f2e;
  color: #f0f0f0;
  border-radius: 10px;
  width: 180px;
  text-align: center;
  padding: 1rem;
  transition: transform 0.3s, box-shadow 0.3s;
}

.book-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 8px 20px rgba(255, 215, 0, 0.4);
}

.book-card img {
  width: 100%;
  height: 200px;
  object-fit: cover;
  border-radius: 5px;
  margin-bottom: 0.5rem;
}

.book-card h4 {
  font-size: 1rem;
  margin: 0.5rem 0 0.3rem;
  color: #ffd700;
}

.book-card p {
  font-size: 0.85rem;
  color: #ccc;
  margin-bottom: 0.3rem;
}

.book-card button {
  background-color: #ffd700;
  color: #1f1f2e;
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
