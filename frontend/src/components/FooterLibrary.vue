<template>
  <footer class="footer">
    <div class="footer-container">
      <!-- Logo & Giới thiệu -->
      <div class="footer-logo">
        <img src="/library-icon.png" alt="Library Icon" />
        <h2>BookSelf - Thư viện sách</h2>
        <p>Mang tri thức đến gần bạn hơn.</p>
      </div>

      <!-- Menu nhanh -->
      <div class="footer-nav">
        <h3>Điều hướng</h3>
        <ul>
          <li><a href="#">Trang chủ</a></li>
          <li><a href="#">Sách</a></li>
          <li><a href="#">Mượn trả</a></li>
          <li><a href="#">Liên hệ</a></li>
        </ul>
      </div>

      <!-- Thông tin liên hệ -->
      <div class="footer-contact">
        <h3>Liên hệ</h3>
        <p>Email: contact@thuvienso.com</p>
        <p>Điện thoại: +84 123 456 789</p>
        <div class="social">
          <a href="#"><i class="fab fa-facebook-f"></i></a>
          <a href="#"><i class="fab fa-twitter"></i></a>
          <a href="#"><i class="fab fa-instagram"></i></a>
        </div>
      </div>
    </div>

    <div class="footer-bottom">
      <p>&copy; 2025 Thư viện số. Bản quyền được bảo lưu.</p>
    </div>
  </footer>
</template>

<script>
export default {
  name: "FooterLibrary"
};
</script>

<style scoped>
.footer {
  background: linear-gradient(90deg, #1c1c1c, #2a2f45);
  color: #f0f0f0;
  padding: 2rem;
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
}

.footer-container {
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  gap: 2rem;
  max-width: 1200px;
  margin: 0 auto;
}

.footer-logo {
  flex: 1;
  min-width: 200px;
}

.footer-logo img {
  width: 50px;
  height: 50px;
}

.footer-logo h2 {
  margin: 0.5rem 0;
}

.footer-logo p {
  font-size: 0.9rem;
  color: #bbb;
}

.footer-nav,
.footer-contact {
  flex: 1;
  min-width: 200px;
}

.footer-nav h3,
.footer-contact h3 {
  margin-bottom: 0.5rem;
}

.footer-nav ul {
  list-style: none;
  padding: 0;
}

.footer-nav li {
  margin-bottom: 0.5rem;
}

.footer-nav a {
  color: #f0f0f0;
  text-decoration: none;
  transition: 0.3s;
}

.footer-nav a:hover {
  color: #ffd700;
}

.footer-contact p {
  margin: 0.3rem 0;
}

.social {
  margin-top: 0.5rem;
  display: flex;
  gap: 0.5rem;
}

.social a {
  color: #f0f0f0;
  font-size: 1.2rem;
  transition: 0.3s;
}

.social a:hover {
  color: #ffd700;
}

.footer-bottom {
  margin-top: 2rem;
  text-align: center;
  border-top: 1px solid #444;
  padding-top: 1rem;
  font-size: 0.9rem;
  color: #bbb;
}

@media (max-width: 900px) {
  .footer-container {
    flex-direction: column;
    align-items: flex-start;
  }
}
</style>
