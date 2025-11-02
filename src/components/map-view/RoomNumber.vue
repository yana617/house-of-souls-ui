<template>
  <div class="room-number">
    <span>{{ roomNumber }}</span>
  </div>
</template>

<script>
export default {
  name: 'RoomNumber',
  props: {
    roomNumber: String,
  }
};
</script>

<style scoped lang="scss">
$green: #42b983;

.room-number {
  min-width: 24px;
  max-width: 24px;
  min-height: 24px;
  max-height: 24px;
  border-bottom-right-radius: 6px;
  background-color: $green;
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>