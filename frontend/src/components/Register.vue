<template>
  <div class="auth-page">
    <div class="auth-container">
      <h2>Đăng ký đọc giả</h2>
      <p class="sub">Tạo tài khoản để mượn sách và quản lý hồ sơ</p>

      <form @submit.prevent="submitForm">
        <div class="row">
          <div class="form-group">
            <label>Họ lót</label>
            <input v-model="form.HoLot" type="text" required />
          </div>
          <div class="form-group">
            <label>Tên</label>
            <input v-model="form.Ten" type="text" required />
          </div>
        </div>

        <div class="form-group">
          <label>Ngày sinh</label>
          <input v-model="form.NgaySinh" type="date" required />
        </div>

        <div class="form-group">
          <label>Phái</label>
          <select v-model="form.Phai" required>
            <option value="">--Chọn phái--</option>
            <option>Nam</option>
            <option>Nữ</option>
          </select>
        </div>

        <div class="form-group">
          <label>Địa chỉ</label>
          <input v-model="form.DiaChi" type="text" required />
        </div>

        <div class="form-group">
          <label>Điện thoại</label>
          <input v-model="form.DienThoai" type="text" required />
        </div>

        <div class="form-group">
          <label>Email</label>
          <input v-model="form.email" type="email" required />
        </div>

        <div class="form-group">
          <label>Mật khẩu</label>
          <input v-model="form.password" type="password" required />
        </div>

        <button class="btn-submit" type="submit">Đăng ký</button>

        <div class="auth-switch">
          Đã có tài khoản? <router-link to="/login">Đăng nhập</router-link>
        </div>

        <div v-if="message" :class="['auth-message', messageType === 'success' ? 'success' : 'error']">
          {{ message }}
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import "@/assets/auth.css";

export default {
  data() {
    return {
      form: {
        HoLot: "",
        Ten: "",
        NgaySinh: "",
        Phai: "",
        DiaChi: "",
        DienThoai: "",
        email: "",
        password: "",
      },
      message: "",
      messageType: ""
    };
  },
  methods: {
    async submitForm() {
      try {
        // dùng full URL cho chắc (nếu bạn có axios instance với baseURL thì dùng /readers/signup)
        const res = await axios.post("http://localhost:3000/api/readers/signup", this.form);

        this.message = "Đăng ký thành công!";
        this.messageType = "success";

        setTimeout(() => this.$router.push("/login"), 700);
      } catch (err) {
        this.message = err.response?.data?.message || "Đã có lỗi xảy ra";
        this.messageType = "error";
      }
    },
  },
};
</script>
