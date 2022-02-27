<template>
  <div v-if="city" class="city-preview flex c-center j-between ma">
    <p>{{ city.LocalizedName }}, {{ city.Country.LocalizedName }}</p>
  </div>
</template>

<script>
export default {
  name: "CityPreview",
  props: { city: Object },
};
</script>