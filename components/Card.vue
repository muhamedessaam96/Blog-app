<template>
  <div class="max-w-sm rounded-lg bg-gray-100 overflow-hidden shadow-lg">
    <div class="px-6 py-4">
      <div class="font-bold text-xl mb-2">{{ title }}</div>
      <p class="text-gray-700 text-base">
        {{ desc }}
      </p>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    title: String,
    desc: String,
  },
};
</script>
