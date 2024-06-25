import Main from "./pages/MainPage";
import NotFound from "./pages/NotFoundPage";

const routes = [
  {
    path: "/",
    name: "main",
    component: () => import("./pages/MainPage.vue"),
  },
  {
    path: "/register",
    name: "register",
    component: () => import("./pages/RegisterPage.vue"),
  },
  {
    path: "/login",
    name: "login",
    component: () => import("./pages/LoginPage.vue"),
  },
  {
    path: "/search",
    name: "search",
    component: () => import("./pages/SearchPage.vue"),
  },
  {
    path: "/about",
    name: "about",
    component: () => import("./pages/AboutPage.vue"),
  },
  {
    path: "/recipe/:recipeId",
    name: "recipe",
    component: () => import("./pages/RecipeViewPage.vue"),
  },
  {
    path: "/favorites",
    name: "favorites",
    component: () => import("./pages/FavoritesPage.vue"),
  },
  {
    path: "/my-recipes",
    name: "my_recipes",
    component: () => import("./pages/MyRecipesPage.vue"),
  },
  {
    path: "/family-recipes",
    name: "my_family_recipes",
    component: () => import("./pages/MyFamilyRecipesPage.vue"),
  },
  {
    path: "*",
    name: "notFound",
    component: NotFound,
  },
];

export default routes;
