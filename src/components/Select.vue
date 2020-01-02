<template>
  <div id="wordcloud">
    <div id="wordcloud_top">
      <font>WordCloud View</font>
    </div>
    <div id="wordcloud_down">
      <Select v-model="model10" multiple style="width:260px">
        <Option v-for="item in cityList" :value="item.value" :key="item.value">{{ item.label }}</Option>
      </Select>
    </div>
  </div>
</template>

<script>
import store from "../vuex/store.js";
export default {
  data: function() {
    return {
      sharedState: store.state,
      cityList: [
        {
          value: "New York",
          label: "New York"
        },
        {
          value: "London",
          label: "London"
        },
        {
          value: "Sydney",
          label: "Sydney"
        },
        {
          value: "Ottawa",
          label: "Ottawa"
        },
        {
          value: "Paris",
          label: "Paris"
        },
        {
          value: "Canberra",
          label: "Canberra"
        }
      ],
      model10: []
    };
  },
  mounted() {
    this.draw();
    // store.dispatch("wordcloudData_action");
  },
  watch: {
    // "sharedState.wordcloudData": function(newdata) {
    //   this.draw(newdata);
    // }
  },
  methods: {
    draw() {}
  }
};
</script>
<style scoped>
font {
  color: #eeeeee;
  font-family: "Microsoft Yahei";
  font-weight: bold;
  position: relative;
  top: 18%;
  left: 2%;
}
#wordcloud {
  width: 99%;
  height: 99%;
  margin: 0.5% 0.5%;
}
#wordcloud_top {
  width: 100%;
  height: 6%;
  background: linear-gradient(
    -45deg,
    #333333 25%,
    #3b3b3b 0,
    #3b3b3b 50%,
    #333333 0,
    #333333 75%,
    #3b3b3b 0
  );
  background-size: 30px 30px;
  text-align: left;
  border-radius: 5px;
}
#wordcloud_down {
  width: 100%;
  height: 94%;
  background-color: #f5f5f5;
  border-width: 1px;
  border-style: solid;
  border-color: #c7c7c7;
  border-radius: 5px;
}
</style>