<template>
  <div class="flex">
    <div
      class="pods-info p-4 bg-red-100 flex flex-col items-center mt-4 mx-2"
      v-for="item in statusComponent"
      :key="item"
    >
      <div class="component-name mb-4">
        {{ item.name }}
      </div>
      <div class="component-status">
        <div class="healthy-stat flex">
          <div class="indicator rounded-full bg-green-200 w-4 h-4 mr-2 mb-4">
            &nbsp;
          </div>
          <div class="number flex items-center justify-center h-4">
            {{ item.healthy }}
          </div>
        </div>

        <div class="healthy-stat flex">
          <div class="indicator rounded-full bg-yellow-500 w-4 h-4 mr-2 mb-4">
            &nbsp;
          </div>
          <div class="number flex items-center justify-center h-4">
            {{ item.warning }}
          </div>
        </div>

        <div class="healthy-stat flex">
          <div class="indicator rounded-full bg-red-500 w-4 h-4 mr-2 mb-4">
            &nbsp;
          </div>
          <div class="number flex items-center justify-center h-4">
            {{ item.error }}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    statusComponent: { type: Array },
  },
  data() {
    return {
      //
    };
  },
};
</script>
