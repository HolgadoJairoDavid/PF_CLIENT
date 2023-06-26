<script setup>
import { useAccessStore} from "../stores/userStore";


const store = useAccessStore();

const openSlimes = () => {
  const popUp = window.open("", "Slimes", "width=800,height=600");
  popUp.document.write(`
        <html>
        <head>
          <title>SLIMES</title>
          <style>
            body { margin: 0; background-color:black; text-align: center }
            iframe { width: 100%; height: 100%; border: none; }
          </style>
        </head>
        <body>
            <h1>SLIMES GAME</h1>
          <iframe allowfullscreen src="https://slimes.onrender.com/?email=${store.user.email}"></iframe>
        </body>
        </html>
      `);
};
const openMemes = () => {
  const popUp = window.open("", "Memes", "width=800,height=600");
  popUp.document.write(`
        <html>
        <head>
          <title>MEMES</title>
          <style>
            body { margin: 0; background-color:black; text-align: center }
            iframe { width: 100%; height: 100%; border: none; }
          </style>
        </head>
        <body>
  
          <iframe allowfullscreen src="https://makeitmeme.com/es/"></iframe>
        </body>
        </html>
      `);
};
</script>

<template>
  <div class="flex flex-col justify-between flex-wrap md:flex-row p-3 m-3">
    <button
      class="text-black text-center font-bold uppercase rounded-lg"
      @click="openSlimes"
    >
      <div class="container">
        <p>SLIMES</p>
        <img
          src="../assets/img/slimes.svg"
          class="w-full h-3/4 object-cover"
          alt=""
        />
      </div>
    </button>
    <button
      class="text-black text-center font-bold uppercase rounded-lg"
      @click="openMemes"
    >
      <div class="container">
        <p>MEME GENERATOR</p>
        <img
          src="../assets/img/memegenerator.svg"
          class="w-full h-3/4 object-cover"
          alt=""
        />
      </div>
    </button>

    <div>
      <div class="container">
        <p>BOMB PARTY</p>
        <img
          src="../assets/img/bombparty.svg"
          class="w-full h-3/4 object-cover"
          alt=""
        />
      </div>
      <div class="container">
        <p>SNAKE</p>
        <img
          src="../assets/img/snake.svg"
          class="w-full h-3/4 object-cover"
          alt=""
        />
      </div>
    </div>

    <div>
      <div class="container">
        <p>FLAPPY BIRD</p>
        <img
          src="../assets/img/flappybird.svg"
          class="w-full h-3/4 object-cover"
          alt=""
        />
      </div>
      <div class="container">
        <p>GARTHIC PHONE</p>
        <img
          src="../assets/img/garthicphone.svg"
          class="w-full h-3/4 object-cover"
          alt=""
        />
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

.container {
  width: 250px;
  height: 180px;
  animation: glow 1s ease-in-out infinite alternate;
  padding: 5px;
  margin: 10px;
  text-align: center;
  text-shadow: #f2e500 5px;
  color: white;
  font-size: large;
  cursor: pointer;
}

.card_meme {
  display: flex;
  flex-direction: column;

  width: 250px;
  height: 150px;
  background-image: url("../assets/img/memegenerator.svg");
  background-size: cover;
  background-position: center;
}

.container:hover {
  background: linear-gradient(45deg, #f2e500, #969696);
  opacity: 90%;
  color: black;
}

@keyframes glow {
  from {
    box-shadow: 0px 0px 5px 5px #f5f5dc;
  }

  to {
    box-shadow: 0px 0px 10px 10px #f2e500;
  }
}

@media screen and (max-width: 768px) {
}
</style>
