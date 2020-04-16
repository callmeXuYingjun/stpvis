<template>
  <div id="App">
    <div id="Main">
      <div id="Vertikal_1">
        <div id="Vertikal_1-Horizontal_1">
          <router-view name="Tree"></router-view>
        </div>
        <div id="Vertikal_1-Horizontal_2">
          <router-view name="Scatter"></router-view>
        </div>
        <div id="Vertikal_1-Horizontal_3">
          <router-view name="Query"></router-view>
        </div>
      </div>
      <div id="Vertikal_2">
        <div id="Vertikal_2-Horizontal_1">
          <router-view name="Pattern"></router-view>
        </div>
        <div id="Vertikal_2-Horizontal_2">
          <router-view name="Anomaly"></router-view>
        </div>
        <div id="Vertikal_2-Horizontal_3">
          <router-view name="WordCloud"></router-view>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "App"
};
</script>

<style>
@import "./assets/css/main.css";
</style>
