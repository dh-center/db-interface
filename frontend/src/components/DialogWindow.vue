<template>
  <transition name="dialog-window">
    <div class="dialog-window__mask">
      <div class="dialog-window__wrapper">
        <div class="dialog-window__container">

          <div class="dialog-window__header">
            <slot name="header"></slot>
          </div>

          <div class="dialog-window__body">
            <slot name="body"></slot>
          </div>

          <div class="dialog-window__footer">
            <slot name="footer">
              <button class="dialog-window__default-button" @click="$emit('close')">
                OK
              </button>
            </slot>
          </div>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
  export default {
    name: 'DialogWindow'
  };
</script>

<style>
  .dialog-window {
    &__mask {
      position: fixed;
      z-index: 9998;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background-color: rgba(0, 0, 0, .5);
      display: table;
      transition: opacity .3s ease;
    }

    &__wrapper {
      display: table-cell;
      vertical-align: middle;
    }

    &__container {
      width: 300px;
      margin: 0 auto;
      padding: 20px 30px;
      background-color: #fff;
    }

    &__header h3 {
      margin-top: 0;
      color: #42b983;
    }

    &__body {
      margin: 20px 0;
    }

    &__default-button {
      float: right;
    }

    &-enter, &-leave-active {
      opacity: 0;
    }

    &-enter &__container,
    &-leave-active &__container {
      transform: scale(1.1);
    }
  }
</style>
