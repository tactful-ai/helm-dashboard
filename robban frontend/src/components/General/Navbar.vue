<template>
  <div
    class="flex justify-between navbar-container bg-purple-50 overflow-hidden shadow-sm p-4"
  >
    <router-link to="/">
      <div class="brand flex flex-wrap cursor-pointer">
        <div class="logo mr-2 ml-8 justify-center items-center ">
          <img src="https://kubernetes.io/images/favicon.png" class="w-8" />
        </div>
        <div class="name flex items-center">
          robban
        </div>
      </div>
    </router-link>
    <div class="Another nav elements">
      &nbsp;
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {};
  },
};
</script>

<style>
body {
}
</style>
