<template>
  <v-app
    :class="{ dark: settings.isDarkMode }"
  >
    <v-main>
      <app-header :settings="settings" @update-settings="updateSettings" />
      <router-view :settings="settings" />
    </v-main>
  </v-app>
</template>

<script>
import AppHeader from "./cmps/AppHeader.vue";

export default {
  components: { AppHeader },
  name: "App",
  created() {
    this.loadSettings();
  },
  methods: {
    async loadSettings() {
      await this.$store.dispatch({ type: "loadSettings" });
    },
    async updateSettings(optionIdx) {
      await this.$store.dispatch({ type: "updateSettings", optionIdx });
    },
  },
  computed: {
    settings() {
      return this.$store.getters.settings;
    },
  },
};
</script>
