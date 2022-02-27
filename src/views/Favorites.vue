<template>
  <section class="favorites flex pa">
    <span>your favorites cities</span>
    <div class="favorites-list flex">
      <fav-city-preview
        v-for="city in favorites"
        :key="city.Key"
        :city="city"
        @choose-city="$store.dispatch({ type: 'chooseCity', city })"
        :isCelsius="settings.isCelsius"
      />
    </div>
  </section>
</template>

<script>
import favCityPreview from "../cmps/favCityPreview.vue";
import Swal from "sweetalert2";

export default {
  components: { favCityPreview },
  name: "Favorites",
  props: { settings: Object },
  data: () => ({ favorites: [] }),
  created() {
    this.loadFavorites();
  },
  mounted() {
    if (!this.$store.getters.favorites) this.doSwal();
  },
  methods: {
    async loadFavorites() {
      await this.$store.dispatch({ type: "loadFavorites" });
    },
    doSwal() {
      const clr = this.settings.isDarkMode ? "#172b4d" : "#2ea1df";
      Swal.fire({
        title: "There Are No Favorite Cities Yet...",
        text: "Go back home and add cities to your favorite list",
        icon: "info",
        confirmButtonText: "Go To Home",
        confirmButtonColor: clr,
        iconColor: clr,
      }).then((res) => {
        if (res.isConfirmed) this.$router.push("/");
      });
    },
  },
  watch: {
    "$store.getters.favorites"(updatedFavs) {
      if (!updatedFavs || !updatedFavs.length) this.doSwal();
      else this.favorites = [...updatedFavs];
    },
  },
};
</script>
