<template>
    <div id="App">
    <div id="Main">
        <div id="Vertikal_1">
          <router-view name="Scatter" ></router-view>
        </div>
        <div id="Vertikal_2">
          <router-view name="Test" ></router-view>
        </div>
    </div>
    </div>


</template>

<script>
export default {
  name: 'App'
}
</script>

<style>
@import './assets/css/main.css'
</style>
