<template>
  <div class="app-image" style="margin-right: 8px;">
    <img :src="value.length && value[0].publicUrl" v-if="!isBlank">
  </div>
</template>

<script>
export default {
  name: 'app-list-item-image',

  props: ['value'],

  computed: {
    isBlank() {
      return !this.value || !this.value.length;
    },
  },
};
</script>

<style>
</style>
