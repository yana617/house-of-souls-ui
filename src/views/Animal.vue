<template>
  <div class="animal__container">
    <div v-if="animal?.name" class="animal">
      <AnimalNavigation :type="animal.type" :animal-name="animal.name" />
      <AdsInfoForGuests v-if="!hasViewAnimalPermission" />
      <div class="animal__base" :class="{ notVolunteer: !hasViewAnimalPermission }">
        <div v-if="hasViewAnimalPermission" class="animal__base__left">
          <AnimalImageNameContainer />
          <CuratorContactForVolunteers />
        </div>
        <AnimalDescription />
      </div>
      <AdsInfoForVolunteers v-if="hasViewAnimalPermission" />
      <HealthRecords v-if="hasViewAnimalPermission" />
      <CuratorContactForGuests v-if="!hasViewAnimalPermission" />
      <CommonButton
        v-permission="'DELETE_ANIMAL'"
        class="animal__delete-btn"
        title="Удалить"
        @click="handleDelete()"
      />
    </div>
  </div>
</template>

<script>
import { computed } from 'vue';
import { useStore } from 'vuex';
import { useHead } from '@unhead/vue';
import { mapState } from 'vuex';

import AnimalNavigation from '@/components/animal-view/AnimalNavigation.vue';
import AnimalImageNameContainer from '@/components/animal-view/AnimalImageNameContainer.vue';
import AnimalDescription from '@/components/animal-view/AnimalDescription.vue';
import CuratorContactForVolunteers from '@/components/animal-view/CuratorContactForVolunteers.vue';
import CuratorContactForGuests from '@/components/animal-view/CuratorContactForGuests.vue';
import AdsInfoForVolunteers from '@/components/animal-view/AdsInfoForVolunteers.vue';
import AdsInfoForGuests from '@/components/animal-view/AdsInfoForGuests.vue';
import HealthRecords from '@/components/animal-view/HealthRecords.vue';
import CommonButton from '@/components/common/CommonButton.vue';
import { SITE_NAME, SITE_URL } from '@/composables/use-seo';
import AnimalType from '@/utils/enums/AnimalType';

export default {
  name: 'Animal',
  components: {
    AnimalNavigation,
    AnimalImageNameContainer,
    AnimalDescription,
    CuratorContactForVolunteers,
    CuratorContactForGuests,
    AdsInfoForVolunteers,
    AdsInfoForGuests,
    HealthRecords,
    CommonButton,
  },
  setup() {
    const store = useStore();
    const animal = computed(() => store.state.animals.current);

    useHead(computed(() => {
      const a = animal.value;
      if (!a?.name) return { title: `Животные из приюта | ${SITE_NAME}` };

      const typeLabel =
        a.type === AnimalType.DOG ? 'собака' :
        a.type === AnimalType.CAT ? 'кошка' : 'животное';

      const title = `${a.name} — ${typeLabel} из приюта | ${SITE_NAME}`;
      const rawDesc = a.description
        ? `${a.name} — ${a.description}`.slice(0, 155)
        : `${a.name} ищет новый дом. Приют Домик Спасённых Душ, Минск.`;
      const photo = a.photos?.[0]?.url || '';
      const pageUrl = `${SITE_URL}/animals/${a.id}`;

      return {
        title,
        meta: [
          { name: 'description', content: rawDesc },
          { name: 'robots', content: 'index, follow' },
          { property: 'og:title', content: title },
          { property: 'og:description', content: rawDesc },
          { property: 'og:image', content: photo },
          { property: 'og:url', content: pageUrl },
          { property: 'og:type', content: 'profile' },
          { property: 'og:site_name', content: SITE_NAME },
          { property: 'og:locale', content: 'ru_RU' },
        ],
        link: [{ rel: 'canonical', href: pageUrl }],
        script: a.name ? [
          {
            type: 'application/ld+json',
            innerHTML: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'Animal',
              name: a.name,
              description: a.description || undefined,
              image: photo || undefined,
              url: pageUrl,
            }),
          },
        ] : [],
      };
    }));
  },
  computed: mapState({
    notices: (state) => state.animals.notices,
    permissions: (state) => state.permissions.my,
    animalId() {
      return this.$route.params.id;
    },
    animal: (state) => state.animals.current,
    hasViewAnimalPermission() {
      return this.permissions.includes('VIEW_ANIMALS');
    },
  }),
  created() {
    this.$store.dispatch('notices/clearNotices');
    this.$store.dispatch('app/setLoading', true);
    this.$store.dispatch('animals/getAnimalById', { id: this.animalId }).finally(() => {
      this.$store.dispatch('app/setLoading', false);
    });
  },
  unmounted() {
    this.$store.dispatch('animals/clearAnimal');
  },
  methods: {
    handleDelete() {
      this.$store.dispatch('animals/deleteAnimal', {
        id: this.animalId,
      }).then(() => {
        this.$router.push('/');
      });
    }
  }
};
</script>

<style scoped lang="scss">
$lightestGrey: #fafafa;

.animal {
  width: 60%;
  padding: 32px;

  &__container {
    background-color: $lightestGrey;
    min-height: calc(100vh - 50px);
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
  }

  &__base {
    display: flex;
    padding-top: 32px;
    height: 700px;

    &.notVolunteer {
      height: unset;
    }

    &__left {
      display: flex;
      flex-direction: column;
      width: 30%;
      margin-right: 32px;
      height: 100%;
    }
  }

  &__delete-btn {
    color: red;
    border-color: red;
    width: 100%;
    margin-top: 32px;

    &:hover {
      background-color: red;
      color: white;
    }
  }

  @media (max-width: 1800px) {
    width: 70%;
  }

  @media (max-width: 1500px) {
    width: 80%;
  }

  @media (max-width: 1200px) {
    width: 90%;
  }

  @media (max-width: 1023px) {
    width: 100%;

    &__base {
      flex-direction: column;
      height: unset;

      &__left {
        width: 100%;
        height: unset;
      }
    }
  }

  @media (max-width: 479px) {
    padding: 24px 0;
    background-color: white;

    &__base__left {
      margin: 32px 0 0 0;
    }

    &__delete-btn {
      width: 90%;
    }
  }
}
</style>
