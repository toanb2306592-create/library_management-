<template>
  <header :class="['header', { faded }]">
    <div class="header-container">
      <!-- Logo / Tên thư viện -->
      <div class="logo">
        <img src="/library-icon.png" alt="Library Icon" />
        <router-link to="/" style="text-decoration: none;"><h2>BookSelf</h2></router-link>
      </div>

      <!-- Menu điều hướng -->
      <nav class="nav">
        <ul>
          <li><router-link to="/">Trang chủ</router-link></li>
          <li><a href="#">Sách</a></li>
          <li><a href="#">Mượn trả</a></li>
          <li><a href="#">Liên hệ</a></li>
        </ul>
      </nav>

      <!-- Tìm kiếm sách -->
      <div class="search">
        <input type="text" placeholder="Tìm kiếm sách..." />
        <button><i class="fas fa-search"></i></button>
      </div>

      <!-- Đăng nhập / Đăng ký -->
      <div class="auth">
        <router-link to="/login" class="router-button">Đăng nhập</router-link>
        <router-link to="/signup" class="router-button">Đăng ký thành viên</router-link>
      </div>
    </div>
  </header>
</template>

<script>
export default {
  name: "HeaderLibrary",
  data() {
    return {
      lastScroll: 0,
      faded: false
    };
  },
  mounted() {
    window.addEventListener("scroll", this.handleScroll);
  },
  beforeUnmount() {
    window.removeEventListener("scroll", this.handleScroll);
  },
  methods: {
    handleScroll() {
      const currentScroll = window.pageYOffset || document.documentElement.scrollTop;
      
      if (currentScroll > this.lastScroll && currentScroll > 50) {
        // Kéo xuống → làm mờ
        this.faded = true;
      } else if (currentScroll < this.lastScroll - 5) {
        // Kéo lên chỉ 5px → hiện lại
        this.faded = false;
      }
      
      this.lastScroll = currentScroll <= 0 ? 0 : currentScroll;
    }
  }
};
</script>

<style scoped>
.header {
  background: linear-gradient(90deg, #1c1c1c, #2a2f45);
  color: white;
  padding: 1rem 2rem;
  box-shadow: 0 4px 15px rgba(0,0,0,0.5);
  position: sticky;
  top: 0;
  z-index: 100;
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  transition: background-color 0.3s ease, opacity 0.3s ease;
  opacity: 1;
}

.header.faded {
  opacity: 0.6;
  background-color: rgba(28, 28, 28, 0.9);
}

.header-container {
  display: flex;
  align-items: center;
  justify-content: space-between;
  max-width: 1200px;
  margin: 0 auto;
  flex-wrap: wrap;
  gap: 1rem;
}

.logo {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.logo img {
  width: 50px;
  height: 50px;
}

.nav ul {
  display: flex;
  list-style: none;
  gap: 2rem;
  margin: 0;
  padding: 0;
}

.nav a {
  color: #f0f0f0;
  text-decoration: none;
  font-weight: 500;
  transition: 0.3s;
}

.nav a:hover {
  color: #ffd700;
}

.search {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.search input {
  padding: 0.5rem 1rem;
  border-radius: 50px;
  border: none;
  outline: none;
  width: 180px;
  background-color: #2a2f45;
  color: white;
  transition: 0.3s;
}

.search input::placeholder {
  color: #b0b0b0;
}

.search input:focus {
  width: 220px;
}

.search button {
  background-color: #ffd700;
  border: none;
  padding: 0.5rem 0.7rem;
  border-radius: 50%;
  cursor: pointer;
  transition: 0.3s;
}

.search button:hover {
  background-color: #ffb700;
}

.search i {
  color: #2a2f45;
}

.auth {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.router-button {
  background-color: #ffd700;
  color: #2a2f45;
  padding: 0.5rem 1rem;
  border-radius: 30px;
  font-size: 0.9em;
  font-weight: 600;
  text-decoration: none;
  transition: 0.3s;
}

.router-button:hover {
  background-color: #444442;
}

@media (max-width: 900px) {
  .header-container {
    flex-direction: column;
    align-items: flex-start;
  }
  .nav ul {
    flex-direction: column;
    gap: 1rem;
  }
  .search input {
    width: 100%;
  }
}
</style>
