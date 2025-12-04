<template>
  <div class="borrow-history">
    <h2>Lịch sử mượn sách</h2>

    <table>
      <thead>
        <tr>
          <th>Sách</th>
          <th>Ngày mượn</th>
          <th>Ngày trả</th>
          <th>Trạng thái</th>
          <th v-if="isAdmin">Hành động</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="b in borrows" :key="b._id">
          <td>{{ b.MaSach }}</td>
          <td>{{ formatDate(b.NgayMuon) }}</td>
          <td>{{ b.NgayTra ? formatDate(b.NgayTra) : "-" }}</td>
          <td>
            <span :class="statusClass(b.status)">{{ b.status }}</span>
          </td>
          <td v-if="isAdmin">
            <button 
              v-if="b.status === 'Chưa duyệt'" 
              @click="confirmBorrow(b._id, true)">Xác nhận</button>
            <button 
              v-if="b.status === 'Chưa duyệt'" 
              @click="confirmBorrow(b._id, false)">Từ chối</button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
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
        // Nếu không phải admin chỉ lấy của chính mình
        const params = this.isAdmin ? {} : { MaDG: store.user._id };
        const res = await axios.get("http://localhost:3000/api/borrows", { params });
        this.borrows = res.data;
      } catch (err) {
        console.error(err);
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
        await axios.put(`http://localhost:3000/api/borrows/confirm/${id}`, { approve });
        this.fetchBorrows(); // refresh
      } catch (err) {
        console.error(err);
      }
    },
  },
};
</script>

<style scoped>
.borrow-history table {
  width: 100%;
  border-collapse: collapse;
}

.borrow-history th, td {
  padding: 0.5rem 1rem;
  border: 1px solid #ccc;
  text-align: center;
}

.status-confirmed { color: green; font-weight: bold; }
.status-pending { color: orange; font-weight: bold; }
.status-failed { color: red; font-weight: bold; }
.status-returned { color: blue; font-weight: bold; }

button {
  margin: 0 5px;
  padding: 0.3rem 0.6rem;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

button:hover {
  opacity: 0.8;
}
</style>
