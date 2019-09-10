<template>
  <fieldset
    v-click-outside="close"
    class="custom-select"
    :class="{'custom-select--opened': isOpened}"
    @click="isOpened = !isOpened"
  >
    {{ value }}
    <label class="custom-select__label">
      {{ label }}
    </label>
    <div
      class="input custom-select__select"
    >
      <input
        v-model="searchQuery"
        type="text"
      >
    </div>
    <transition name="options-appear">
      <div
        v-show="isOpened"
        class="custom-select__options-wrapper"
      >
        <div
          v-for="option in filteredOption"
          :key="option.id"
          class="custom-select__option"
          @click="$emit('input', option.id)"
        >
          {{ option.searchName }}
        </div>
      </div>
    </transition>
  </fieldset>
</template>

<script>
  export default {
    name: 'CustomSelect',
    props: {
      options: {
        type: Array,
        required: true
      },
      value: {
        type: String,
        default: () => {
        }
      },
      label: {
        type: String,
        required: true
      }
    },
    data() {
      return {
        isOpened: false,
        searchQuery: ''
      };
    },
    computed: {
      filteredOption() {
        return this.options.filter(opt => opt.search(this.searchQuery));
      },

      currentOptionSearchName() {
        const current = this.options.find(opt => opt.id === this.value);

        return (current || '') && current.searchName;
      }
    },
    watch: {
      currentOptionSearchName: {
        immediate: true,
        handler() {
          this.searchQuery = this.currentOptionSearchName;
        }
      }
    },
    methods: {
      /**
       * Close select
       */
      close() {
        this.isOpened = false;
      }
    }
  };
</script>

<style>
  .custom-select {
    position: relative;
    padding: 0;
    border: 0;
    user-select: none;

    &__label {
      display: block;
      margin-bottom: 9px;
      color: black;
      font-weight: bold;
      font-size: 12px;
      text-transform: uppercase;
    }

    &__select {
      position: relative;
      z-index: 1;
    }

    &__options-wrapper {
      position: absolute;
      top: 100%;
      right: 0;
      left: 0;
      z-index: 2;
      background-color: lightgray;
      box-shadow: 0 2px 3px rgba(0, 0, 0, 0.16);
      transition: transform 120ms cubic-bezier(0.29, 0.97, 0.82, 1.43);
      will-change: transform;

      &.options-appear-leave-active {
        transition: none;
      }

      &.options-appear-enter,
      &.options-appear-leave-to {
        transform: translateY(-10px);
      }

      &.options-appear-enter-to,
      &.options-appear-leave {
        transform: none;
      }
    }

    &__option, &__select {
      display: flex;
      align-items: center;
      width: 100%;
      height: 40px;
      padding: 0 0 0 12px;
      font-size: 14px;
      cursor: pointer;
    }

    &--opened &__option {
      &:hover {
        background-color: #afafaf;
      }
    }
  }
</style>
