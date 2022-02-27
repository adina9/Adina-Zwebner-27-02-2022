<template>
  <section class="filter pa">
    <form ref="">
      <input
        type="text"
        placeholder="Search..."
        @input="$emit('search', searchBy)"
        v-model="searchBy"
        v-focus
      />
      <span class="search-icon"
        ><fa icon="fa-solid fa-magnifying-glass" />
      </span>
    </form>
    <cities-list
      v-if="searchBy && !isCityClicked"
      :cities="cities"
      @choose-city="$emit('choose-city', $event), (searchBy = '')"
    />
  </section>
</template>

<script>
import CitiesList from "./CitiesList.vue";
export default {
  name: "CityFilter",
  props: { cities: null, isCityClicked: Boolean },
  data: () => ({ searchBy: "" }),
  components: { CitiesList },
  emits: ["search", "choose-city"],
};
</script>