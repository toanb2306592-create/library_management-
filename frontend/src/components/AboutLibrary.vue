<template>
  <section class="about-library">
    <div class="about-container">
      <div class="about-image">
        <img src="/library-about.png" alt="Thư viện sách" />
      </div>
      <div class="about-text">
        <h2>Về Thư viện sách</h2>
        <p>
          Thư viện số cung cấp hàng ngàn đầu sách đa dạng, từ lập trình, kỹ năng, khoa học xã hội, đến văn học nghệ thuật. 
          Chúng tôi giúp bạn tiếp cận tri thức mọi lúc, mọi nơi. Hãy tham gia cộng đồng đọc sách của chúng tôi và khám phá thế giới tri thức phong phú.
        </p>
        <button @click="$router.push('/signup')">Đăng ký thành viên</button>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  name: "AboutLibrary"
};
</script>

<style scoped>
.about-library {
  background: linear-gradient(90deg, #2a2f45, #1c1c1c);
  color: #f0f0f0;
  padding: 4rem 2rem;
}

.about-container {
  display: flex;
  align-items: center;
  justify-content: center;
  max-width: 1200px;
  margin: 0 auto;
  gap: 3rem;
  flex-wrap: wrap;
}

.about-image img {
  width: 300px;
  height: auto;
  border-radius: 10px;
  box-shadow: 0 8px 20px rgba(0,0,0,0.5);
}

.about-text {
  max-width: 600px;
}

.about-text h2 {
  font-size: 2rem;
  margin-bottom: 1rem;
}

.about-text p {
  font-size: 1.1rem;
  color: #bbb;
  margin-bottom: 1.5rem;
  line-height: 1.6;
}

.about-text button {
  background-color: #ffd700;
  color: #2a2f45;
  border: none;
  padding: 0.8rem 1.5rem;
  border-radius: 30px;
  font-weight: 600;
  cursor: pointer;
  transition: 0.3s;
}

.about-text button:hover {
  background-color: #ffb700;
}

@media (max-width: 900px) {
  .about-container {
    flex-direction: column;
    text-align: center;
  }

  .about-image img {
    width: 80%;
  }

  .about-text {
    max-width: 100%;
  }
}
</style>
