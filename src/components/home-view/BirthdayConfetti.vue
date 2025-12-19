<template>
  <div v-if="showConfetti" class="birthday-confetti">
    <canvas ref="confettiCanvas" class="birthday-confetti__canvas" />

    <a-modal
      :visible="showModal"
      class="birthday-confetti__modal"
      :footer="null"
      :closable="true"
      @cancel="closeModal"
    >
      <div class="birthday-confetti__modal-content">
        <p class="birthday-confetti__congrats">
          🎉 Поздравляем с днем рождения!
        </p>
        <p class="birthday-confetti__subtitle">
          Сегодня празднуют:
        </p>

        <div class="birthday-confetti__list">
          <div v-for="person in birthdayPeople" :key="person" class="birthday-confetti__person">
            <div class="birthday-confetti__person-info">
              <div class="birthday-confetti__person-name">
                {{ person }}
              </div>
            </div>
          </div>
        </div>
      </div>
    </a-modal>
  </div>
</template>

<script setup>
import { ref, onMounted, computed, watch } from 'vue';
import { useStore } from 'vuex';
import confetti from 'canvas-confetti';

const store = useStore();
const confettiCanvas = ref(null);
const showModal = ref(true);
const showConfetti = ref(false);

const birthdayPeople = computed(() => store.state.users.birthdayPeople);

const LS_KEY = "BIRTHDAY_LAST_SHOWN_FOR";

const checkIfShowedToday = () => {
  const lastShownDate = localStorage.getItem(LS_KEY);
  if (!lastShownDate) return false;

  const today = new Date().toDateString();
  const lastShown = new Date(lastShownDate).toDateString();

  return today === lastShown;
};

const saveShownDate = () => {
  localStorage.setItem(LS_KEY, new Date().toISOString());
};

const startCelebration = () => {
  confetti({
    particleCount: 150,
    spread: 100,
    origin: { y: 0.6 }
  });

  setTimeout(() => {
    confetti({
      particleCount: 100,
      angle: 60,
      spread: 55,
      origin: { x: 0 }
    });

    confetti({
      particleCount: 100,
      angle: 120,
      spread: 55,
      origin: { x: 1 }
    });
  }, 300);

  setTimeout(() => {
    const duration = 3000;
    const end = Date.now() + duration;
    const colors = ['#ff0000', '#00ff00', '#0000ff', '#ffff00', '#ff00ff'];

    (function frame() {
      confetti({
        particleCount: 3,
        angle: 60,
        spread: 55,
        origin: { x: Math.random() },
        colors: colors
      });

      if (Date.now() < end) {
        requestAnimationFrame(frame);
      }
    }());
  }, 600);
};

const closeModal = () => {
  showModal.value = false;
  setTimeout(() => {
    showConfetti.value = false;
  }, 1000);
};

watch(birthdayPeople, () => {
  if (birthdayPeople.value.length > 0) {
    showConfetti.value = true;

    setTimeout(() => {
      showModal.value = true;
      saveShownDate();
      startCelebration();
    }, 500);
  }
});

onMounted(() => {
  if (checkIfShowedToday()) {
    return;
  }

  store.dispatch('users/getBirthdayPeople');
});
</script>

<style lang="scss" scoped>
.birthday-confetti {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
  z-index: 9999;

  &__canvas {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    pointer-events: none;
  }

  &__modal-content {
    padding: 8px;
  }

  &__congrats {
    font-size: 20px;
    font-weight: 600;
    color: #1890ff;
    text-align: center;
    margin-bottom: 16px;
  }

  &__subtitle {
    font-size: 16px;
    color: #666;
    margin-bottom: 16px;
    text-align: center;
  }

  &__list {
    max-height: 300px;
    overflow-y: auto;
    margin-bottom: 24px;
    padding: 8px;
    background: #fafafa;
    border-radius: 8px;

    &::-webkit-scrollbar {
      width: 6px;
    }

    &::-webkit-scrollbar-track {
      background: #f1f1f1;
      border-radius: 3px;
    }

    &::-webkit-scrollbar-thumb {
      background: #c1c1c1;
      border-radius: 3px;

      &:hover {
        background: #a8a8a8;
      }
    }
  }

  &__person {
    display: flex;
    align-items: center;
    padding: 12px;
    margin-bottom: 8px;
    background: white;
    border-radius: 8px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
    transition: transform 0.2s, box-shadow 0.2s;

    &:hover {
      transform: translateY(-2px);
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
    }

    &:last-child {
      margin-bottom: 0;
    }
  }

  &__person-info {
    flex: 1;
  }

  &__person-name {
    font-weight: 600;
    color: #333;
    margin-bottom: 4px;
  }
}

// Анимация появления модалки
.birthday-confetti__modal :deep(.ant-modal) {
  animation: fadeIn 0.3s ease-out;
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: scale(0.9);
  }

  to {
    opacity: 1;
    transform: scale(1);
  }
}

// Медиа-запросы для адаптивности
@media (max-width: 768px) {
  .birthday-confetti {
    &__modal-content {
      padding: 4px;
    }

    &__congrats {
      font-size: 18px;
      margin-bottom: 12px;
    }

    &__subtitle {
      font-size: 14px;
      margin-bottom: 12px;
    }

    &__list {
      max-height: 200px;
      margin-bottom: 16px;
    }

    &__person {
      padding: 8px;
      margin-bottom: 6px;
    }

    &__person-name {
      font-size: 14px;
    }
  }
}

@media (max-width: 480px) {
  .birthday-confetti {
    &__modal :deep(.ant-modal) {
      width: 95% !important;
      max-width: 95%;
    }

    &__congrats {
      font-size: 16px;
    }

    &__list {
      max-height: 180px;
    }
  }
}
</style>