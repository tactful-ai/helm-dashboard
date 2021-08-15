<template>
  <tr class="">
    <router-link :to="`/${entry.name}/revisions`">
      <td class="w-10 cursor-pointer">
        <img
          class="w-10 ml-4"
          :src="
            `${
              entry.img === undefined
                ? 'https://kubernetes.io/images/favicon.png'
                : entry.img
            }`
          "
        />
      </td>
    </router-link>
    <td>{{ entry.name }}</td>

    <td>{{ entry.namespace }}</td>
    <td>{{ entry.chart }}</td>
    <td>{{ entry.chartVersion }}</td>
    <td>{{ entry.revision }}</td>
    <td>{{ entry.status }}</td>
    <td>{{ entry.updated }}</td>
  </tr>
</template>

<script>
export default {
  props: {
    entry: {
      type: Object,
    },
  },
  data() {
    return {};
  },
  mounted() {
    // console.log(this.entry.img);
  },
};
</script>
