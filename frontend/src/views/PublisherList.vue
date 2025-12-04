<template>
  <div class="publisher-list">
    <h2>Quản lý Nhà Xuất Bản</h2>

    <!-- Nút thêm NXB -->
    <button class="add-btn" @click="showAddModal = true">Thêm NXB</button>

    <!-- Modal thêm/sửa NXB -->
    <div v-if="showAddModal" class="modal-overlay">
      <div class="modal">
        <h3>{{ editingPublisher ? "Sửa NXB" : "Thêm NXB mới" }}</h3>
        <div v-if="message" :class="['message', messageType]">{{ message }}</div>

        <form @submit.prevent="editingPublisher ? updatePublisher() : addPublisher()">
          <input v-model="currentPublisher.MaNXB" placeholder="Mã NXB" required />
          <input v-model="currentPublisher.TenNXB" placeholder="Tên NXB" required />
          <input v-model="currentPublisher.DiaChi" placeholder="Địa chỉ" />

          <div class="modal-buttons">
            <button type="submit">{{ editingPublisher ? "Lưu" : "Thêm" }}</button>
            <button type="button" @click="closeModal">Hủy</button>
          </div>
        </form>
      </div>
    </div>

    <!-- Filter -->
    <div class="filters">
      <input v-model="searchName" placeholder="Tìm theo tên NXB" />
      <button @click="fetchPublishers">Lọc</button>
    </div>

    <!-- Table -->
    <div class="table-wrapper">
      <table>
        <thead>
          <tr>
            <th>#</th>
            <th>Mã NXB</th>
            <th>Tên NXB</th>
            <th>Địa chỉ</th>
            <th>Hành động</th>
          </tr>
        </thead>

        <tbody>
          <tr v-for="(pub, index) in filteredPublishers" :key="pub._id">
            <td>{{ index + 1 }}</td>
            <td>{{ pub.MaNXB }}</td>
            <td>{{ pub.TenNXB }}</td>
            <td>{{ pub.DiaChi }}</td>
            <td>
              <button class="edit-btn" @click="editPublisher(pub)">Sửa</button>
              <button class="delete-btn" @click="deletePublisher(pub._id)">Xóa</button>
            </td>
          </tr>

          <tr v-if="filteredPublishers.length === 0">
            <td colspan="5" class="no-data">Không có dữ liệu</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
import PublisherService from "@/services/publisher.service";

export default {
  name: "PublisherList",

  data() {
    return {
      publishers: [],
      searchName: "",
      showAddModal: false,
      editingPublisher: false,
      currentPublisher: { MaNXB: "", TenNXB: "", DiaChi: "" },
      message: "",
      messageType: ""
    };
  },

  computed: {
    filteredPublishers() {
      if (!this.searchName) return this.publishers;
      return this.publishers.filter(pub =>
        pub.TenNXB.toLowerCase().includes(this.searchName.toLowerCase())
      );
    }
  },

  methods: {
    async fetchPublishers() {
      try {
        const res = await PublisherService.getAll();
        this.publishers = res.data;
      } catch (err) {
        console.error(err);
      }
    },

    async addPublisher() {
      try {
        const res = await PublisherService.create(this.currentPublisher);
        this.publishers.push(res.data);

        this.closeModal();
        this.message = "Thêm NXB thành công!";
        this.messageType = "success";
      } catch (err) {
        this.message = err.response?.data?.message || "Thêm NXB thất bại";
        this.messageType = "error";
      }
    },

    editPublisher(pub) {
      this.editingPublisher = true;
      this.showAddModal = true;
      this.currentPublisher = { ...pub };
    },

     async updatePublisher() {
      try {
        await PublisherService.update(this.currentPublisher._id, this.currentPublisher);

        // cập nhật ngay trong mảng
        const index = this.publishers.findIndex(p => p._id === this.currentPublisher._id);
        if (index !== -1) {
          this.publishers[index] = { ...this.currentPublisher };
        }

        this.message = "Cập nhật thành công!";
        this.messageType = "success";
        this.closeModal();
      } catch (err) {
        this.message = err.response?.data?.message;
        this.messageType = "error";
      }
    },

    async deletePublisher(id) {
      if (!confirm("Bạn chắc chắn muốn xóa?")) return;

      await PublisherService.delete(id);
      this.publishers = this.publishers.filter(p => p._id !== id);
    },

    closeModal() {
      this.showAddModal = false;
      this.editingPublisher = false;
      this.currentPublisher = { MaNXB: "", TenNXB: "", DiaChi: "" };
      this.message = "";
      this.messageType = "";
    },

    // ✅ Xóa NXB – API hoạt động đủ
    async deletePublisher(id) {
      if (!confirm("Bạn có chắc muốn xóa nhà xuất bản này không?")) return;

      try {
        await PublisherService.delete(id);
        alert("Xóa thành công!");

        // Load lại danh sách
        this.fetchPublishers();

      } catch (error) {
        console.error(error);
        alert(error.response?.data?.message || "Lỗi khi xóa");
      }
    },
  },

  mounted() {
    this.fetchPublishers();
  }
};
</script>

<style scoped>
/* Reuse style giống Employee/Sách */
.publisher-list {
  max-width: 900px;
  margin: 20px auto;
  font-family: Arial, sans-serif;
  color: #333;
}
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
.modal input { width:100%; margin:8px 0; padding:8px 10px; border-radius:6px; border:1px solid #ccc; outline:none; transition:0.2s; }
.modal input:focus { border-color:#4CAF50; box-shadow:0 0 5px rgba(76,175,80,0.5); }
.message { margin-bottom:12px; padding:8px; border-radius:6px; font-weight:bold; text-align:center; }
.message.success { background-color:#006400; color:#fff; }
.message.error { background-color:#8b0000; color:#fff; }
.filters { margin-bottom:15px; display:flex; gap:10px; flex-wrap:wrap; justify-content:center; }
.filters input, .filters select, .filters button { padding:8px 12px; font-size:14px; border-radius:8px; border:1px solid #ccc; outline:none; transition:0.2s; }
.filters input:focus, .filters select:focus { border-color:#4CAF50; box-shadow:0 0 5px rgba(76,175,80,0.4); }
.table-wrapper table { width:100%; border-collapse:collapse; box-shadow:0 2px 10px rgba(0,0,0,0.1); border-radius:10px; overflow:hidden; }
.table-wrapper table th, .table-wrapper table td { padding:12px 15px; text-align:left; }
.table-wrapper table th { background-color:#4CAF50; color:#fff; font-weight:600; }
.table-wrapper table tr:nth-child(even) { background-color:#f7f7f7; }
.table-wrapper table tr:hover { background-color:#e8f5e9; }
.no-data { text-align:center; color:#999; }
@media(max-width:600px){.filters{flex-direction:column;align-items:stretch}.table-wrapper table th,.table-wrapper table td{padding:8px}.modal{width:90%;}}
</style>
