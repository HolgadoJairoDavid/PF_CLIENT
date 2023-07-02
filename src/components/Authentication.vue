<script setup>
import google from "../assets/auth/google.svg";
import github from "../assets/auth/github.svg";
import facebook from "../assets/auth/facebook.svg";
import twitter from "../assets/auth/twitter.svg";
import {
  GithubAuthProvider,
  TwitterAuthProvider,
  FacebookAuthProvider,
  GoogleAuthProvider,
  signInWithPopup,
  getAuth,
} from "firebase/auth";
import { useAccessStore } from "../stores/userStore";
import { useRouter } from "vue-router";
import { toast } from "vue3-toastify";
import "vue3-toastify/dist/index.css";
import { ref } from "vue";
import ClienteService from "../services/ClienteService";
const store = useAccessStore();
const router = useRouter();
const googleProvider = new GoogleAuthProvider();
const facebookProvider = new FacebookAuthProvider();
const twitterProvider = new TwitterAuthProvider();
const githubProvider = new GithubAuthProvider();
const auth = getAuth();
const image = ref("");
import socket from "./../lib/socket";

// ESTE ES CMPONENTE DE AUTH
const loginGoogle = () => {
  signInWithPopup(auth, googleProvider)
    .then(async (result) => {
      const user = {
        type: "Google",
        email: result.user.email,
        image: result.user.photoURL,
        name: result.user.displayName,
      };
      const { data } = await ClienteService.checkthird(user);
      if (data.user === null) {
        store.updateProfile(user);
        return router.push({
          name: "completeProfile",
        });
      }
      if (data.user.isBanned) {
        router.push({ name: "banned" });
        return;
      }
      if (data.user.isDeleted) {
        store.updateProfile(user);
        return router.push({
          name: "completeProfile",
        });
      }
      if (data.access) {
        store.login(data.user);
        store.updateAdmin(data.user);
        socket.emit("new-user");
        router.push({ name: "home" });
      } 
    })
    .catch((error) => {
      toast.warning("Oh! Something went wrong", {
        autoClose: 3000,
      });
      return;
    });
  //  return router.push({ name: "completeProfile" });
};

const loginFacebook = () => {
  toast.warning("Right now Facebook is not working.", {
    autoClose: 3000,
  });
  // signInWithPopup(auth, facebookProvider)
  //   .then((result) => {
  //     const credential = FacebookAuthProvider.credentialFromResult(result);
  //     const token = credential?.accessToken;
  //     console.log(result.user);
  //     store.updateTokenAndType(token, 'Facebook')
  //   })
  //   .catch((error) => {
  //     toast.warning("Oh! Something went wrong", {
  //     autoClose: 3000,
  //   });
  //   return
  //   });
  //  return router.push({ name: "completeProfile" });
};

const loginGithub = () => {
  signInWithPopup(auth, githubProvider)
    .then(async (result) => {
      const user = {
        type: "GitHub",
        email: result.user.email,
        image: result.user.photoURL,
        name: result.user.displayName,
      };
      const { data } = await ClienteService.checkthird(user);
      if (data.user === null) {
        store.updateProfile(user);
        return router.push({
          name: "completeProfile",
        });
      }
      if (data.user.isBanned) {
        router.push({ name: "banned" });
        return;
      }
      if (data.user.isDeleted) {
        store.updateProfile(user);
        return router.push({
          name: "completeProfile",
        });
      }
      if (data.access) {
        store.login(data.user);
        store.updateAdmin(data.user);
        socket.emit("new-user");
        router.push({ name: "home" });
      }  
    })
    .catch((error) => {
      toast.warning("Oh! Something went wrong", {
        autoClose: 3000,
      });
      return;
    });
};
</script>

<template>
  <div class="auth flex justify-around w-[100%]">
    <button
      @click="loginGithub"
      class="bg-white rounded-full cursor-pointer mt-7 border border-yellow-400"
    >
      <img :src="github" alt="" class="h-10" />
    </button>

    <button
      @click="loginGoogle"
      class="bg-white rounded-full cursor-pointer mt-7 border border-yellow-400"
    >
      <img :src="google" alt="" class="h-10" />
    </button>

    <button
      @click="loginFacebook"
      class="bg-white rounded-full cursor-pointer mt-7 border border-yellow-400"
    >
      <img :src="facebook" alt="" class="h-10 hover" />
    </button>
  </div>
</template>

<style lang="scss" scoped>
.auth img {
  transition: 0.5s;
}

.auth img:hover {
  transform: scale(1.2);
}
</style>
