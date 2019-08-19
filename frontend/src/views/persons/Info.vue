<template>
  <div class="person-info">
    <h2
      ref="name"
      :contenteditable="editable"
      data-placeholder="full person name"
      class="person-info__name"
    />
    <div class="person-info__mini">
      <div class="person-info__lifetime">
        <h3 class="person-info__mini-header">
          годы жизни
        </h3>
        <span
          ref="birthDate"
          data-placeholder="dd.mm.yyyy"
          :contenteditable="editable"
        />
        &mdash;
        <span
          ref="deathDate"
          data-placeholder="dd.mm.yyyy"
          class="date-input"
          :contenteditable="editable"
        />
      </div>
      <div class="person-info__profession">
        <h3 class="person-info__mini-header">
          деятельность
        </h3>
        <span
          ref="profession"
          :contenteditable="editable"
          data-placeholder="person's professions"
        />
      </div>
    </div>
    <div
      ref="description"
      :contenteditable="editable"
      data-placeholder="person description"
      class="person-info__description"
    />
  </div>
</template>

<script>
  export default {
    name: 'PersonInfo',
    props: {
      person: {
        type: Object,
        required: true
      },
      editable: Boolean
    },
    mounted() {
      for (const ref in this.$refs) {
        this.$refs[ref].addEventListener('input', event => {
          this.person[ref] = event.target.innerText;
        });
      }

      this.setData();
    },
    methods: {
      setData() {
        for (const ref in this.$refs) {
          this.$refs[ref].innerText = this.person[ref];
        }
      }
    }
  };
</script>

<style>
  .person-info {
    max-width: 450px;
    display: flex;
    flex-direction: column;
    margin: auto;

    &__name {
      font-family: 'Oranienbaum', serif;
      font-size: 24px;
      line-height: 28px;
      margin-bottom: 10px;
      color: #2d2d2d;
    }

    &__mini {
      display: flex;
      flex-wrap: wrap;
      border-bottom: 1px solid rgba(0, 0, 0, .2);
    }

    &__mini-header {
      font-family: 'Roboto', sans-serif;
      font-size: 8px;
      line-height: 9px;
      display: block;
      margin-bottom: 8px;
      letter-spacing: .2em;
      text-transform: uppercase;
      color: #000;
    }

    &__lifetime,
    &__profession {
      flex-basis: 50%;
      font-family: 'Roboto', sans-serif;
      font-size: 14px;
      font-weight: 300;
      line-height: 16px;
      padding-left: 20px;
      margin-bottom: 0;
      color: #000;
    }

    &__lifetime {
      padding-left: 0;
      border-right: 1px solid rgba(0, 0, 0, .2);
    }

    &__description {
      margin-top: 20px;
    }
  }

  [contenteditable]:empty::before {
    content: attr(data-placeholder);
    opacity: 0.5;
    display: inline;
  }
</style>
