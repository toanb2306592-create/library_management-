<template>
  <header :class="['header', { faded }]">
    <div class="header-container">
      <div class="logo">
        <img src="/library-icon.png" alt="Library Icon" />
        <router-link to="/" style="text-decoration: none;">
          <h2>BookSelf</h2>
        </router-link>
      </div>

      <nav class="nav">
        <ul>
          <template v-if="store.user?.email === 'admin@gmail.com'">
            <li><router-link to="/book">Sách</router-link></li>
            <li><router-link to="/publisher">Nhà xuất bản</router-link></li>
            <li><router-link to="/employee">Nhân viên</router-link></li>
            <li><router-link to="/borrow">Quản lý mượn sách</router-link></li>
          </template>
          <template v-if="store.user?.email !== 'admin@gmail.com'">
            <li><router-link to="/">Trang chủ</router-link></li>
            <li><router-link to="/borrow-book">Mượn sách</router-link></li>
          </template>
        </ul>
      </nav>

      <div class="auth">
        <template v-if="!store.user">
          <router-link to="/login" class="router-button">Đăng nhập</router-link>
          <router-link to="/register" class="router-button">Đăng ký</router-link>
        </template>

        <template v-else>
          <div class="user-dropdown" ref="dropdownRef" @click="toggleDropdown">
            <i class="fas fa-user"></i>
            {{ store.user.Ten }}
            <i class="fas fa-caret-down"></i>
          </div>

          <ul v-if="dropdownOpen" class="dropdown-menu">
            <template v-if="store.user?.email !== 'admin@gmail.com'">
              <li @click="$router.push('/borrow-history')">Lịch sử mượn</li>
            </template>
            <li @click="logout">Đăng xuất</li>
          </ul>
        </template>
      </div>
    </div>
  </header>
</template>

<script>
import axios from "axios";
import { store } from "@/store.js";

export default {
  name: "HeaderLibrary",
  data() {
    return {
      lastScroll: 0,
      faded: false,
      dropdownOpen: false,
      searchText: "",
      books: [],         
      filteredBooks: []   
    };
  },
  setup() {
    return { store };
  },
  mounted() {
    window.addEventListener("scroll", this.handleScroll);
    document.addEventListener("click", this.handleClickOutside);
    this.loadBooks();
  },
  beforeUnmount() {
    window.removeEventListener("scroll", this.handleScroll);
    document.removeEventListener("click", this.handleClickOutside);
  },
  methods: {

    async loadBooks() {
      try {
        const res = await axios.get("http://localhost:3000/api/books");
        this.books = res.data;
        this.filteredBooks = res.data;
      } catch (err) {
        console.error("Không tải được danh sách sách:", err);
      }
    },


    goToBookDetail(bookId) {
      this.searchText = "";
      this.$router.push({ name: "BookDetail", params: { id: bookId } });
    },


    getBookImage(book) {
      if (!book.image) return "/default-book.png";
      const img = Array.isArray(book.image) ? book.image[0] : book.image;
      if (typeof img === "string") {
        if (img.startsWith("data:")) return img;
        return `data:image/jpeg;base64,${img}`;
      }
      return "/default-book.png";
    },

    handleScroll() {
      const currentScroll = window.pageYOffset || document.documentElement.scrollTop;
      this.faded = currentScroll > this.lastScroll && currentScroll > 50;
      this.lastScroll = Math.max(0, currentScroll);
    },

    toggleDropdown() {
      this.dropdownOpen = !this.dropdownOpen;
    },

    logout() {
      localStorage.removeItem("user");
      store.user = null;
      this.dropdownOpen = false;
      this.$router.push("/login");
    },

    handleClickOutside(event) {
      const dropdown = this.$refs.dropdownRef;
      if (dropdown && !dropdown.contains(event.target)) {
        this.dropdownOpen = false;
      }
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
  position: relative;
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

/* Dropdown kết quả search */
.search-results {
  position: absolute;
  top: 110%;
  left: 0;
  background-color: #2a2f45;
  border-radius: 10px;
  width: 100%;
  max-height: 300px;
  overflow-y: auto;
  box-shadow: 0 4px 12px rgba(0,0,0,0.5);
  z-index: 150;
}

.search-results ul {
  list-style: none;
  margin: 0;
  padding: 0.5rem 0;
}

.search-results li {
  padding: 0.5rem 1rem;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  transition: 0.2s;
  color: #f0f0f0;
}

.search-results li:hover {
  background-color: #444;
}

.book-thumb {
  width: 30px;
  height: 40px;
  object-fit: cover;
  border-radius: 3px;
}

.auth {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  position: relative;
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

/* Dropdown nhân viên */
.user-dropdown {
  background-color: #ffd700;
  color: #2a2f45;
  padding: 0.5rem 1rem;
  border-radius: 30px;
  font-weight: 600;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 0.3rem;
  position: relative;
  user-select: none;
}

.user-dropdown i {
  font-size: 0.8rem;
}

.dropdown-menu {
  position: absolute;
  top: 110%;
  right: 0;
  background-color: #2a2f45;
  color: #f0f0f0;
  list-style: none;
  padding: 0.5rem 0;
  border-radius: 10px;
  min-width: 160px;
  box-shadow: 0 4px 12px rgba(0,0,0,0.5);
  z-index: 200;
}

.dropdown-menu li {
  padding: 0.5rem 1rem;
  cursor: pointer;
  transition: 0.2s;
}

.dropdown-menu li:hover {
  background-color: #444;
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
