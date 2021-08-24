<template>
  <div class="card-name flex justify-center text-2xl p-4 border-b-2">
    {{ name }}
  </div>
</template>

<script>
export default {
  props: { name: { type: String } },
  data() {
    return {
      //
    };
  },
};
</script>
