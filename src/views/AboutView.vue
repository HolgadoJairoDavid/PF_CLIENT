<script setup>
import BackgroundParticles from "../components/UI/BackgroundParticles.vue";
import { useAccessStore } from "../stores/userStore";
import { onMounted } from "vue";
import { useRouter } from "vue-router";
const store = useAccessStore();
const router = useRouter();
onMounted(() => {
  if (!store.access) {
    router.push({ name: "login" });
  }
});
</script>
<template>
  <div class="--container-- flex flex-col justify-evenly m-auto items-center overflow-x-hidden" v-if="store.access">
    <BackgroundParticles />
    <div class="flex flex-col  text-white w-3/4   mt-36  m-7 p-2 border border-yellow-300 rounded-2xl">
      <h3 class="text-justify text-xl">
        HenryMoon es un proyecto que busca proporcionar un espacio de relajación y distensión para los programadores. Su objetivo es ayudar a los estudiantes de SoyHenry a ecnotrar un equilibrio salusable entre el trabajo y el descanso para convertirse en programadores exitosos. HenryMoon simboliza la busqueda de la unión entre la paz mental y la relajación, invitando a dejar atrás las preocupaciones diarias y sumergirse en un universo donde todo es posible.
      </h3>

    </div>
    <h1 class="text-white text-center text-3xl mt-5 font-bold">DESARROLLADORES</h1>
    <div class="--container-- m-3 p-2 flex flex-col md:flex-row">
      <div class="md:w-1/2 flex flex-col p-2 m-2">
        <div class=" m-1 border border-yellow-300  flex flex-col items-center md:flex-row rounded-2xl">
          <div
            class="border border-yellow-300 w-48 h-48 m-2 bg-white flex items-center justify-center rounded-full overflow-hidden">
            <img src="../assets/img/Aufer.svg" alt="Aufer" class="w-full h-full object-cover" />
          </div>
          <div class="md:w-2/3 m-2 bg-black text-white">
              <div class="containerNombreImagen">
                <h3 class="text-xl mt-2 font-bold text-center">
                  Aufer Victoriano Contreras Cáceres
                </h3>
                <p class="text-l mt-4 text-justify">
                  Lorem ipsum dolor sit amet, consectetur adipisicing elit. Vel
                  soluta inventore, corrupti dolorum ab excepturi? Incidunt dolore
                  molestiae, necessitatibus, ipsum in odio veniam delectus at
                  extemporaaliquam reprehenderit hic!
                </p>
                <div class="iconos">
                  <a href="https://github.com/Aufervic" target="_blank">
                    <div class="github-picture"></div>
                  </a>
                  <a href="https://www.linkedin.com/in/aufervic/" target="_blank">
                    <div class="linkedin-picture"></div>
                  </a>
                </div>
              </div>
            </div>
        </div>
        <div class="border border-yellow-300 m-1 flex flex-col items-center md:flex-row rounded-2xl">
          <!-- Poner los links hacia github y Linkdin -->
          <!-- <a href="https://github.com/EAguirreChama" target="_blank"> -->

            <div
              class="border border-yellow-300 w-48 h-48 m-2 bg-white flex items-center justify-center rounded-full overflow-hidden">
              <img src="../assets/img/Ernesto.svg" alt="Ernesto" class="w-full h-full object-cover" />
            </div>
            <div class="md:w-2/3 m-2 bg-black text-white">
              <div class="containerNombreImagen">
                <h3 class="text-xl mt-2 font-bold text-center">
                  Ernesto Jesús Aguirre Chama
                </h3>
                <p class="text-l mt-4 text-justify">
                  Lorem ipsum dolor sit amet, consectetur adipisicing elit. Vel
                  soluta inventore, corrupti dolorum ab excepturi? Incidunt dolore
                  molestiae, necessitatibus, ipsum in odio veniam delectus at
                  extemporaaliquam reprehenderit hic!
                </p>
                <div class="iconos">
                  <a href="https://github.com/EAguirreChama" target="_blank">
                    <div class="github-picture"></div>
                  </a>
                  <a href="https://www.linkedin.com/in/aguirre-chama-ernesto-a9a090269/" target="_blank">
                    <div class="linkedin-picture"></div>
                  </a>
                </div>
              </div>
            </div>

        </div>
        <div class="border border-yellow-300 m-1 flex flex-col items-center md:flex-row rounded-2xl">
          <div
            class="border border-yellow-300 w-48 h-48 m-2 bg-white flex items-center justify-center rounded-full overflow-hidden">
            <img src="../assets/img/johan.svg" alt="Johan" class="w-full h-full object-cover" />
          </div>
          <div class="md:w-2/3 m-2 bg-black text-white">
              <div class="containerNombreImagen">
                <h3 class="text-xl mt-2 font-bold text-center">
                  Johan Fabian Arciniegas Fajardo
                </h3>
                <p class="text-l mt-4 text-justify">
                  Lorem ipsum dolor sit amet, consectetur adipisicing elit. Vel
                  soluta inventore, corrupti dolorum ab excepturi? Incidunt dolore
                  molestiae, necessitatibus, ipsum in odio veniam delectus at
                  extemporaaliquam reprehenderit hic!
                </p>
                <div class="iconos">
                  <a href="https://github.com/JFFajardo" target="_blank">
                    <div class="github-picture"></div>
                  </a>
                  <a href="https://www.linkedin.com/in/johan-arciniegas-fajardo-81500511a/" target="_blank">
                    <div class="linkedin-picture"></div>
                  </a>
                </div>
              </div>
            </div>
        </div>
        <div class="border border-yellow-300 m-1 flex flex-col items-center md:flex-row rounded-2xl">
          <div
            class="border border-yellow-300 w-48 h-48 m-2 bg-white flex items-center justify-center rounded-full overflow-hidden">
            <img src="../assets/img/Lienan.svg" alt="Lienan" class="w-full h-full object-cover" />
          </div>
          <div class="md:w-2/3 m-2 bg-black text-white">
              <div class="containerNombreImagen">
                <h3 class="text-xl mt-2 font-bold text-center">
                  Lienan Manuel Wisner
                </h3>
                <p class="text-l mt-4 text-justify">
                  Lorem ipsum dolor sit amet, consectetur adipisicing elit. Vel
                  soluta inventore, corrupti dolorum ab excepturi? Incidunt dolore
                  molestiae, necessitatibus, ipsum in odio veniam delectus at
                  extemporaaliquam reprehenderit hic!
                </p>
                <div class="iconos">
                  <a href="https://github.com/LienanWisner" target="_blank">
                    <div class="github-picture"></div>
                  </a>
                  <a href="https://www.linkedin.com/in/lienanwisner/" target="_blank">
                    <div class="linkedin-picture"></div>
                  </a>
                </div>
              </div>
            </div>
        </div>
      </div>
      <div class="md:w-1/2 flex flex-col p-2 m-2">
        <div class="border border-yellow-300 m-1 flex flex-col items-center md:flex-row rounded-2xl">
          <div
            class="border border-yellow-300 w-48 h-48 m-2 bg-white flex items-center justify-center rounded-full overflow-hidden">
            <img src="../assets/img/icon.png" alt="Camilo" class="w-full h-full object-cover" />
          </div>
          <div class="md:w-2/3 m-2 bg-black text-white">
              <div class="containerNombreImagen">
                <h3 class="text-xl mt-2 font-bold text-center">
                  Camilo Agudelo Betancur
                </h3>
                <p class="text-l mt-4 text-justify">
                  Lorem ipsum dolor sit amet, consectetur adipisicing elit. Vel
                  soluta inventore, corrupti dolorum ab excepturi? Incidunt dolore
                  molestiae, necessitatibus, ipsum in odio veniam delectus at
                  extemporaaliquam reprehenderit hic!
                </p>
                <div class="iconos">
                  <a href="https://github.com/CAgudeloBetancur" target="_blank">
                    <div class="github-picture"></div>
                  </a>
                  <a href="https://www.linkedin.com/in/camilo-agudelo-betancur/" target="_blank">
                    <div class="linkedin-picture"></div>
                  </a>
                </div>
              </div>
            </div>
        </div>
        <div class="border border-yellow-300 m-1 flex flex-col items-center md:flex-row rounded-2xl">
          <div
            class="border border-yellow-300 w-48 h-48 m-2 bg-white flex items-center justify-center rounded-full overflow-hidden">
            <img src="../assets/img/Jairo.svg" alt="Jairo" class="w-full h-full object-cover" />
          </div>
          <div class="md:w-2/3 m-2 bg-black text-white">
              <div class="containerNombreImagen">
                <h3 class="text-xl mt-2 font-bold text-center">
                  Jairo David Holgado
                </h3>
                <p class="text-l mt-4 text-justify">
                  Lorem ipsum dolor sit amet, consectetur adipisicing elit. Vel
                  soluta inventore, corrupti dolorum ab excepturi? Incidunt dolore
                  molestiae, necessitatibus, ipsum in odio veniam delectus at
                  extemporaaliquam reprehenderit hic!
                </p>
                <div class="iconos">
                  <a href="https://github.com/HolgadoJairoDavid" target="_blank">
                    <div class="github-picture"></div>
                  </a>
                  <a href="https://www.linkedin.com/in/jairo-holgado-a28589261" target="_blank">
                    <div class="linkedin-picture"></div>
                  </a>
                </div>
              </div>
            </div>
        </div>

        <div class="border border-yellow-300 m-1 flex flex-col items-center md:flex-row rounded-2xl">
          <div
            class="border border-yellow-300 w-48 h-48 m-2 bg-white flex items-center justify-center rounded-full overflow-hidden">
            <img src="../assets/img/icon.png" alt="Jose" class="w-full h-full object-cover" />
          </div>
          <div class="md:w-2/3 m-2 bg-black text-white">
              <div class="containerNombreImagen">
                <h3 class="text-xl mt-2 font-bold text-center">
                  Jose Antonio Lopez Rocha
                </h3>
                <p class="text-l mt-4 text-justify">
                  Lorem ipsum dolor sit amet, consectetur adipisicing elit. Vel
                  soluta inventore, corrupti dolorum ab excepturi? Incidunt dolore
                  molestiae, necessitatibus, ipsum in odio veniam delectus at
                  extemporaaliquam reprehenderit hic!
                </p>
                <div class="iconos">
                  <a href="https://github.com/joselopez25" target="_blank">
                    <div class="github-picture"></div>
                  </a>
                  <a href="https://www.linkedin.com/in/jose-lopez-rocha-61b5581b0/" target="_blank">
                    <div class="linkedin-picture"></div>
                  </a>
                </div>
              </div>
            </div>
        </div>
        <div class="border border-yellow-300 m-1 flex flex-col items-center md:flex-row rounded-2xl">
          <div
            class="border border-yellow-300 w-48 h-48 m-2 bg-white flex items-center justify-center rounded-full overflow-hidden">
            <img src="../assets/img/Nico.svg" alt="Nico" class="w-full h-full object-cover" />
          </div>
          <div class="md:w-2/3 m-2 bg-black text-white">
              <div class="containerNombreImagen">
                <h3 class="text-xl mt-2 font-bold text-center">
                  Nicolas Dario Suarez
                </h3>
                <p class="text-l mt-4 text-justify">
                  Lorem ipsum dolor sit amet, consectetur adipisicing elit. Vel
                  soluta inventore, corrupti dolorum ab excepturi? Incidunt dolore
                  molestiae, necessitatibus, ipsum in odio veniam delectus at
                  extemporaaliquam reprehenderit hic!
                </p>
                <div class="iconos">
                  <a href="https://github.com/Nicosu99" target="_blank">
                    <div class="github-picture"></div>
                  </a>
                  <a href="https://www.linkedin.com/in/nicol%C3%A1s-suarez-4869201ba/" target="_blank">
                    <div class="linkedin-picture"></div>
                  </a>
                </div>
              </div>
            </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.--container-- {
  position: relative;
  z-index: 100000;
  overflow-x: hidden;
}

@media (max-width: 768px) {
  .--container-- {
    position: relative;
    z-index: 100000;
    flex-direction: column;
    align-items: center;
  }
}

@media (max-width: 480px) {
  .--container-- {
    flex-direction: column;
  }

  .border {
    flex-direction: column;
  }

  .border>div:first-child {
    margin-bottom: 1rem;
  }
}

.containerNombreImagen {
  display: flex;
  flex-direction: column;
  align-items:center;
}

.iconos {
  display: flex;
  justify-content: center;
  // margin-top: 10px;
}

.github-picture {
  width: 38px;
  height: 38px;
  border-radius: 50%;
  background-size: cover;
  margin-top: 11px;
  margin-right: 50px;
}
.linkedin-picture {
  width: 50px;
  height: 50px;
  border-radius: 50%;
  background-size: cover;
  margin-top: 5px;
  margin-left: 50px;
}
.github-picture {
  background-image: url('../assets/img/Logo\ GitHub.png');
}
.linkedin-picture {
  background-image: url('../assets/img/Logo\ Linkdin.png');
}
</style>
