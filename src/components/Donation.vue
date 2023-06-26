<script setup>

  defineProps({
    donation: {
      type: Object
    }
  })

</script>

<template>
  <div class="bg-yellow-300 m-2 p-2 w-3/4 md:w-3/4  text-m font-bold border border-black">
    <p>{{ donation.name }}</p>
    <p>{{ donation.email }}</p>
    <p>${{ donation.value }} ({{ donation.currency_code }})</p>
  </div>
</template>

