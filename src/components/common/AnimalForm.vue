<!-- eslint-disable max-len -->
<template>
  <div class="animal-form">
    <Select v-model="animal.type" label="Вид животного" :options="TYPE_OPTIONS" />
    <InputV2 v-model="animal.name" label="Имя" :error="getError('name')" />
    <CheckboxV2 v-model="animal.sterilized" label="Стерилизовано / кастрировано" />
    <AnimalSexSwitch v-model="animal.sex" :type="animal.type" label="Пол" />
    <DatePicker v-model="animal.birthday" label="День рождения" />
    <DatePicker
      v-model="animal.second_birthday"
      label="Дата, когда животное спасли"
      description="Второй день рождения"
    />
    <InputV2
      v-if="animal.type === AnimalType.DOG"
      v-model="animal.height"
      label="Рост в холке (см)"
      description="Укажите высоту в холке для данной собаки (числом от 10 до 80)"
    />
    <Select v-model="animal.place" label="Расположение" :options="PLACE_OPTIONS" />
    <Select
      v-if="animal.place !== AnimalPlace.ON_TEMPORARY_HOLD"
      v-model="animal.room"
      label="Комната / вольер"
      :options="ROOM_OPTIONS"
      description="Комнаты идут слева направо и сверху вниз (точная нумерация на карте)"
    />
    <Select
      v-model="animal.status"
      label="Статус"
      :options="STATUS_OPTIONS"
      description="Укажите в каком статусе животное (если животное в статусе ‘Подготовка к поиску дома’ - оно не будет отображаться в поиске для потенциальных хозяев)"
    />
    <InputV2
      v-model="animal.health_details"
      label="Особенности здоровья"
      description="Укажите подробнее о проблемах со здоровьем, если таковые имеются (нужно каждый день капать глаза, нельзя жить с другими котами при ВИК и т.д.)"
    />
    <InputV2
      v-model="animal.description"
      label="Краткое описание / история"
      description="Можете добавить откуда животное (например “Спасли с Гурского”)"
    />
    <InputV2
      v-model="animal.advertising_text"
      is-textarea
      label="Текст для рекламы"
      description="Приветствуется конкретное описание характеристик животного (характер - ласковый/пугливый, информация о стерилизации, прививках, возрасте и тп), а уже потом как оно несчастно и мечтает найти хозяина. Текст будет копироваться для рекламы на других ресурсах. Контакты указывать не нужно!!! Они будут добавляться автоматически."
    />
    <Select
      v-model="animal.curator_id"
      label="Куратор"
      :options="curators"
      description="Если не указано - по умолчанию для собак будет телефон Тамары Николаевны, для котов Иры Приходько. Указывая куратора - его телефон будут видеть все люди, посещающие сайт."
    />

    <a-button
      class="animal-form__submit-btn"
      type="primary"
      shape="round"
      @click="emit('onsubmit', animal)"
    >
      {{ initialValues ? "Сохранить" : "Добавить" }}
    </a-button>
  </div>
</template>

<script setup>
import { reactive, computed } from 'vue';
import { useStore } from 'vuex';

import InputV2 from '@/components/common/InputV2.vue';
import CheckboxV2 from '@/components/common/CheckboxV2.vue';
import Select from '@/components/common/Select.vue';
import AnimalSexSwitch from '@/components/common/AnimalSexSwitch.vue';
import { TYPE_OPTIONS, PLACE_OPTIONS, ROOM_OPTIONS, STATUS_OPTIONS } from '@/utils/constant/animal-form';
import AnimalPlace from '@/utils/enums/AnimalPlace';
import AnimalType from '@/utils/enums/AnimalType';
import DatePicker from '@/components/common/DatePicker.vue';
import AnimalSex from '@/utils/enums/AnimalSex';
import AnimalStatus from '@/utils/enums/AnimalStatus';
import { findError } from '@/utils/validation';

const store = useStore();

store.dispatch('app/setLoading', true);
store.dispatch('users/getCurators').finally(() => {
  store.dispatch('app/setLoading', false);
});

const errors = computed(() => store.state.animals.errors);
const curators = computed(() => {
  const { curators: curatorUsers } = store.state.users;
  return [
    { value: null, label: 'Нет куратора' },
    ...curatorUsers.map(({ id, name, surname, phone }) => ({ value: id, label: `${name} ${surname} (${phone})` })),
  ];
});

const { initialValues } = defineProps({
  initialValues: Object,
  onSubmit: Function,
});
const emit = defineEmits(['onsubmit']);

let animal = reactive({
  type: AnimalType.CAT,
  sex: AnimalSex.MALE,
  place: AnimalPlace.CAT_HOUSE,
  status: AnimalStatus.HOMELESS,
  birthday: null,
  sterilized: true,
  photos: '',
  curator_id: null,
});

if (initialValues) {
  Object.assign(animal, initialValues);
}

const getError = (field) => {
  return findError(errors.value || [], field);
};

</script>

<style scoped lang="scss">
$lightestGrey: #fafafa;
$black1: #232d42;


.animal-form {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  width: 400px;
  text-align: left;

  @media (max-width: 500px) {
    width: 300px;
  }

  &__submit-btn {
    margin-top: 20px;
    margin-bottom: 20px;
  }
}
</style>
