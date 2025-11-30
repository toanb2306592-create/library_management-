<template>
  <div class="borrow-management-page">
    <h2 class="title">Quản lý mượn sách</h2>

    <!-- Form nhập -->
    <div class="form-container">
      <!-- Thông tin đọc giả -->
      <div class="reader-info">
        <h3>Thông tin đọc giả</h3>
        <input v-model="reader.HoLot" placeholder="Họ lót" />
        <input v-model="reader.Ten" placeholder="Tên" />
        <input type="date" v-model="reader.NgaySinh" />
        <select v-model="reader.Phai">
          <option value="">Chọn phái</option>
          <option value="Nam">Nam</option>
          <option value="Nữ">Nữ</option>
        </select>
        <input v-model="reader.DiaChi" placeholder="Địa chỉ" />
        <input v-model="reader.SoDT" placeholder="Số điện thoại" />
      </div>

      <!-- Chọn sách -->
      <div class="select-book">
        <h3>Chọn sách</h3>
        <select v-model="selectedBookId">
          <option value="" disabled>-- Chọn sách --</option>
          <option v-for="book in books" :key="book._id" :value="book._id">
            {{ book.TenSach }} (NXB: {{ book.MaNXB }}) - {{ book.SoQuyen }} quyển
          </option>
        </select>

        <label>Ngày mượn: <input type="date" v-model="borrowDate" /></label>
        <label>Ngày trả: <input type="date" v-model="returnDate" /></label>
      </div>
    </div>

    <button class="confirm-btn" @click="confirmBorrow">Xác nhận mượn sách</button>
    <p v-if="message" :class="{'success-msg': success, 'error-msg': !success}">{{ message }}</p>

    <!-- Tìm kiếm -->
    <div class="search-container">
      <input v-model="searchText" placeholder="Tìm theo tên đọc giả, sách, NXB, ngày mượn..." />
    </div>

    <!-- Danh sách mượn sách -->
    <div class="borrow-list">
      <h3>Danh sách mượn sách</h3>
      <table>
        <thead>
          <tr>
            <th>Mã DG</th>
            <th>Họ tên</th>
            <th>Sách</th>
            <th>NXB</th>
            <th>Ngày mượn</th>
            <th>Ngày trả</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="borrow in filteredBorrows" :key="borrow._id">
            <td>{{ borrow.MaDG }}</td>
            <td>{{ borrow.readerName }}</td>
            <td>{{ borrow.bookName }}</td>
            <td>{{ borrow.bookNXB }}</td>
            <td>{{ borrow.NgayMuon }}</td>
            <td>{{ borrow.NgayTra || '-' }}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "BorrowManagement",
  data() {
    return {
      books: [],
      borrows: [],
      reader: {
        HoLot: "",
        Ten: "",
        NgaySinh: "",
        Phai: "",
        DiaChi: "",
        SoDT: ""
      },
      selectedBookId: "",
      borrowDate: new Date().toISOString().split("T")[0],
      returnDate: "",
      message: "",
      success: true,
      searchText: ""
    };
  },
  computed: {
    filteredBorrows() {
      if (!this.searchText) return this.borrows;
      const text = this.searchText.toLowerCase();
      return this.borrows.filter(b =>
        b.readerName.toLowerCase().includes(text) ||
        b.bookName.toLowerCase().includes(text) ||
        b.bookNXB.toLowerCase().includes(text) ||
        (b.NgayMuon && b.NgayMuon.includes(text))
      );
    }
  },
  methods: {
    async fetchBooks() {
      try {
        const res = await axios.get("http://localhost:3000/api/books");
        this.books = res.data;
      } catch (err) {
        console.error("Lỗi khi lấy sách:", err);
      }
    },
    async fetchBorrows() {
      try {
        const res = await axios.get("http://localhost:3000/api/borrows");
        this.borrows = await Promise.all(
          res.data.map(async b => {
            const readerRes = await axios.get(`http://localhost:3000/api/readers/by-name?HoLot=${b.HoLot || ""}&Ten=${b.Ten || ""}`);
            const bookRes = await axios.get(`http://localhost:3000/api/books/${b.MaSach}`);
            return {
              ...b,
              readerName: readerRes.data.HoLot + " " + readerRes.data.Ten,
              bookName: bookRes.data.TenSach,
              bookNXB: bookRes.data.MaNXB
            };
          })
        );
      } catch (err) {
        console.error("Lỗi khi lấy danh sách mượn:", err);
      }
    },
    async confirmBorrow() {
      if (!this.selectedBookId || !this.borrowDate || !this.reader.Ten || !this.reader.HoLot) {
        this.message = "Vui lòng điền đầy đủ thông tin!";
        this.success = false;
        return;
      }
      try {
        // Tạo phiếu mượn
        await axios.post("http://localhost:3000/api/borrows", {
          ...this.reader,
          MaSach: this.selectedBookId,
          NgayTra: this.returnDate || null
        });

        this.message = "Xác nhận mượn sách thành công!";
        this.success = true;

        // Reset form
        this.selectedBookId = "";
        this.returnDate = "";
        this.borrowDate = new Date().toISOString().split("T")[0];
        this.reader = {
          HoLot: "",
          Ten: "",
          NgaySinh: "",
          Phai: "",
          DiaChi: "",
          SoDT: ""
        };

        // Load lại danh sách
        this.fetchBorrows();
      } catch (err) {
        console.error(err);
        this.message = err.response?.data?.message || "Có lỗi xảy ra, vui lòng thử lại.";
        this.success = false;
      }
    }
  },
  mounted() {
    this.fetchBooks();
    this.fetchBorrows();
  }
};
</script>

<style scoped>
.borrow-management-page {
  max-width: 1000px;
  margin: 2rem auto;
  padding: 2rem;
  background: #fff;
  border-radius: 12px;
  box-shadow: 0 10px 25px rgba(0,0,0,0.1);
}
.title {
  text-align: center;
  font-size: 2rem;
  font-weight: 700;
  margin-bottom: 2rem;
}
.form-container {
  display: flex;
  gap: 2rem;
  flex-wrap: wrap;
}
.reader-info, .select-book {
  flex: 1;
  min-width: 250px;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}
input, select {
  padding: 0.5rem;
  border-radius: 6px;
  border: 1px solid #ccc;
}
.confirm-btn {
  margin-top: 1.5rem;
  background-color: #ffd700;
  color: #2a2f45;
  border: none;
  padding: 0.7rem 1.5rem;
  border-radius: 25px;
  font-weight: 600;
  cursor: pointer;
}
.confirm-btn:hover {
  background-color: #ffb700;
}
.message {
  margin-top: 1rem;
  text-align: center;
  font-weight: 500;
}
.success-msg { color: green; }
.error-msg { color: red; }
.search-container {
  margin: 2rem 0 1rem;
}
.search-container input {
  width: 100%;
  padding: 0.5rem;
  border-radius: 6px;
  border: 1px solid #ccc;
}
.borrow-list table {
  width: 100%;
  border-collapse: collapse;
}
.borrow-list th, .borrow-list td {
  border: 1px solid #ccc;
  padding: 0.5rem;
  text-align: center;
}
.borrow-list th {
  background-color: #f0f0f0;
}
</style>
