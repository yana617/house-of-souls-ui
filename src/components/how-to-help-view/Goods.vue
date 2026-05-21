<template>
  <table class="goods">
    <thead class="goods__head">
      <tr class="goods__row">
        <th class="goods__cell goods__cell--head">
          Категория
        </th>
        <th class="goods__cell goods__cell--head">
          Подкатегория / Описание
        </th>
        <th class="goods__cell goods__cell--head">
          Позиции / Артикулы
        </th>
      </tr>
    </thead>

    <tbody class="goods__body">
      <template v-for="category in categories" :key="category.category">
        <tr v-for="(item, index) in category.items" :key="item.title + index" class="goods__row">
          <td v-if="index === 0" class="goods__cell goods__category" :rowspan="category.items.length">
            <strong>{{ category.category }}</strong>
          </td>

          <td class="goods__cell goods__cell--sub">
            <span v-if="item.title">{{ item.title }}</span>
            <span v-else-if="item.note">{{ item.note }}</span>
          </td>

          <td class="goods__cell">
            <template v-if="item.codes?.length">
              <code v-for="code in item.codes" :key="code">
                <a class="goods__code" :href="`https://www.wildberries.by/catalog/${code}/detail.aspx`">
                  #{{ code }}
                </a>
              </code>
            </template>

            <span v-else-if="item.note && item.title">
              {{ item.note }}
            </span>
          </td>
        </tr>
      </template>
    </tbody>
  </table>
</template>

<script setup>
const categories = [
  {
    category: 'Сухой корм',
    items: [
      { title: 'Для собак', codes: ['180478261', '180477134'] },
      { title: 'Для кошек', codes: ['181958647', '181554089'] },
      { title: 'Для котят (актуально с марта по октябрь)', codes: ['271979272', '373573684'] },
      {
        title: 'Рекомендации',
        note: 'Proplan / Royal Canin (Sterilized) для кошек/котят; Royal Canin / Brit / Premil Special для собак'
      }
    ]
  },
  {
    category: 'Наполнитель',
    items: [{ title: 'Древесный', codes: ['148977087'] }]
  },
  {
    category: 'Моющие средства и хоз. инвентарь',
    items: [
      { title: 'Основные позиции', codes: ['91261200', '176118843'] },
      {
        title: 'Дополнительно',
        note: 'швабры, веники, губки, средства для мытья пола и посуды и другое'
      }
    ]
  },
  {
    category: 'Лекарства и витамины',
    items: [{ title: 'Примечание', note: 'актуальный список лучше уточнить по телефону' }]
  }
];
</script>

<style scoped lang="scss">
.goods {
  width: 100%;
  border-collapse: collapse;
  margin: 32px 0 16px;
  font-size: 15px;
  text-align: left;

  &__head {
    background: #f5f5f5;
  }

  &__row {
    border-bottom: 1px solid #ddd;
  }

  &__cell {
    padding: 12px 14px; // увеличенный padding
    vertical-align: top;

    &--head {
      font-weight: 600;
      background: #f5f5f5;
    }
  }

  &__category {
    font-weight: 600;
    background: #fafafa;
  }

  &__code {
    display: inline-block;
    margin-right: 6px;
    padding: 3px 7px;
    background: #eee;
    border-radius: 4px;
    font-family: monospace;
    color: #ae1ae8;
  }

  @media (max-width: 500px) {

    th:nth-child(2),
    &__cell--sub {
      display: none;
    }
  }
}
</style>
