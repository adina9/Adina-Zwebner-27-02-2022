<template>
  <div class="app-header flex a-center pa">
    <div class="inner-div flex j-between main-layout a-center">
      <div class="logo">
        <h3>{{ appName | capitalize }}</h3>
      </div>

      <nav class="nav-links flex j-center">
        <router-link to="/" active-class="active-link" exact>Home</router-link>
        <router-link to="/favorites" active-class="active-link"
          >Favorites</router-link
        >
      </nav>
    </div>
    <toggle-wrapper
      :settings="settings"
      @update-settings="$emit('update-settings', $event)"
    />
  </div>
</template>

<script>
import ToggleWrapper from "./ToggleWrapper.vue";
export default {
  components: { ToggleWrapper },
  name: "AppHeader",
  data: () => ({ appName: "malam weather task" }),
  props: {
    settings: { type: Object, default: { isDarkMode: false, isCelsius: true } },
  },
  filters: {
    capitalize: (value) =>
      !value
        ? ""
        : value
            .split(" ")
            .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
            .join(" "),
  },
  emits: ["update-settings"],
};
</script>