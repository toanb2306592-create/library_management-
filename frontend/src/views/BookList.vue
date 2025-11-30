<template>
  <div class="book-list">
    <h2>Quản lý sách</h2>

    <!-- Nút thêm sách -->
    <button class="add-btn" @click="openAddModal">Thêm sách</button>

    <!-- Modal thêm/sửa sách -->
    <div v-if="showModal" class="modal-overlay">
      <div class="modal">
        <h3>{{ editingBook ? "Sửa sách" : "Thêm sách mới" }}</h3>

        <div v-if="message" :class="['message', messageType]">{{ message }}</div>

        <form @submit.prevent="editingBook ? updateBook() : addBook()">
          <input v-model="currentBook.MaSach" placeholder="Mã sách" required />
          <input v-model="currentBook.TenSach" placeholder="Tên sách" required />
          <input type="number" v-model.number="currentBook.DonGia" placeholder="Đơn giá" required />
          <input type="number" v-model.number="currentBook.SoQuyen" placeholder="Số quyển" required />
          <input type="number" v-model.number="currentBook.NamXuatBan" placeholder="Năm xuất bản" required />

          <select v-model="currentBook.MaNXB" required>
            <option value="" disabled>Chọn NXB</option>
            <option v-for="nxb in publishers" :key="nxb._id" :value="nxb.MaNXB">{{ nxb.TenNXB }}</option>
          </select>

          <input type="file" accept="image/*" multiple @change="handleImageUpload" />
          <div v-if="currentBook.imagePreview.length" class="preview-images">
            <img v-for="(img, idx) in currentBook.imagePreview" :key="idx" :src="img" />
          </div>

          <div class="modal-buttons">
            <button type="submit">{{ editingBook ? "Lưu" : "Thêm" }}</button>
            <button type="button" @click="closeModal">Hủy</button>
          </div>
        </form>
      </div>
    </div>

    <!-- Filter -->
    <div class="filters">
      <input v-model="searchName" placeholder="Tìm theo tên sách" />
      <select v-model="searchNXB">
        <option value="">Tất cả NXB</option>
        <option v-for="nxb in publishers" :key="nxb._id" :value="nxb.MaNXB">{{ nxb.TenNXB }}</option>
      </select>
      <button @click="fetchBooks">Lọc</button>
    </div>

    <!-- Table -->
    <div class="table-wrapper">
      <table>
        <thead>
          <tr>
            <th>#</th>
            <th>Ảnh</th>
            <th>Mã sách</th>
            <th>Tên sách</th>
            <th>Đơn giá</th>
            <th>Số quyển</th>
            <th>Năm XB</th>
            <th>Mã NXB</th>
            <th>Hành động</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(book, index) in books" :key="book._id">
            <td>{{ index + 1 }}</td>
            <td class="table-images">
              <img v-for="(img, idx) in getBookImages(book)" :key="idx" :src="img" class="table-img" />
            </td>
            <td>{{ book.MaSach }}</td>
            <td>{{ book.TenSach }}</td>
            <td>{{ book.DonGia }}</td>
            <td>{{ book.SoQuyen }}</td>
            <td>{{ book.NamXuatBan }}</td>
            <td>{{ book.MaNXB }}</td>
            <td>
              <button class="edit-btn" @click="editBook(book)">Sửa</button>
              <button class="delete-btn" @click="deleteBook(book._id)">Xóa</button>
            </td>
          </tr>
          <tr v-if="books.length === 0">
            <td colspan="9" class="no-data">Không có dữ liệu</td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- Toast -->
    <div class="toast-container">
      <div v-if="message" :class="['toast', messageType]">{{ message }}</div>
    </div>
  </div>
</template>

<script>
import BookService from "@/services/book.service";
import PublisherService from "@/services/publisher.service";

export default {
  data() {
    return {
      books: [],
      publishers: [],
      searchName: "",
      searchNXB: "",
      showModal: false,
      editingBook: false,
      currentBook: {
        _id: null,
        MaSach: "",
        TenSach: "",
        DonGia: 0,
        SoQuyen: 0,
        NamXuatBan: new Date().getFullYear(),
        MaNXB: "",
        image: [],
        imagePreview: []
      },
      message: "",
      messageType: ""
    };
  },
  methods: {
    async fetchBooks() {
      try {
        const res = await BookService.getAll({
          TenSach: this.searchName || undefined,
          MaNXB: this.searchNXB || undefined
        });
        this.books = res.data;
      } catch (err) {
        this.showError(err.response?.data?.message || "Lỗi khi lấy sách");
      }
    },

    async fetchPublishers() {
      try {
        const res = await PublisherService.getAll();
        this.publishers = res.data;
      } catch (err) {
        console.error(err);
      }
    },

    openAddModal() {
      this.editingBook = false;
      this.showModal = true;
      this.resetCurrentBook();
    },

    handleImageUpload(event) {
      const files = Array.from(event.target.files);
      if (!files.length) return;

      this.currentBook.imagePreview = [];
      this.currentBook.image = [];

      files.forEach(file => {
        const reader = new FileReader();
        reader.onload = e => {
          this.currentBook.imagePreview.push(e.target.result);
          this.currentBook.image.push(e.target.result);
        };
        reader.readAsDataURL(file);
      });
    },

    async addBook() {
      try {
        await BookService.create(this.currentBook);
        this.showSuccess("Thêm sách thành công!");
        this.closeModal();
        await this.fetchBooks(); // reload bảng
      } catch (err) {
        this.showError(err.response?.data?.message || "Thêm sách thất bại");
      }
    },

    editBook(book) {
      this.editingBook = true;
      this.showModal = true;
      this.currentBook = {
        ...book,
        imagePreview: Array.isArray(book.image) ? [...book.image] : book.image ? [book.image] : [],
        image: Array.isArray(book.image) ? [...book.image] : book.image ? [book.image] : []
      };
    },

    async updateBook() {
      try {
        await BookService.update(this.currentBook._id, this.currentBook);

        this.showSuccess("Sửa sách thành công!");
        this.closeModal();

        // Reload dữ liệu mới từ backend
        await this.fetchBooks();
      } catch (err) {
        this.showError(err.response?.data?.message || "Cập nhật thất bại");
      }
    },

    async deleteBook(id) {
      if (!confirm("Bạn có chắc muốn xóa sách này không?")) return;
      try {
        await BookService.delete(id);
        this.showSuccess("Xóa sách thành công");
        await this.fetchBooks(); // reload bảng
      } catch (err) {
        this.showError(err.response?.data?.message || "Xóa thất bại");
      }
    },

    closeModal() {
      this.showModal = false;
      this.editingBook = false;
      this.resetCurrentBook();
      this.message = "";
      this.messageType = "";
    },

    resetCurrentBook() {
      this.currentBook = {
        _id: null,
        MaSach: "",
        TenSach: "",
        DonGia: 0,
        SoQuyen: 0,
        NamXuatBan: new Date().getFullYear(),
        MaNXB: "",
        image: [],
        imagePreview: []
      };
    },

    getBookImages(book) {
      if (!book.image) return [];
      return Array.isArray(book.image)
        ? book.image
        : book.image.startsWith("data:")
          ? [book.image]
          : [`data:image/jpeg;base64,${book.image}`];
    },

    showSuccess(msg) {
      this.message = msg;
      this.messageType = "success";
      setTimeout(() => { this.message = ""; }, 2500);
    },

    showError(msg) {
      this.message = msg;
      this.messageType = "error";
      setTimeout(() => { this.message = ""; }, 2500);
    }
  },

  mounted() {
    this.fetchBooks();
    this.fetchPublishers();
  }
};
</script>

<style scoped>
.book-list { max-width:1000px; margin:20px auto; font-family:Arial,sans-serif; color:#333; }
h2 { text-align:center; margin-bottom:20px; color:#2a2f45; }

.add-btn, .filters button, .edit-btn, .delete-btn, .modal button[type="submit"] {
  background: linear-gradient(90deg,#4CAF50,#45a049); color:#fff; padding:10px 18px; border:none; border-radius:10px;
  cursor:pointer; font-weight:600; transition:0.3s; box-shadow:0 4px 8px rgba(0,0,0,0.2);
}
.add-btn:hover, .filters button:hover, .edit-btn:hover, .delete-btn:hover, .modal button[type="submit"]:hover {
  background: linear-gradient(90deg,#45a049,#3e8e41);
}
.edit-btn, .delete-btn { padding:6px 12px; font-size:14px; margin-right:5px; }
.modal button[type="button"] { background-color:#f44336; color:#fff; padding:8px 12px; border-radius:8px; }
.modal button[type="button"]:hover { background-color:#da190b; }

.modal-overlay { position:fixed; top:0; left:0; width:100%; height:100%; background-color:rgba(0,0,0,0.5); display:flex; justify-content:center; align-items:center; z-index:1000; }
.modal { background-color:#fff; padding:25px; border-radius:12px; width:400px; box-shadow:0 10px 25px rgba(0,0,0,0.3); }
.modal input, .modal select { width:100%; margin:8px 0; padding:8px 10px; border-radius:6px; border:1px solid #ccc; outline:none; transition:0.2s; }
.modal input:focus, .modal select:focus { border-color:#4CAF50; box-shadow:0 0 5px rgba(76,175,80,0.5); }

.preview-images { display:flex; gap:10px; flex-wrap:wrap; margin-top:5px; }
.preview-images img { width:80px; height:100px; object-fit:cover; border-radius:5px; }

.table-images { display:flex; gap:5px; flex-wrap:wrap; }
.table-img { width:50px; height:70px; object-fit:cover; border-radius:4px; }

.filters { margin-bottom:15px; display:flex; gap:10px; flex-wrap:wrap; justify-content:center; }
.filters input, .filters select, .filters button { padding:8px 12px; font-size:14px; border-radius:8px; border:1px solid #ccc; outline:none; transition:0.2s; }
.filters input:focus, .filters select:focus { border-color:#4CAF50; box-shadow:0 0 5px rgba(76,175,80,0.4); }

.table-wrapper table { width:100%; border-collapse:collapse; box-shadow:0 2px 10px rgba(0,0,0,0.1); border-radius:10px; overflow:hidden; }
.table-wrapper table th, .table-wrapper table td { padding:12px 15px; text-align:left; }
.table-wrapper table th { background-color:#4CAF50; color:#fff; font-weight:600; }
.table-wrapper table tr:nth-child(even) { background-color:#f7f7f7; }
.table-wrapper table tr:hover { background-color:#e8f5e9; }

.no-data { text-align:center; color:#999; }

.toast-container {
  position: fixed;
  top: 20px;
  right: 20px;
  z-index: 2000;
}
.toast {
  margin-bottom: 10px;
  padding: 12px 18px;
  border-radius: 8px;
  color: #fff;
  font-weight: bold;
  box-shadow: 0 4px 10px rgba(0,0,0,0.2);
  animation: slide-in 0.3s ease;
}
.toast.success { background-color: #4CAF50; }
.toast.error { background-color: #f44336; }

@keyframes slide-in {
  from { opacity: 0; transform: translateX(100%); }
  to { opacity: 1; transform: translateX(0); }
}

@media(max-width:600px){
  .filters{flex-direction:column;align-items:stretch}
  .table-wrapper table th,.table-wrapper table td{padding:8px}
  .modal{width:90%;} 
}
</style>
