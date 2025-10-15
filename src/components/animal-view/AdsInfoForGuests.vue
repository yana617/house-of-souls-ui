<template>
  <div class="ads-info-for-guests">
    <h1 class="ads-info-for-guests__title">
      <span v-if="!$matchMedia.tablet">{{ animal.name }}</span>
      <StatusHashtag :status="animal.status" />
    </h1>
    <p v-if="!$matchMedia.tablet" class="ads-info-for-guests__text">
      {{ animal.advertising_text }}
    </p>
    <swiper-container
      ref="swiperEl"
      navigation="true"
      slides-per-view="1"
      space-between="10"
      style="--swiper-navigation-color: #42b983; width: 100%"
    >
      <swiper-slide v-for="(image, index) in animal.photos" :key="index">
        <img
          :src="image.url"
          class="ads-info-for-guests__image"
          alt="main image"
          @click="openLightbox(index)"
        >
      </swiper-slide>
    </swiper-container>

    <div v-if="!$matchMedia.tablet" ref="thumbContainer" class="ads-info-for-guests__thumbnail">
      <img
        v-for="(thumb, idx) in animal.photos"
        :key="idx"
        :src="thumb.url"
        :class="{ active: activeIndex === idx }"
        alt="preview"
        @click="slideTo(idx)"
      >
    </div>

    <div v-if="isFullscreen" class="ads-info-for-guests__lightbox" @click="closeLightbox">
      <button class="ads-info-for-guests__close-btn" @click.stop="closeLightbox">
        ✕
      </button>

      <swiper-container
        ref="lightboxSwiper"
        :initial-slide="activeIndex"
        navigation
        keyboard
        class="ads-info-for-guests__lightbox-swiper"
      >
        <swiper-slide
          v-for="img in animal.photos"
          :key="img.url + '-fullscreen'"
          class="ads-info-for-guests__lightbox-slide"
        >
          <img :src="img.url" class="ads-info-for-guests__lightbox-image">
        </swiper-slide>
      </swiper-container>
    </div>

    <h1 v-if="$matchMedia.tablet" class="ads-info-for-guests__title">
      {{ animal.name }}
    </h1>
    <p v-if="$matchMedia.tablet" class="ads-info-for-guests__text">
      {{ animal.advertising_text }}
    </p>
  </div>
</template>

<script setup>
import { computed, ref, onMounted } from 'vue';
import { useStore } from 'vuex';
import { register } from 'swiper/element/bundle';

register();

const isFullscreen = ref(false);
const activeIndex = ref(0);
const lightboxSwiper = ref(null);
const thumbContainer = ref(null);

const store = useStore();
const animal = computed(() => store.state.animals.current);

const swiperEl = ref(null);

onMounted(() => {
  swiperEl.value.addEventListener('slidechange', (e) => {
    activeIndex.value = e.detail[0].activeIndex;
    scrollThumbnailIntoView();
  });
});

const scrollThumbnailIntoView = () => {
  const container = thumbContainer.value;
  const thumb = container.querySelectorAll('.ads-info-for-guests__thumbnail')[activeIndex.value];

  if (thumb) {
    const containerWidth = container.offsetWidth;
    const thumbLeft = thumb.offsetLeft;
    const thumbWidth = thumb.offsetWidth;

    container.scrollTo({
      left: thumbLeft - (containerWidth / 2) + (thumbWidth / 2),
      behavior: 'smooth'
    });
  }
};

const slideTo = (index) => {
  swiperEl.value.swiper.slideTo(index);
};

const openLightbox = (index) => {
  activeIndex.value = index;
  isFullscreen.value = true;

  document.body.style.overflow = 'hidden';
};

const closeLightbox = () => {
  isFullscreen.value = false;
  document.body.style.overflow = '';
};

document.addEventListener('keydown', (e) => {
  if (!isFullscreen.value) return;

  if (e.key === 'Escape') closeLightbox();
  if (e.key === 'ArrowLeft') lightboxSwiper.value.swiper.slidePrev();
  if (e.key === 'ArrowRight') lightboxSwiper.value.swiper.slideNext();
});
</script>

<style scoped lang="scss">
$black1: #232d42;
$blue: #3f91f7;
$green: #42b983;
$grey1: #8a92a6;

.ads-info-for-guests {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  width: 100%;
  color: $black1;
  box-sizing: border-box;
  margin-top: 32px;

  &__title {
    display: flex;
    gap: 16px;
    margin-top: 8px;
    margin-bottom: 24px;
    font-weight: 500;
    font-size: 62px;
    line-height: 100%;

    @media (max-width: 767px) {
      margin-top: 32px;
    }

    @media (max-width: 400px) {
      flex-direction: column-reverse;
    }
  }

  &__text {
    text-align: left;
    font-size: 16px;
    white-space: pre-line;
  }

  &__image {
    width: 100%;
    height: 600px;
    object-fit: cover;
    border-radius: 8px;

    @media (max-width: 767px) {
      height: 400px
    }

    @media (max-width: 480px) {
      height: 200px
    }
  }

  &__thumbnail {
    display: flex;
    gap: 10px;
    margin-top: 10px;
    max-width: 100%;
    overflow: scroll;

    img {
      min-width: 240px;
      width: 240px;
      height: 160px;
      cursor: pointer;
      object-fit: cover;
      border-radius: 8px;
    }
  }

  &__lightbox {
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    background: rgba(0, 0, 0, 0.9);
    z-index: 1000;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  &__lightbox-swiper {
    width: 95vw;
    height: 95vh;
  }

  &__lightbox-image {
    max-height: 100%;
    max-width: 100%;
    object-fit: contain;
  }

  &__close-btn {
    position: fixed;
    top: 20px;
    right: 20px;
    background: rgba(0, 0, 0, 0.5);
    color: white;
    border: none;
    width: 40px;
    height: 40px;
    border-radius: 50%;
    font-size: 1.2rem;
    cursor: pointer;
    z-index: 1001;
  }

  &__lightbox-slide {
    display: flex;
    align-items: center;
    justify-content: center;
  }

  @media (max-width: 767px) {
      margin: 0px;
  }

  @media (max-width: 479px) {
    padding: 0px 32px;
    margin-top: 16px;
  }
}
</style>