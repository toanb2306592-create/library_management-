import { reactive } from "vue";

export const store = reactive({
  user: JSON.parse(localStorage.getItem("user")) || null
});
