<template>
  <div
    :class="[
      'expandbtn',
      'mr-4',
      'cursor-pointer',
      'font-bold',
      'w-10',
      'h-10',
      'flex',
      'justify-center',
      'items-center',
      { 'expandbtn-clicked': revisionOpenLocal },
    ]"
    @click="toggleRevisionOpen"
  >
    >
  </div>
</template>

<script>
export default {
  props: {
    revisionOpen: { type: Boolean },
  },
  data() {
    return {
      revisionOpenLocal: this.revisionOpen,
    };
  },
  methods: {
    toggleRevisionOpen() {
      this.revisionOpenLocal = !this.revisionOpenLocal;
      this.$emit("collapseTick", this.revisionOpenLocal);
    },
  },
};
</script>

<style scoped>
.expandbtn-clicked {
  transform: rotate(90deg);
}
</style>
