<template>
  <section v-if="currCity" class="days-list flex col pa ttc j-between">
    <div class="top flex j-between a-center">
      <div class="first clean-list flex col">
        <p>{{ currCity.LocalizedName }}</p>
        <p>{{ dateForDisplay }}</p>
        <small
          ><fa
            :icon="`fa-${dayDetails.degrees < 0 ? 'minus' : 'plus'}`"
          ></fa>
          {{ dayDetails.degrees }}° {{ dayDetails.sign }}</small
        >
      </div>

      <div class="middle flex col a-center">
        <img :src="imgs[dayDetails.Icon + 1]" alt="" />
        <p>{{ dayDetails.IconPhrase }}</p>
      </div>

      <div class="details">
        <div class="favs flex a-center j-center" @click="updateCity">
          <fa icon="heart" />
          <p>{{ dayDetails.txt }} favorites</p>
        </div>
      </div>
    </div>

    <main class="days pa left-trans grid">
      <day-preview
        v-for="(day, idx) in weatherDays"
        :key="idx"
        :day="day"
        :imgs="imgs"
        :isCelsius="isCelsius"
      >
        <template #img>
          <img :src="imgs[day.Day.Icon + 1]" alt="" />
        </template>
        <template #temperature>
          <span class="temperature"
            >{{ dayDetails.degrees }}° {{ dayDetails.sign }}</span
          >
        </template>
      </day-preview>
    </main>
  </section>
</template>

<script>
import moment from "moment";
import DayPreview from "./DayPreview.vue";

export default {
  components: { DayPreview },
  name: "DaysList",
  props: {
    currCity: Object,
    favorites: null,
    weatherDays: null,
    isCelsius: Boolean,
  },
  data: () => ({ imgs: [] }),
  created() {
    this.imgs = Object.values(
      this.importAll(
        require.context(
          "../assets/imgs/weatherIcons",
          true,
          /\.(png|jpe?g|svg)$/
        )
      )
    );
  },
  methods: {
    importAll(requires) {
      let imgs = {};
      requires.keys().forEach((item) => {
        imgs[item.replace("./", "")] = requires(item);
      });
      return imgs;
    },
    updateCity() {
      let txt = this.dayDetails.txt;
      this.$emit("update-city", txt.length <= 6, {
        ...this.currCity,
      });
      this.dayDetails.txt = txt.length > 6 ? "add to" : "remove from";
    },
  },
  computed: {
    dateForDisplay() {
      return moment(this.dayDetails.date).format("LL");
    },
    dayDetails() {
      if (this.weatherDays) {
        var today = this.weatherDays[0];
        if (today) {
          var {
            Day: { IconPhrase, Icon },
            Temperature,
          } = today;
          var degrees =
            new Date(Date.now()).getHours() > 8
              ? Temperature.Maximum.Value
              : Temperature.Minimum.Value;
          var date = today.Date;
          return {
            txt: this.favorites?.find((fav) => fav.Key === this.currCity.Key)
              ? "remove from"
              : "add to",
            degrees: this.isCelsius ? (degrees - 30) / 2 : degrees,
            sign: this.isCelsius ? "C" : "F",
            date,
            Icon,
            IconPhrase,
          };
        }
      }
    },
  },
  emits: ["update-city"],
};
</script>