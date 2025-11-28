<template>
  <div class="login-page">
    <div class="login-container">
      <h2>Đăng nhập</h2>
      <p>Chào mừng trở lại. Vui lòng đăng nhập để tiếp tục.</p>

      <form @submit.prevent="submitForm">
        <!-- Thông báo lỗi/thành công -->
        <div v-if="message" :class="['message', messageType]">{{ message }}</div>

        <div class="form-group">
          <label for="email">Email</label>
          <input type="email" id="email" v-model="form.email" required />
        </div>

        <div class="form-group">
          <label for="password">Mật khẩu</label>
          <input type="password" id="password" v-model="form.password" required />
        </div>

        <button type="submit">Đăng nhập</button>
      </form>

      <p class="signup-link">
        Chưa có tài khoản? <router-link to="/signup">Đăng ký thành viên</router-link>
      </p>
    </div>
  </div>
</template>

<script>
export default {
  name: "LoginPage",
  data() {
    return {
      form: {
        email: "",
        password: ""
      },
      message: "",
      messageType: "" // 'success' hoặc 'error'
    };
  },
  methods: {
    submitForm() {
      this.message = "Đang xử lý...";
      this.messageType = "";

      // LOGIC MÔ PHỎ: Thay thế cho việc gọi API thực tế
      setTimeout(() => {
        if (this.form.email === "test@example.com" && this.form.password === "password") {
          this.message = "Đăng nhập thành công! Chuyển hướng đến Trang chủ...";
          this.messageType = "success";
          // Trong ứng dụng thực tế, sẽ gọi this.$router.push('/');
        } else {
          this.message = "Email hoặc mật khẩu không chính xác. Vui lòng thử lại.";
          this.messageType = "error";
        }
      }, 1000);

      // Lưu ý: Trong ứng dụng thực tế, bạn sẽ gửi yêu cầu POST đến API tại đây.
    }
  }
};
</script>

<style scoped>
/* Style được sao chép và chỉnh sửa từ SignupPage để đồng bộ giao diện */
.login-page {
  background: linear-gradient(90deg, #2a2f45, #1c1c1c);
  color: #f0f0f0;
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 2rem;
}

.login-container {
  background-color: #1c1c1c;
  padding: 3rem 2rem;
  border-radius: 15px;
  width: 100%;
  max-width: 400px;
  box-shadow: 0 8px 20px rgba(0,0,0,0.5);
  text-align: center;
}

.login-container h2 {
  margin-bottom: 1rem;
}

.login-container p {
  color: #bbb;
  margin-bottom: 2rem;
}

.form-group {
  margin-bottom: 1.2rem;
  text-align: left;
}

.form-group label {
  display: block;
  margin-bottom: 0.3rem;
  font-weight: 500;
}

.form-group input {
  width: 100%;
  padding: 0.5rem 0.8rem;
  border-radius: 10px;
  border: none;
  outline: none;
  font-size: 1rem;
  background-color: #333; /* Darker input background */
  color: #f0f0f0;
}

button {
  width: 100%;
  padding: 0.7rem;
  border-radius: 30px;
  border: none;
  background-color: #ffd700;
  color: #2a2f45;
  font-weight: 600;
  font-size: 1rem;
  cursor: pointer;
  transition: 0.3s;
}

button:hover {
  background-color: #ffb700;
}

.signup-link {
  margin-top: 1.5rem;
  font-size: 0.9rem;
  color: #bbb;
}
.signup-link a {
  color: #ffd700;
  text-decoration: none;
}
.signup-link a:hover {
  color: #ffb700;
}

/* Kiểu dáng cho thông báo */
.message {
  padding: 0.75rem;
  margin-bottom: 1rem;
  border-radius: 8px;
  font-weight: 500;
  text-align: center;
}

.message.error {
  background-color: #8b0000; /* Màu nền đỏ sẫm */
  color: white;
}

.message.success {
  background-color: #006400; /* Màu nền xanh đậm */
  color: white;
}
</style>