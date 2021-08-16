<template>
  <div
    class="release-card flex justify-around bg-white h-20 rounded-md shadow-md my-4 mb-8"
  >
    <div class="img flex items-center">
      <img :src="currentRelease.img" class="w-12" />
    </div>

    <div class="name flex items-center">
      {{ currentRelease.name }}
    </div>

    <div class="revision flex justify-center flex-col">
      <div>Revisions</div>
      <div class="flex justify-center">
        {{ currentRelease.revision }}
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    currentRelease: { type: Object },
  },
  data() {
    return {
      //
    };
  },
};
</script>
