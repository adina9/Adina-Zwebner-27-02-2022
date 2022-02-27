<template>
  <div class="weather-details pa">
    <city-filter
      @search="searchCities"
      :cities="citiesForDisplay"
      :isCityClicked="isCityClicked"
      @choose-city="chooseCity"
    />
    <days-list
      v-if="weatherDays && currCity"
      :currCity="currCity"
      :favorites="favorites"
      :weatherDays="weatherDays"
      @update-city="updateCity"
      :isCelsius="settings.isCelsius"
    />
  </div>
</template>

<script>
import Swal from "sweetalert2";
import CityFilter from "../cmps/CityFilter.vue";
import DaysList from "../cmps/DaysList.vue";

export default {
  name: "WeatherDetails",
  props: { settings: null },
  data: () => ({ isCityClicked: false }),
  created() {
    if (!this.currCity) {
      this.isCityClicked = true;
      this.chooseCity({
      });
    }
    this.loadFavorites();
  },
  methods: {
    searchCities(searchBy) {
      this.isCityClicked = false;
      this.loadCities(searchBy);
    },
    async loadCities(searchBy) {
      await this.$store.dispatch({ type: "loadCities", searchBy });
    },
    async loadFavorites() {
      await this.$store.dispatch({ type: "loadFavorites" });
    },
    async chooseCity(city) {
      this.isCityClicked = true;
      await this.$store.dispatch({ type: "chooseCity", city });
    },
    async updateCity(status, city) {
      this.doSwal();
      await this.$store.dispatch({ type: "updateCity", status, city });
    },
    doSwal() {
      const { clr, title, text } = {
        clr: this.settings.isDarkMode ? "#172b4d" : "#2ea1df",
        text: "Favorites",
        title: status ? "Added" : "Removed ",
      };
      Swal.fire({
        icon: "success",
        title: "The City " + title + " Successfully",
        confirmButtonText: "Go To " + text,
        confirmButtonColor: clr,
        iconColor: clr,
        timer: 3000,
      }).then((res) => {
        if (res.isConfirmed) this.$router.push(`/${text}`);
      });
    },
  },
  computed: {
    citiesForDisplay() {
      return this.$store.getters.citiesForDisplay;
    },
    weatherDays() {
      return this.$store.getters.weatherDays;
    },
    currCity() {
      return this.$store.getters.currCity;
    },
    favorites() {
      return this.$store.getters.favorites;
    },
  },
  components: { CityFilter, DaysList },
};
</script>


