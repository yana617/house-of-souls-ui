<template>
  <label v-show="label">{{ label }}</label>
  <div class="animal-sex-switch">
    <div
      class="animal-sex-switch__option left-option"
      :class="{ selected: input === AnimalSex.MALE }"
      @click="handleChange(false)"
    >
      <span>{{ type === AnimalType.DOG ? 'Кобель' : 'Кот' }}</span>
    </div>
    <div
      class="animal-sex-switch__option right-option"
      :class="{ selected: input === AnimalSex.FEMALE }"
      @click="handleChange(true)"
    >
      <span>{{ type === AnimalType.DOG ? 'Сука' : 'Кошка' }}</span>
    </div>
  </div>
</template>

<script setup>
import { toRef } from 'vue';
import AnimalType from '@/utils/enums/AnimalType';
import AnimalSex from '@/utils/enums/AnimalSex';

const props = defineProps({
  type: String,
  label: String,
  modelValue: String,
});

const emit = defineEmits(["update:modelValue"]);

const input = toRef(() => props.modelValue);

const handleChange = (isGirl) => {
  emit("update:modelValue", isGirl ? AnimalSex.FEMALE : AnimalSex.MALE);
};
</script>

<style lang="scss" scoped>
$grey1: #8a92a6;
$blue: #3f91f7;
$pink: #f699cd;

label {
  margin: 12px 0 4px;
  font-weight: bold;
}

.animal-sex-switch {
  width: 200px;
  display: flex;
  border-radius: 12px;
  border: 1px solid $grey1;
  height: 32px;

  &__option {
    width: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    height: 100%;
    cursor: pointer;

    &.left-option {
      border-right: 1px solid $grey1;
      border-top-left-radius: 11px;
      border-bottom-left-radius: 11px;

      &.selected {
        background-color: $blue;
        color: white;
        font-weight: 500;
      }
    }

    &.right-option {
      border-top-right-radius: 11px;
      border-bottom-right-radius: 11px;

      &.selected {
        background-color: $pink;
        color: white;
        font-weight: 500;
      }
    }
  }
}
</style>