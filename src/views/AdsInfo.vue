<template>
  <div class="ads-info">
    <div class="ads-info__container">
      <div class="ads-info__question">
        Почему реклама - это важно?
      </div>
      <div class="ads-info__answer">
        Приют, даже самый лучший, это стрессовая среда для животного: ограниченное пространство, постоянный шум, смена
        соседей и отсутствие личного внимания подрывают психическое и физическое здоровье питомца, делая невозможной его
        полноценную жизнь. В приюте животное лишено главного - постоянной эмоциональной связи с хозяином, которая дает
        ему чувство безопасности и принадлежности, необходимые для счастья. Ресурсы любого приюта (финансовые,
        пространственные, человеческие) ограничены, и каждое устроенное в семью животное освобождает место и силы для
        спасения следующего бездомного существа.
      </div>
      <div class="ads-info__question">
        Наглядное видео
      </div>
      <div class="ads-info__answer">
        <div class="video-container">
          <iframe
            width="560"
            height="315"
            src="https://www.youtube.com/embed/R092TrRhlPE"
            title="YouTube video player"
            frameborder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowfullscreen
          />
        </div>
      </div>
      <div class="ads-info__question">
        Что нужно для подачи обьявления?
      </div>
      <div class="ads-info__answer">
        Фото, текст (с телефоном), аккаунт на рекламной платформе
      </div>
      <div class="ads-info__question">
        Где взять текст и фото
      </div>
      <div class="ads-info__answer">
        Все клички во вкладке "Реклама" - кликабельны. Открываем любое животное (желательно кому нужнее, кого давно не
        обновляли), возле текста есть кнопка "скопировать" - копируем текст. Если вы с компьютера - нажимаем кнопку
        "скачать" возле фото (скачается архив со всеми фото), если с телефона - качаем фото по одному.
      </div>
      <div class="ads-info__question">
        Процесс подачи обьявления (на примере Kufar.by)
      </div>
      <div class="ads-info__answer">
        - выбираем животное, копируем текст, сохраняем себе фото <br>
        - на сайте kufar.by логинимся, выбираем "Подать обьявление" <br>
        - заголовок 3-7 слов, с заманивающим текстом (Ласковая собака Ника в дар - цепляет характером, Арни ищет дом
        (привит, кастрирован) - цепляет что подготовлен) <br>
        - категория "Животные" - "Домашние питомцы" <br>
        - цена - бесплатно, регион - Минск (любой район) <br>
        - телефон копируем из карточки животного
      </div>
      <div class="ads-info__question">
        После подачи
      </div>
      <div class="ads-info__answer">
        <b>Отметьтесь!</b> Чтобы все видели что кто-то недавно закинул обьявление и не кидали одно и тоже животное 10
        раз, а дали шанс кому-то еще.
      </div>
      <div class="ads-info__question">
        Если оплатил поднятия?
      </div>
      <div class="ads-info__answer">
        Когда отмечаетесь можно указать дату - выберите дату последнего поднятия.
      </div>
    </div>
  </div>
</template>

<script setup></script>

<style lang="scss" scoped>
.ads-info {
  display: flex;
  width: 100%;
  justify-content: center;

  &__container {
    margin: 32px 0;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    width: 70%;
    gap: 8px;
    text-align: left;
  }

  &__question {
    margin-top: 16px;
    font-size: 16px;
    font-weight: 600;
  }

  &__answer {
    font-size: 14px;
  }

  @media (max-width: 767px) {
    &__container {
      width: 90%;
    }
  }
}
</style>