<script setup>

  defineProps({
    donation: {
      type: Object
    }
  })

</script>

<template>
    <div class="tarjeta">
      <p>{{ donation.name }}</p>
      <p>{{ donation.email }}</p>
      <p>${{ donation.value }} ({{ donation.currency_code }})</p>
  </div>
</template>

<style lang="scss" scoped>
  .tarjeta {
  background-color: var(--container);
  border-radius: 10px;
  margin: 0.5rem;
  padding: 0.5rem;
  width: 23%;
  font-size: medium;
  font-weight: bold;
  border: 1px solid var(--details);
  display: flex;
  align-items: center;
  flex-direction: column;
  flex-wrap: wrap;
  color: var(--title);
}
</style>