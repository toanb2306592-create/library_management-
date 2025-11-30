<template>
  <div class="employee-list">
    <h2>Danh sách nhân viên</h2>

    <!-- Nút thêm nhân viên -->
    <button class="add-btn" @click="showAddModal = true">Thêm nhân viên</button>

    <!-- Modal thêm nhân viên -->
    <div v-if="showAddModal" class="modal-overlay">
      <div class="modal">
        <h3>Thêm nhân viên mới</h3>
        <div v-if="message" :class="['message', messageType]">{{ message }}</div>
        <form @submit.prevent="addEmployee">
          <input v-model="newEmployee.HoTenNV" placeholder="Họ tên" required />
          <input v-model="newEmployee.SoDienThoai" placeholder="Số điện thoại" required />
          <input v-model="newEmployee.Password" type="password" placeholder="Mật khẩu" required />
          <select v-model="newEmployee.ChucVu" required>
            <option disabled value="">Chọn chức vụ</option>
            <option>Thủ thư</option>
            <option>Quản lý</option>
            <option>Nhân viên vệ sinh</option>
          </select>
          <input v-model="newEmployee.DiaChi" placeholder="Địa chỉ" />
          <div class="modal-buttons">
            <button type="submit">Thêm</button>
            <button type="button" @click="closeModal">Hủy</button>
          </div>
        </form>
      </div>
    </div>

    <!-- Filter -->
    <div class="filters">
      <input v-model="searchName" placeholder="Tìm theo tên" />
      <select v-model="filterRole">
        <option value="">Tất cả chức vụ</option>
        <option>Thủ thư</option>
        <option>Quản lý</option>
        <option>Nhân viên vệ sinh</option>
      </select>
      <button @click="fetchEmployees">Lọc</button>
    </div>

    <!-- Table -->
    <div class="table-wrapper">
      <table>
        <thead>
          <tr>
            <th>#</th>
            <th>Họ tên</th>
            <th>SĐT</th>
            <th>Chức vụ</th>
            <th>Địa chỉ</th>
            <th>Hành động</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(emp, index) in employees" :key="emp._id">
            <td>{{ index + 1 }}</td>
            <td>{{ emp.HoTenNV }}</td>
            <td>{{ emp.SoDienThoai }}</td>
            <td>{{ emp.ChucVu }}</td>
            <td>{{ emp.DiaChi }}</td>
            <td>
              <button class="delete-btn" @click="deleteEmployee(emp._id)">Xóa</button>
            </td>
          </tr>
          <tr v-if="employees.length === 0">
            <td colspan="6" class="no-data">Không có dữ liệu</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
import axios from "axios";
const API_BASE_URL = "http://localhost:3000/api/employees";

export default {
  name: "EmployeeList",
  data() {
    return {
      employees: [],
      searchName: "",
      filterRole: "",
      showAddModal: false,
      newEmployee: { HoTenNV: "", SoDienThoai: "", Password: "", ChucVu: "", DiaChi: "" },
      message: "",
      messageType: ""
    };
  },
  methods: {
    async fetchEmployees() {
      try {
        const res = await axios.get(API_BASE_URL, {
          params: { HoTenNV: this.searchName || undefined, ChucVu: this.filterRole || undefined }
        });
        this.employees = res.data;
      } catch (err) {
        console.error("Lỗi khi lấy dữ liệu nhân viên:", err);
      }
    },
    async addEmployee() {
      try {
        const res = await axios.post(API_BASE_URL, this.newEmployee);
        this.employees.push(res.data);
        this.closeModal();
        this.message = "Thêm nhân viên thành công!";
        this.messageType = "success";
      } catch (err) {
        this.message = err.response?.data?.message || "Thêm nhân viên thất bại";
        this.messageType = "error";
      }
    },
    closeModal() {
      this.showAddModal = false;
      this.newEmployee = { HoTenNV:"", SoDienThoai:"", Password:"", ChucVu:"", DiaChi:"" };
      this.message = "";
      this.messageType = "";
    },
    async deleteEmployee(id) {
      if (!confirm("Bạn có chắc muốn xóa nhân viên này không?")) return;
      try {
        await axios.delete(`${API_BASE_URL}/${id}`);
        this.employees = this.employees.filter(emp => emp._id !== id);
        alert("Xóa nhân viên thành công!");
      } catch (err) {
        console.error("Lỗi khi xóa nhân viên:", err);
        alert(err.response?.data?.message || "Xóa nhân viên thất bại");
      }
    }
  },
  mounted() {
    this.fetchEmployees();
  }
};
</script>

<style scoped>
.employee-list {
  max-width: 900px;
  margin: 20px auto;
  font-family: Arial, sans-serif;
  color: #333;
}

/* Tiêu đề */
h2 {
  text-align: center;
  margin-bottom: 20px;
  color: #2a2f45;
}

/* Nút thêm nhân viên */
.add-btn {
  background: linear-gradient(90deg, #4CAF50, #45a049);
  color: #fff;
  padding: 10px 18px;
  border: none;
  border-radius: 10px;
  cursor: pointer;
  font-weight: 600;
  transition: 0.3s;
  box-shadow: 0 4px 8px rgba(0,0,0,0.2);
  margin-bottom: 15px;
}
.add-btn:hover {
  background: linear-gradient(90deg, #45a049, #3e8e41);
}

/* Modal overlay */
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0,0,0,0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
}

/* Modal box */
.modal {
  background-color: #fff;
  padding: 25px;
  border-radius: 12px;
  width: 400px;
  box-shadow: 0 10px 25px rgba(0,0,0,0.3);
  transition: all 0.3s ease;
}

/* Input và select trong modal */
.modal input,
.modal select {
  width: 100%;
  margin: 8px 0;
  padding: 8px 10px;
  border-radius: 6px;
  border: 1px solid #ccc;
  outline: none;
  transition: 0.2s;
}
.modal input:focus,
.modal select:focus {
  border-color: #4CAF50;
  box-shadow: 0 0 5px rgba(76,175,80,0.5);
}

/* Nút trong modal */
.modal button[type="submit"] {
  background: linear-gradient(90deg, #4CAF50, #45a049);
  color: #fff;
  padding: 10px 18px;
  border: none;
  border-radius: 10px;
  cursor: pointer;
  font-weight: 600;
  transition: 0.3s;
  box-shadow: 0 4px 8px rgba(0,0,0,0.2);
}
.modal button[type="submit"]:hover {
  background: linear-gradient(90deg, #45a049, #3e8e41);
}

/* Nút hủy modal */
.modal button[type="button"] {
  background-color: #f44336;
  color: #fff;
  padding: 8px 12px;
  border-radius: 8px;
  margin-left: 10px;
  cursor: pointer;
}
.modal button[type="button"]:hover {
  background-color: #da190b;
}

/* Message thành công hoặc lỗi */
.message {
  margin-bottom: 12px;
  padding: 8px;
  border-radius: 6px;
  font-weight: bold;
  text-align: center;
}
.message.success {
  background-color: #006400;
  color: #fff;
}
.message.error {
  background-color: #8b0000;
  color: #fff;
}

/* Filters */
.filters {
  margin-bottom: 15px;
  display: flex;
  gap: 10px;
  flex-wrap: wrap;
  justify-content: center;
}
.filters input,
.filters select,
.filters button {
  padding: 8px 12px;
  font-size: 14px;
  border-radius: 8px;
  border: 1px solid #ccc;
  outline: none;
  transition: 0.2s;
}
.filters input:focus,
.filters select:focus {
  border-color: #4CAF50;
  box-shadow: 0 0 5px rgba(76,175,80,0.4);
}
.filters button {
  background: linear-gradient(90deg, #4CAF50, #45a049);
  color: #fff;
  border: none;
  cursor: pointer;
  font-weight: 600;
  box-shadow: 0 4px 8px rgba(0,0,0,0.2);
}
.filters button:hover {
  background: linear-gradient(90deg, #45a049, #3e8e41);
}

/* Table */
.table-wrapper table {
  width: 100%;
  border-collapse: collapse;
  box-shadow: 0 2px 10px rgba(0,0,0,0.1);
  border-radius: 10px;
  overflow: hidden;
}
.table-wrapper table th,
.table-wrapper table td {
  padding: 12px 15px;
  text-align: left;
}
.table-wrapper table th {
  background-color: #4CAF50;
  color: #fff;
  font-weight: 600;
}
.table-wrapper table tr:nth-child(even) {
  background-color: #f7f7f7;
}
.table-wrapper table tr:hover {
  background-color: #e8f5e9;
}

/* Nút xóa trong table */
.delete-btn {
  padding: 6px 12px;
  font-size: 14px;
  background: linear-gradient(90deg, #4CAF50, #45a049);
  color: #fff;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  font-weight: 600;
  transition: 0.3s;
  box-shadow: 0 2px 6px rgba(0,0,0,0.2);
}
.delete-btn:hover {
  background: linear-gradient(90deg, #45a049, #3e8e41);
}

/* Không có dữ liệu */
.no-data {
  text-align: center;
  color: #999;
  font-style: italic;
}

/* Responsive */
@media (max-width: 600px) {
  .filters {
    flex-direction: column;
    align-items: stretch;
  }
  .table-wrapper table th,
  .table-wrapper table td {
    padding: 8px;
  }
  .modal {
    width: 90%;
  }
}

</style>
