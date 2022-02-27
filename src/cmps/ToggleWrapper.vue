<template>
  <div class="toggle-wrapper flex a-center j-center pf col">
    <!-- <div class="toggle checkcross"> -->
    <!-- <input type="text" />
      <label
        @click="$emit('update-settings')"
        for=""
        class="toggle-item"
        :style="{
          backgroundColor:
            idx === 0 ? (true ? '#969696b5' : '#ffeaab') : '#969696b5',
        }"
      >
        <div
          :class="[true ? 'check' : 'uncheck']"
          :style="[
            idx
              ? {
                  color: true ? 'white' : 'black',
                  backgroundColor: true ? 'black' : 'white',
                }
              : {},
          ]"
        >
          <fa icon="fa-solid fa-brightness" />
        </div>
      </label> -->

    <v-switch
      v-for="(_, n) in 2"
      :key="n"
      v-model="Object.values(settings)[n]"
      inset
      color="white"
      :ripple="false"
      :append-icon="switchIcon(n)"
      @click="$emit('update-settings', n)"
    ></v-switch>

    <!-- </div> -->
  </div>
</template>

<script>
export default {
  name: "ToggleWrapper",
  props: {
    idx: Number,
    settings: {
      type: null,
      default: {
        isDarkMode: false,
        isCelsius: true,
      },
    },
  },
  computed: {
    currIcon() {
      return "fa-brightness";
    },
  },
  methods: {
    switchIcon(n) {
      return n
        ? Object.values(this.settings)[n]
          ? "C°"
          : "F°"
        : Object.values(this.settings)[n]
        ? "mdi-weather-night"
        : "mdi-white-balance-sunny";
    },
  },
  emits: ["update-settings"],
};
</script>