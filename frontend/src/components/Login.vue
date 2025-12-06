<template>
  <div class="auth-page">
    <div class="auth-container">
      <h2>Đăng nhập</h2>
      <p class="sub">Đăng nhập để mượn sách và quản lý tài khoản</p>

      <form @submit.prevent="login">
        <div class="form-group">
          <label>Email</label>
          <input v-model="email" type="email" placeholder="you@example.com" required />
        </div>

        <div class="form-group">
          <label>Mật khẩu</label>
          <input v-model="password" type="password" placeholder="Mật khẩu" required />
        </div>

        <button class="auth-btn" type="submit">Đăng nhập</button>

        <div class="auth-switch">
          Chưa có tài khoản? <router-link to="/signup">Đăng ký</router-link>
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
import { store } from "@/store.js";
import "@/assets/auth.css";

export default {
  data() {
    return {
      email: "",
      password: "",
      message: "",
      messageType: ""
    };
  },
  methods: {
    async login() {
      try {
        const res = await axios.post("http://localhost:3000/api/readers/login", {
          email: this.email,
          password: this.password
        });

        store.user = res.data.reader;
        localStorage.setItem("user", JSON.stringify(res.data.reader));

        this.message = "Đăng nhập thành công!";
        this.messageType = "success";

        setTimeout(() => this.$router.push("/book"), 500);
      } catch (err) {
        this.message = err.response?.data?.message || "Sai email hoặc mật khẩu";
        this.messageType = "error";
      }
    }
  }
};
</script>
