<template>
  <footer>
    <span>По всем вопросам звоните: </span>
    <div class="footer__phones">
      <span>
        <b>
          <a class="footer__phone-link" href="tel:+375293226155">+375(29) 322-61-55</a>
          , <a class="footer__phone-link" href="tel:+375336611625">+375(33) 66-11-625</a>
        </b> Тамара Николаевна (Мотя)
      </span>
      <span>
        <b>
          <a class="footer__phone-link" href="tel:+375447727265">+375(44) 772-72-65</a>
          , <a class="footer__phone-link" href="tel:+375297756172">+375(29) 775-61-72</a>
        </b> Ирина Приходько
      </span>
    </div>
  </footer>
</template>

<script>
export default {
  name: 'Footer',
};
</script>

<style lang="scss">
footer {
  background-color: #f5f5f7;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  padding: 12px 16px;
  height: 70px;
  line-height: 1.25;
}
.footer {
  &__phones {
    display: flex;
    flex-direction: column;
    margin-left: 16px;
    span {
      font-size: 14px;
    }
  }
  &__phone-link {
    color: black;
    text-decoration: none;
  }
}

@media (max-width: 700px) {
  footer {
    flex-direction: column;
  }
  .footer {
    &__phones {
      margin-left: 0;
      margin-top: 4px;
    }
  }
}

@media (max-width: 500px) {
  footer {
    height: 120px;
  }
}
</style>
