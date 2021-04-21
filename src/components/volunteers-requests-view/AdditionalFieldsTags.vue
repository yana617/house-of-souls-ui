<template>
  <a-tag
    v-for="uaf in userAdditionalFields"
    :key="uaf._id"
    class="additional-fields-tags__tag"
    :class="uaf.value ? 'enabled' : 'disabled'"
    :color="uaf.value ? 'green' : 'default'"
  >
    {{ getUserAdditionalField(uaf.additional_field_template_id) }}
  </a-tag>
</template>

<script>
export default {
  name: 'AdditionalFieldsTags',
  props: {
    userAdditionalFields: Array,
    additionalFieldsTemplates: Array,
  },
  methods: {
    getUserAdditionalField(id) {
      if (!this.additionalFieldsTemplates) return '..';
      const additionalFieldsTemplate = this.additionalFieldsTemplates.find((f) => f._id === id);
      return additionalFieldsTemplate ? additionalFieldsTemplate.label : '..';
    },
  },
};
</script>

<style scoped lang="scss">
.additional-fields-tags {
  &__tag {
    &.disabled {
      text-decoration: line-through;
    }
  }
}
</style>
