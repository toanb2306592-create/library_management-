<template>
  <div class="borrow-admin">
    <h2>Quản lý mượn sách</h2>

    <table>
      <thead>
        <tr>
          <th>Người mượn</th>
          <th>Sách</th>
          <th>Hình ảnh</th>
          <th>Ngày mượn</th>
          <th>Ngày trả</th>
          <th>Trạng thái</th>
          <th v-if="isAdmin">Hành động</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="b in borrows" :key="b._id">
          <td>{{ b.userName }}</td>
          <td>{{ b.book?.TenSach || b.MaSach }}</td>
          <td>
            <img v-if="b.book?.image" :src="b.book.image" alt="Bìa sách" />
            <span v-else>-</span>
          </td>
          <td>{{ formatDate(b.NgayMuon) }}</td>
          <td>{{ b.NgayTra ? formatDate(b.NgayTra) : "-" }}</td>
          <td>
            <span :class="statusClass(b.status)">{{ b.status }}</span>
          </td>
          <td v-if="isAdmin">
            <button v-if="b.status === 'Chưa duyệt'" @click="confirmBorrow(b._id, true)">Xác nhận</button>
            <button v-if="b.status === 'Chưa duyệt'" @click="confirmBorrow(b._id, false)">Từ chối</button>
            <button @click="deleteBorrow(b)" style="background-color:red; color:white;">Xóa</button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import borrowService from "@/services/borrow.service.js";
import axios from "axios";
import { store } from "@/store.js";

export default {
  data() {
    return {
      borrows: [],
    };
  },
  computed: {
    isAdmin() {
      return store.user?.email === "admin@gmail.com";
    },
  },
  mounted() {
    this.fetchBorrows();
  },
  methods: {
    async fetchBorrows() {
      try {
        const params = this.isAdmin ? {} : { MaDG: store.user._id };
        const res = await borrowService.getAll(params);

        const borrowsWithDetails = await Promise.all(
          res.data.map(async (b) => {
            let book = {};
            let userName = b.MaDG;

            try {
              const bookRes = await axios.get(`http://localhost:3000/api/books/${b.MaSach}`);
              book = bookRes.data;
            } catch (err) {
              console.error("Không lấy được thông tin sách:", b.MaSach, err);
            }

            if (this.isAdmin) {
              try {
                const userRes = await axios.get(`http://localhost:3000/api/readers/${b.MaDG}`);
                userName = `${userRes.data.HoLot} ${userRes.data.Ten}`;
              } catch (err) {
                console.error("Không lấy được thông tin người mượn:", b.MaDG, err);
              }
            }

            return { ...b, book, userName };
          })
        );

        this.borrows = borrowsWithDetails;
      } catch (err) {
        console.error("Lỗi fetch borrows:", err);
      }
    },

    formatDate(dateStr) {
      return new Date(dateStr).toLocaleDateString();
    },

    statusClass(status) {
      switch (status) {
        case "Đã xác nhận": return "status-confirmed";
        case "Chưa duyệt": return "status-pending";
        case "Mượn không thành công": return "status-failed";
        case "Đã trả": return "status-returned";
        default: return "";
      }
    },

    async confirmBorrow(id, approve) {
      try {
        await axios.patch(`http://localhost:3000/api/borrows/${id}/${approve ? 'confirm' : 'reject'}`);
        this.fetchBorrows();
      } catch (err) {
        console.error("Xác nhận mượn lỗi:", err);
      }
    },

    async deleteBorrow(borrow) {
  if (!confirm("Bạn có chắc muốn xóa phiếu mượn này?")) return;
  try {
    // Gọi service xóa theo _id
    await borrowService.delete(borrow._id);
    this.fetchBorrows(); // tải lại danh sách
  } catch (err) {
    console.error("Xóa phiếu mượn lỗi:", err);
  }
},


  },
};
</script>

<style scoped>
.borrow-admin table {
  width: 100%;
  border-collapse: collapse;
}
.borrow-admin th, td {
  padding: 0.5rem 1rem;
  border: 1px solid #ccc;
  text-align: center;
}
.borrow-admin img {
  width: 50px;
  height: 70px;
  object-fit: cover;
  border-radius: 5px;
}

.status-confirmed { color: green; font-weight: bold; }
.status-pending { color: orange; font-weight: bold; }
.status-failed { color: red; font-weight: bold; }
.status-returned { color: blue; font-weight: bold; }

button {
  margin: 0 3px;
  padding: 0.3rem 0.6rem;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}
button:hover { opacity: 0.8; }
</style>
