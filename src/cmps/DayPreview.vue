<template>
  <section class="day-preview">
    <div class="img">
      <slot name="img" />
    </div>
    <div class="details tac flex col ma a-center j-center">
      <b>{{ week[new Date(day.Date).getDay()] }}day</b>
      <span class="date"
        ><b>{{ formmatDate }}</b></span
      >
      <span class="icon-phrase">{{ day.Day.IconPhrase }}</span>
      <slot name="temperature" />
    </div>
  </section>
</template>

<script>
import moment from "moment";

export default {
  name: "DayPreview",
  props: { day: Object, imgs: Array, isCelsius: Boolean },
  data: () => ({
    week: ["sun", "mon", "tues", "wednes", "thurs", "fri", "satur"],
  }),
  computed: {
    formmatDate() {
      return moment(this.day.Date).utc().format("MM/DD/YYYY");
    },
  },
};
</script>