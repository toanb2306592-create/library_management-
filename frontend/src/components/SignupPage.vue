<template>
  <div class="signup-page">
    <div class="signup-container">
      <h2>Đăng ký thành viên</h2>
      <p>Hãy tạo tài khoản để mượn sách và nhận các ưu đãi đặc biệt.</p>

      <form @submit.prevent="submitForm">
        <div class="form-group">
          <label for="name">Họ tên</label>
          <input type="text" id="name" v-model="form.name" required />
        </div>

        <div class="form-group">
          <label for="email">Email</label>
          <input type="email" id="email" v-model="form.email" required />
        </div>

        <div class="form-group">
          <label for="password">Mật khẩu</label>
          <input type="password" id="password" v-model="form.password" required />
        </div>

        <div class="form-group">
          <label for="confirmPassword">Xác nhận mật khẩu</label>
          <input type="password" id="confirmPassword" v-model="form.confirmPassword" required />
        </div>

        <button type="submit">Đăng ký</button>
      </form>

      <p class="login-link">
        Đã có tài khoản? <router-link to="/login">Đăng nhập</router-link>
      </p>
    </div>
  </div>
</template>

<script>
export default {
  name: "SignupPage",
  data() {
    return {
      form: {
        name: "",
        email: "",
        password: "",
        confirmPassword: ""
      }
    };
  },
  methods: {
    submitForm() {
      if (this.form.password !== this.form.confirmPassword) {
        alert("Mật khẩu và xác nhận mật khẩu không khớp!");
        return;
      }

      // Gửi dữ liệu lên API Node.js / MongoDB
      // axios.post('/api/users/signup', this.form)
      //   .then(res => { ... })
      //   .catch(err => { ... })

      alert("Đăng ký thành công! (demo)");
      // Reset form
      this.form.name = "";
      this.form.email = "";
      this.form.password = "";
      this.form.confirmPassword = "";
    }
  }
};
</script>

<style scoped>
.signup-page {
  background: linear-gradient(90deg, #2a2f45, #1c1c1c);
  color: #f0f0f0;
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 2rem;
}

.signup-container {
  background-color: #1c1c1c;
  padding: 3rem 2rem;
  border-radius: 15px;
  width: 100%;
  max-width: 400px;
  box-shadow: 0 8px 20px rgba(0,0,0,0.5);
  text-align: center;
}

.signup-container h2 {
  margin-bottom: 1rem;
}

.signup-container p {
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

.login-link {
  margin-top: 1.5rem;
  font-size: 0.9rem;
  color: #bbb;
}
.login-link a {
  color: #ffd700;
  text-decoration: none;
}
.login-link a:hover {
  color: #ffb700;
}
</style>
