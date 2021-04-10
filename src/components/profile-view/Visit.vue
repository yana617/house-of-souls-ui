<template>
  <div class="visit">
    <div class="visit__date">
      <div class="visit__number">
        <span class="visit__number__inner">10</span>
      </div> <b>21.02.2021</b> (воскресенье)
    </div>
    <span class="visit__additional-people">c вами было человек: <b>1</b></span>
    <span>Вечер</span>
  </div>
</template>

<script>
export default {
  name: 'Visit',
  props: {
    date: String,
    type: String,
    additionalPeople: Number,
  },
  methods: {},
};
</script>

<style scoped lang="scss">
$green: #42b983;
$greyBlue: #2c3e50;

.visit {
  display: flex;
  margin: 8px 0;
  padding: 8px 20%;
  width: 100%;
  align-items: center;
  justify-content: space-between;
  border-bottom: 1px solid #ccc;

  &__date {
    display: flex;
    align-items: center;
  }

  &__number {
    display: flex;
    width: 32px;
    height: 32px;
    border-radius: 16px;
    background-color: #1890ff;
    color: white;
    margin-right: 8px;

    &__inner {
      display: flex;
      margin: auto;
    }
  }

  @media (max-width: 768px) {
    padding: 8px 16px;
  }

  @media (max-width: 420px) {
    &__additional-people {
      display: none;
    }
  }
}
</style>
