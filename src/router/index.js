import { createRouter, createWebHistory } from "vue-router";
import Landing from "../views/LandingView.vue";
import About from "../views/AboutView.vue";


const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "landing",
      component: Landing,
    },
    {
      path: "/login",
      name: "login",
      component: () => import("../views/Login.vue"),
    },
    {
      path: "/register",
      name: "register",
      component: () => import("../views/Register.vue"),
    },
    {
      path: '/profile',
      name: 'profile',
      component: () => import('../views/ProfileView.vue')
    },
    {
      path: '/home',
      name: 'home',
      component: () => import('../views/Home.vue')
    },
    {
      path: "/about",
      name: "about",
      component: () => import("../views/AboutView.vue"),
    },
    {
      path: "/donation",
      name: "donation",
      component: () => import("../views/DonationView.vue"),
    },
    {
      path: "/complete-Profile",
      name: "completeProfile",
      component: () => import("../views/CompleteProfileView.vue"),
      props: true
    },
    {
      path: "/admin",
      name: "admin",
      component: () => import("../views/AdminView.vue"),
    },
    {
      path: "/updateUser",
      name: "updateUser",
      component: ()=> import("../views/UpdateUser.vue")
    },
    {
      path: "/admin/student-detail/:id",
      name: "studentView",
      component: ()=> import("../views/AdminStudentView.vue")
    },
    {
      path: "/banned",
      name: "banned",
      component: ()=> import("../views/BannedView.vue")
    },
  ],
});

export default router;
