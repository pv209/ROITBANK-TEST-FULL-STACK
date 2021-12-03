<template>
  <div class="popup">
    <div class="popup-inner"></div>
    <slot />
  </div>
</template>

<script>
export default {
  props: ['TogglePopup'],
  name: 'Popup',
};
</script>

<style lag="scss" scoped>
.popup {
  position: fixed;
  flex-direction: column;
  align-items: center;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 99;
  background-color: #fff;
  display: flex;
  align-items: center;
  justify-content: center;
}

* .popup-inner {
  background: #fff;
  padding: 32px;
  display: flex;
}

.btn {
  outline: none;
  display: flex;
  border: 0;
  font-size: 16px;
  padding: 16px 30px;
  border-radius: 4px;
  background-color: #e2b874;
  color: #ffff;
  cursor: pointer;
  font-family: 'Poppins';
}
</style>
