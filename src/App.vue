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
          <router-view name="Matrix"></router-view>
        </div>
      </div>
      <div id="Vertikal_2">
        <div id="Vertikal_2-Horizontal_1">
          <router-view name="Pattern"></router-view>
        </div>
        <div id="Vertikal_2-Horizontal_2"></div>
        <div id="Vertikal_2-Horizontal_3"></div>
      </div>
      <!-- <router-view name="Tree" ></router-view> -->
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
