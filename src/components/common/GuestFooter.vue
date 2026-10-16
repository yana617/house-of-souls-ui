<template>
  <footer class="guest-footer">
    <div class="guest-footer__left">
      <div class="guest-footer__header">
        <span class="guest-footer__title">ДСД - Домик Спасенных Душ</span>
        <a
          href="https://www.instagram.com/soul.home/"
          target="_blank"
          rel="noopener noreferrer"
          class="guest-footer__instagram-link"
        >
          <InstagramOutlined />
        </a>
      </div>
      <span class="guest-footer__years">© 2009-2026</span>
      <span class="guest-footer__birthday">День рождения: 3 сентября</span>
    </div>

    <div class="guest-footer__right">
      <span>По вопросам забрать животное / помочь: <br>
        <a class="footer__phone-link" href="tel:+375293226155"> +375(29) 322-61-55 (A1) </a> и
        <a class="footer__phone-link" href="tel:+375336611625"> +375(33) 66-11-625 (МТС) </a> -
        Тамара</span>
      <span class="guest-footer__no-animals">
        [!] Животных НЕ ЗАБИРАЕМ! Приют переполнен и нуждается в помощи, мы физически не можем забрать всех животных
      </span>
    </div>
  </footer>
</template>

<script setup>
import { InstagramOutlined } from '@ant-design/icons-vue';
</script>

<style lang="scss">
.guest-footer {
  background-color: rgb(239, 239, 242);
  display: flex;
  gap: 40px;
  align-items: flex-start;
  justify-content: space-between;
  width: 100%;
  padding: 20px 20%;
  min-height: 120px;
  line-height: 1.25;
  margin-top: auto;

  &__left {
    display: flex;
    flex-direction: column;
    gap: 8px;
    text-align: left;
  }

  &__header {
    display: flex;
    align-items: center;
    gap: 8px;
  }

  &__title {
    font-weight: 600;
    font-size: 16px;
  }

  &__years {
    font-size: 14px;
    color: #666;
  }

  &__birthday {
    font-size: 14px;
    color: #666;
  }

  &__instagram-link {
    font-size: 20px;
    color: #666;
    transition: color 0.3s ease;

    &:hover {
      color: #e1306c;
    }
  }

  &__right {
    display: flex;
    flex-direction: column;
    gap: 8px;
    max-width: 500px;
    text-align: right;
  }

  &__no-animals {
    color: rgb(105, 0, 0);
    font-size: 14px;
  }

  @media (max-width: 1300px) {
    padding: 20px 10%;
  }

  @media (max-width: 1100px) {
    padding: 20px 5%;
  }

  @media (max-width: 1000px) {
    padding: 20px 32px;
    flex-direction: column;
    gap: 20px;

    &__right {
      text-align: left;
    }
  }

  @media (max-width: 767px) {
    padding: 20px 16px;
  }
}
</style>