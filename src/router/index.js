import { createRouter, createWebHistory } from "vue-router";
import Products from "@/views/Products.vue";
import Favorites from "@/views/Favorites";
import Questionnaires from "@/views/Questionnaires";
import Questionnaire from "@/views/Questionnaire";
import Tags from "@/views/Tags.vue";

const routes = [
  {
    path: "/products",
    name: "Products",
    component: Products,
  },
  {
    path: "/favorites",
    name: "Favorites",
    component: Favorites,
  },
  {
    path: "/questionnaires",
    name: "Questionnaires",
    component: Questionnaires,
  },
  {
    path: "/questionnaire/:id",
    name: "Questionnaire",
    component: Questionnaire,
    props: true,
  },
  {
    path: "/tags",
    name: "Tags",
    component: Tags,
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
