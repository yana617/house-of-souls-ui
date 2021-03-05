<template>
  <div @click="closeModal()" class="modal__wrapper">
    <div class="new-notice-modal" @click.stop>
      <img @click="closeModal()" class="new-notice-modal__close-icon" src="@/assets/close.png" />
      <h2>Добавление новости</h2>
      <input class="new-notice-modal__title" placeholder="Заголовок" v-model="title" />
      <textarea class="new-notice-modal__description" v-model="description" placeholder="Подробности" />
      <label class="new-notice-modal__authorized">
        Только для волонторов
        <input type="checkbox" v-model="authorized" placeholder="Authorized" />
      </label>
      <Button class="new-notice-modal__save-btn" @click="save()" title="Добавить" />
    </div>
  </div>
</template>

<script>
import Button from '../common/Button.vue';

export default {
  name: 'NewNoticeModal',
  components: { Button },
  data() {
    return {
      title: null,
      description: null,
      authorized: false,
    };
  },
  methods: {
    closeModal() {
      this.$store.dispatch('app/setModal', null);
    },
    save() {
      const body = {
        title: this.title,
        description: this.description,
        authorized: this.authorized,
      };
      this.$store.dispatch('notices/saveNotice', body).then(() => {
        this.$store.dispatch('notices/getNotices');
        this.$store.dispatch('app/setModal', null);
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.new-notice-modal {
  width: 600px;
  position: relative;
  border-radius: 4px;
  overflow: hidden;
  display: flex;
  align-items: center;
  flex-direction: column;
  background-color: white;

  &__close-icon {
    position: absolute;
    width: 32px;
    height: 32px;
    right: 16px;
    top: 12px;
    cursor: pointer;
  }

  &__title,
  &__description {
    display: flex;
    width: 80%;
    border: 1px solid #ccc;
    outline: none;
    padding: 8px 16px;
    margin: 8px;
  }

  &__authorized {
    width: 80%;
    text-align: left;
  }

  &__description {
    resize: none;
    height: 160px;
  }

  &__save-btn {
    color: #42b983;
    border-color: #42b983;
    margin-top: 16px;
    margin-bottom: 8px;
    padding: 8px 16px;

    &:hover {
      background-color: #42b983;
      color: white;
    }
  }
}
</style>
