<template>
  <footer class="guest-footer">
    <span style="margin-bottom: 8px">@ 2009-2026. 3 сентября - день рождения ДСД</span>
    <span>По вопросам забрать животное / помочь
      <a class="footer__phone-link" href="tel:+375293226155"> +375(29) 322-61-55 (A1) </a> и
      <a class="footer__phone-link" href="tel:+375336611625"> +375(33) 66-11-625 (МТС) </a> -
      Тамара</span>
    <span class="guest-footer__no-animals">
      [!] К сожалению, приют переполнен и нуждается в помощи, мы физически не можем забрать всех животных
    </span>
  </footer>
</template>

<script setup>
</script>

<style lang="scss">
.guest-footer {
  background-color: rgb(239, 239, 242);
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
  width: 100%;
  padding: 0px 20%;
  height: 120px;
  line-height: 1.25;
  text-align: left;

  &__no-animals {
    margin-top: 2px;
    color: rgb(105, 0, 0);
  }

  @media (max-width: 1300px) {
    padding: 0px 10%;
  }

  @media (max-width: 1100px) {
    padding: 0px 5%;
  }

  @media (max-width: 1000px) {
    padding: 0 32px;
    height: 140px;
  }

  @media (max-width: 767px) {
    height: 200px;
  }
}
</style>
