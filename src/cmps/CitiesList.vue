<template>
  <div class="cities-list pa">
    <city-preview
      v-for="city in cities"
      :key="city.Key"
      :city="city"
      @click.native="$emit('choose-city', city)"
    />
  </div>
</template>

<script>
import CityPreview from "./CityPreview.vue";
export default {
  components: { CityPreview },
  name: "CitiesList",
  props: { cities: null },
  emits: ["choose-city"],
};
</script>
