<template>
  <router-link to="/">
    <v-card @click="$emit('choose-city')" evaluation="4" icon class="fav-preview flex col tac j-evenly">
      <p>{{ city.LocalizedName }}</p>
      <p>{{ txtForDisplay.degrees }}° {{ txtForDisplay.sign }}</p>
      <p>{{ city.Day.IconPhrase }}</p>
    </v-card>
  </router-link>
</template>

<script>
export default {
  name: "FavCityPreview",
  props: {
    city: Object,
    isCelsius: { type: Boolean, default: true },
  },
  computed: {
    txtForDisplay() {
      const {
        Temperature: { Maximum, Minimum },
      } = this.city;

      var currDegrees =
        new Date(Date.now()).getHours() > 8 ? Maximum.Value : Minimum.Value;
      return this.isCelsius
        ? { degrees: (currDegrees - 30) / 2, sign: "C" }
        : { degrees: currDegrees, sign: "F" };
    },
  },
  emits:['choose-city']
};
</script>
