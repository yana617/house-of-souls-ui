<template>
  <div>
    <div v-for="(m, index) in materials" :key="index" class="material">
      <h2 class="material__title">
        {{ m.title }}
      </h2>

      <p v-if="m.description" class="material__description">
        {{ m.description }}
      </p>

      <div v-if="m.links?.length" class="material__block">
        <ul>
          <li v-for="(link, i) in m.links" :key="i">
            <a :href="link" target="_blank">{{ link }}</a>
          </li>
        </ul>
      </div>

      <div v-if="m.files?.length" class="material__block">
        <ul>
          <li v-for="(file, i) in m.files" :key="i">
            <a :href="file.link" target="_blank">{{ file.name }}</a>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script setup>
defineProps({
  materials: {
    type: Array,
    required: true,
  },
});
</script>

<style scoped lang="scss">
.material {
  padding: 16px;
  margin-bottom: 16px;
  background: #fafafa;
  border-radius: 8px;

  &__title {
    margin: 0 0 8px;
  }

  &__description {
    margin-bottom: 12px;
  }

  &__block {
    margin-top: 12px;

    a {
      display: block;
      max-width: 600px;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }
  }

  &__block-title {
    font-weight: 600;
    margin-bottom: 4px;
  }

  @media (max-width: 767px) {
    &__block a {
      max-width: 250px;
    }
  }
}
</style>
