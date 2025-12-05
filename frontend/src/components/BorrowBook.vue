<template>
  <div class="borrow-book">
    <h2>Mượn sách</h2>

    <form @submit.prevent="submitBorrow">
      <div class="form-group">
        <label>Chọn sách:</label>
        <select v-model="form.MaSach" required>
          <option value="">-- Chọn sách --</option>
          <option v-for="book in books" :key="book._id" :value="book._id">
            {{ book.TenSach }} ({{ book.SoQuyen }} quyển)
          </option>
        </select>
      </div>

      <div class="form-group">
        <label>Ngày mượn:</label>
        <input type="date" v-model="form.NgayMuon" required />
      </div>

      <div class="form-group">
        <label>Ngày trả dự kiến:</label>
        <input type="date" v-model="form.NgayTra" required />
      </div>

      <button type="submit">Đặt mượn</button>
    </form>

    <p v-if="message" :class="['borrow-message', messageType]">{{ message }}</p>

    <h3>Lịch sử mượn</h3>
    <div v-if="borrowHistory.length === 0">Bạn chưa mượn sách nào.</div>
    <ul class="borrow-history">
      <li v-for="b in borrowHistory" :key="b._id" class="borrow-item">
        <img :src="b.book.image" alt="Bìa sách" />
        <div class="borrow-info">
          <strong>{{ b.book.TenSach }}</strong>
          <p>Ngày mượn: {{ b.NgayMuon }}</p>
          <p>Ngày trả dự kiến: {{ b.NgayTra || "Chưa trả" }}</p>
          <p>Trạng thái: <span :class="b.status === 'Đã xác nhận' ? 'confirmed' : (b.status === 'Chưa duyệt' ? 'pending' : 'rejected')">{{ b.status }}</span></p>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
import axios from "axios";
import { store } from "@/store.js";

export default {
  data() {
    return {
      books: [],
      form: {
        MaSach: "",
        NgayMuon: "",
        NgayTra: "",
        MaDG: store.user?._id || "",
        status: "Chưa duyệt",
      },
      message: "",
      messageType: "",
      borrowHistory: [],
    };
  },
  mounted() {
    this.fetchBooks();

    const bookId = this.$route.query.bookId;
    if (bookId) {
      this.form.MaSach = bookId;
    }
    this.fetchBorrowHistory();
  },
  methods: {
    async fetchBooks() {
      try {
        const res = await axios.get("http://localhost:3000/api/books");
        this.books = res.data;
      } catch (err) {
        console.error(err);
      }
    },

    async fetchBorrowHistory() {
      try {
        const res = await axios.get(`http://localhost:3000/api/borrows?MaDG=${store.user._id}`);
        const history = await Promise.all(res.data.map(async (b) => {
          const bookRes = await axios.get(`http://localhost:3000/api/books/${b.MaSach}`);
          return { ...b, book: bookRes.data };
        }));
        this.borrowHistory = history;
      } catch (err) {
        console.error(err);
      }
    },

    async submitBorrow() {
      if (new Date(this.form.NgayTra) <= new Date(this.form.NgayMuon)) {
        this.message = "Ngày trả phải lớn hơn ngày mượn";
        this.messageType = "error";
        return;
      }

      try {
        const res = await axios.post("http://localhost:3000/api/borrows", this.form);
        this.message = "Đặt mượn thành công, chờ admin xác nhận!";
        this.messageType = "success";

        this.form.MaSach = "";
        this.form.NgayMuon = "";
        this.form.NgayTra = "";

        this.fetchBorrowHistory();
      } catch (err) {
        this.message = err.response?.data?.message || "Đặt mượn thất bại";
        this.messageType = "error";
      }
    },
  },
};
</script>

<style scoped>
.borrow-book {
  max-width: 600px;
  margin: 2rem auto;
  padding: 1rem 2rem;
  border: 1px solid #ccc;
  border-radius: 10px;
}

.borrow-book h2, .borrow-book h3 { text-align: center; }

.form-group { margin-bottom: 1rem; }

input, select {
  width: 100%;
  padding: 0.5rem;
  border-radius: 5px;
  border: 1px solid #ccc;
}

button {
  background-color: #ffd700;
  color: #2a2f45;
  border: none;
  padding: 0.5rem 1rem;
  border-radius: 5px;
  cursor: pointer;
  margin-top: 0.5rem;
}

button:hover { opacity: 0.8; }

.borrow-message.success { color: green; font-weight: bold; }
.borrow-message.error { color: red; font-weight: bold; }

.borrow-history { list-style: none; padding: 0; margin-top: 1rem; }
.borrow-item { display: flex; gap: 1rem; margin-bottom: 1rem; border-bottom: 1px solid #ccc; padding-bottom: 0.5rem; }
.borrow-item img { width: 60px; height: 80px; object-fit: cover; border-radius: 5px; }
.borrow-info { flex: 1; }
.confirmed { color: green; font-weight: bold; }
.pending { color: orange; font-weight: bold; }
.rejected { color: red; font-weight: bold; }
</style>
