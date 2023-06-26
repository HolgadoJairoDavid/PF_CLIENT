<script setup>
import { computed } from "vue";
defineProps({
  member: {
    type: Object,
  },
  newMessages: {
    type: Number,
  },
  user: {
    type: Object,
  },
});
const isOnline = computed(() => {
  return props.member.status === "Online";
});
</script>

<template>
  <div class="text-white">
    <span
      :class="[member.status === 'Online' ? 'text-green-500' : 'text-black']"
      class="p1- m-1"
    >
      {{ member?.status }} {{ " " }}
    </span>
    <span class="p1- m-1">{{ member?.name }}</span>
    <span class="text-yellow-300 p-1 m-1"
      >{{ member._id === user._id ? " ( You )" : "" }}
    </span>
    <span class="text-white"
      >{{ member.status === "offline" ? "(Offline)" : "" }}
    </span>
    <span>
      {{ newMessages }}
    </span>
  </div>
</template>

<style lang="scss" scoped></style>
