<template>
  <div style="height: 300px; width: 1000px;">
    <div class="radio_choice_line_cart">
      <md-radio v-model="line_option" value="week">Week</md-radio>
      <md-radio v-model="line_option" value="month">Month</md-radio>
      <md-radio v-model="line_option" value="year">Year</md-radio>
    </div>
    <line-chart
        id="line"
        :data="lineData"
        xkey="label"
        ykeys='["value"]'
        resize="true"
        labels='[ "Percent time here" ]'
        line-colors='[ "#FF6384" ]'
        grid="false"
        grid-text-weight="bold"
        parseTime="false"
    >
    </line-chart>
  </div>
</template>

<script>
import {LineChart} from 'vue-morris'
import Raphael from 'raphael/raphael'
  const moment = require('moment');
const axios = require('axios');

global.Raphael = Raphael

export default {
  name: 'ChartLine',
  props: [
  ],
  watch: {
    'line_option': function () {
      this.workingTimeChart();
    }
  },
  components: {
    LineChart
  },
  data() {
    return {
      line_option: "week",
      lineData: []
    }
  },
  mounted() {
    this.workingTimeChart();
  },
  methods: {
    workingTimeChart() {
      let option;
      switch (this.line_option) {
        case "week":
          option = moment().subtract(7, 'days').utcOffset(0, true).format();
          break;
        case "month":
          option = moment().subtract(1, 'months').utcOffset(0, true).format();
          break;
        case "year":
          option = moment().subtract(1, 'years').utcOffset(0, true).format();
          break;

      }

      axios
          .get('http://localhost:4000/api/workingtimes/' + this.$route.params.userId + "?start=" + option)
          .then(response => {

            response = response.data.data;
            let dataArray = [];
            for (let wt in response) {
              for (let i = 0; i <= 23; ++i) {
                if (moment(response[wt].start).hour() < i && moment(response[wt].end).hour() > i) {
                  if (dataArray[i] === undefined) {
                    dataArray[i] = {
                      "value": 1,
                      "label": i.toString() + "h00"
                    };
                  } else {
                    dataArray[i].value += 1;
                  }
                }
              }
            }
            for (let i = 0; i <= 23; ++i) {
              if (dataArray[i]) {
                dataArray[i].value = dataArray[i].value / response.length
              } else {
                dataArray[i] = {
                  "value": 0,
                  "label": i.toString() + "h00"
                };
              }
            }
            this.lineData = dataArray;
          })
    }
  }
}
</script>
