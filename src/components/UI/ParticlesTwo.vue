<script setup>
defineProps({
  render: {
    type: Boolean,
  },
});
</script>

<template>
  <span style="--i: 13"></span>
  <span style="--i: 28"></span>
  <span style="--i: 11"></span>
  <span style="--i: 12"></span>
  <span style="--i: 24"></span>
  <span style="--i: 10"></span>
  <span style="--i: 14"></span>
  <span style="--i: 23"></span>
  <span style="--i: 18"></span>
  <span style="--i: 16"></span>
  <span style="--i: 19"></span>
  <span style="--i: 20"></span>

  <span v-if="render" style="--i: 22"></span>
  <span v-if="render" style="--i: 25"></span>
  <span v-if="render" style="--i: 18"></span>
  <span v-if="render" style="--i: 21"></span>
  <span v-if="render" style="--i: 15"></span>
</template>

<style lang="scss" scoped>
span {
  position: relative;
  width: 2rem;
  height: 2rem;
  background: #4fc3dc;
  margin: 0 4px;
  border-radius: 50%;
  opacity: 0;
  box-shadow: 0 0 0 10px #4fc3dc44, 0 0 50px #4fc3dc, 0 0 100px #4fc3dc;
  animation: bubbles 15s linear infinite;
  animation-duration: calc(125s / var(--i));

  @keyframes bubbles {
    0% {
      transform: translateY(100vh) scale(0);
    }
    6% {
      opacity: 1;
    }
    100% {
      transform: translateY(-10vh) scale(1);
    }
  }
}
span:nth-child(even) {
  background-color: #ff2d75;
  box-shadow: 0 0 0 10px #ff2d7544, 0 0 50px #ff2d75, 0 0 100px #ff2d75;
}
@media (max-width: 1200px) {
  span {
    width: 1.5rem;
    height: 1.5rem;
  }
}
@media (max-width: 400px) {
  span {
    position: relative;
    width: 0.5rem;
    height: 0.5rem;
  }
}
@media (max-width: 500px) {
  span {
    position: relative;
    width: 0.7rem;
    height: 0.7rem;
  }
}
@media (max-width: 585px) {
  span {
    position: relative;
    width: 0.9rem;
    height: 0.9rem;
  }
}
</style>
