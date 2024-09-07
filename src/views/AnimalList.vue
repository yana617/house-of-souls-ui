<template>
  <div class="animal-list__container">
    <div class="animal-list">
      <AnimalListDesktop v-if="!$matchMedia.mobile" />
      <AnimalListMobile v-if="$matchMedia.mobile" />
    </div>
  </div>
</template>

<script>
import AnimalListDesktop from '@/components/animal-list-view/AnimalListDesktop.vue';
import AnimalListMobile from '@/components/animal-list-view/AnimalListMobile.vue';

export default {
  name: 'AnimalList',
  components: { AnimalListDesktop, AnimalListMobile },
  watch: {
    // eslint-disable-next-line func-names
    '$route.query': function () {
      const { path, query } = this.$route;

      if (path === '/animals') {
        this.$store.dispatch('app/setLoading', true);
        this.$store.dispatch('animals/getAnimals', query).finally(() => {
          this.$store.dispatch('app/setLoading', false);
        });
      }
    },
  },
  created() {
    const { query } = this.$route;
    this.$store.dispatch('app/setLoading', true);
    this.$store.dispatch('animals/getAnimals', query).finally(() => {
      this.$store.dispatch('app/setLoading', false);
    });
  },
};
</script>

<style scoped lang="scss">
$lightestGrey: #fafafa;
$black1: #232d42;

.animal-list {
  width: 60%;
  color: $black1;
  display: flex;
  align-items: flex-start;
  flex-direction: column;

  &__container {
    display: flex;
    justify-content: center;
    background-color: $lightestGrey;
    min-height: calc(100vh - 50px);
  }

  @media (max-width: 1500px) {
    width: 70%;
  }

  @media (max-width: 1300px) {
    width: 80%;
  }

  @media (max-width: 1100px) {
    width: 90%;
  }

  @media (max-width: 1000px) {
    width: 100%;
    padding: 0 32px;
  }

  @media (max-width: 360px) {
    padding: 0 16px;
  }
}
</style>
