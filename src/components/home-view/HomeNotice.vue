<template>
  <div class="notice">
    <div class="notice__line" />
    <div>
      <div class="notice__title">
        <router-link v-if="animal_id && animalName" :to="`/animals/${animal_id}`">
          <div class="notice__title__animal">
            <img class="notice__animal-photo" :src="animalPhoto">
            <h4>{{ animalName }} |</h4>
          </div>
        </router-link>
        <h4>{{ title }}</h4>
      </div>
      <h5 class="notice__description">
        {{ description }}
      </h5>
    </div>
  </div>
</template>

<script setup>
import { onMounted } from 'vue';
import { useStore } from 'vuex';

const store = useStore();
const props = defineProps({
  noticeId: String,
  title: String,
  description: String,
  internalOnly: Boolean,
  animal_id: String,
  animalName: String,
  animalPhoto: String,
});

onMounted(() => {
  store.dispatch('notices/getNoticeById', { _id: props.noticeId });
});
</script>

<style lang="scss">
$green: #42b983;

.notice {
  display: flex;
  text-align: left;
  padding: 12px 16px;

  h4,
  h5 {
    margin: 0;
  }

  &__line {
    width: 3px;
    border-radius: 4px;
    background-color: $green;
    margin-right: 8px;
  }

  &__title {
    font-size: 16px;
    display: flex;
    align-items: center;
    margin: 4px 0;

    &__animal {
      display: flex;
      align-items: center;
      margin-right: 6px;
      cursor: pointer;
    }
  }

  &__description {
    font-weight: normal;
    font-size: 14px;
  }

  &__animal-photo {
    width: 35px;
    height: 30px;
    border-radius: 8px;
    margin-right: 4px;
    object-fit: cover;
  }
}
</style>
