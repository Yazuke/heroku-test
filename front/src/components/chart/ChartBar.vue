<template>
  <div style="height: 300px; width: 1000px;">
    <div class="filter_container">
      <md-radio v-model="filter" value="day">Day</md-radio>
      <md-radio v-model="filter" value="week">Week</md-radio>
    </div>
    <bar-chart
        v-if="barData"
        id="bar"
        :data="barData"
        xkey="day"
        ykeys='["time", "morning", "evening"]'
        resize="false"
        labels='["Time", "Morning", "Evening"]'
        bar-colorssss='[ "#FF6384", "#FF5684", "#F06384"]'
        grid="true"
        grid-text-weight="bold">
    </bar-chart>
  </div>
</template>

<script>
import { BarChart } from 'vue-morris'
import Raphael from 'raphael/raphael'
global.Raphael = Raphael;
const moment = require('moment');
const axios = require('axios');

export default {
  name: 'ChartBar',
  props: {},
  components: {
    BarChart
  },
  data() {
    return {
      filter: 'day',
      barData: null,
    }
  },

  mounted() {
    this.userId = this.$route.params.userId;
    this.switchFilter();
  },

  watch: {
    'filter': function () {
      this.switchFilter();
    }
  },

  methods: {
    switchFilter() {
      if (this.filter === 'day')
        this.getByDay();
      else if (this.filter === 'week')
        this.getByWeek();
    },

    getByDay() {
      let barChartData = [];
      let startTime = new Date();
      startTime.setDate(startTime.getDate()-7);
      axios
          .get(`http://localhost:4000/api/workingtimes/${this.userId}?start=${moment(startTime).toISOString()}`)
          .then(response => {
            response.data.data.map(elem => {
              let diff = moment(elem.end).diff(moment(elem.start), 'hours');
              let hourStart = parseInt(moment(elem.start).format('H'));
              let index = barChartData.findIndex(e => e.day === moment(elem.start).format('DD/MM'));
              if (index === -1) {
                barChartData.push({
                  day: moment(elem.start).format('DD/MM'),
                  morning: (hourStart < 12) ? diff : 0,
                  evening: (hourStart > 12) ? diff : 0,
                  time: diff,
                })
              }
              else {
                if (hourStart < 12)
                  barChartData[index].morning = diff;
                else
                  barChartData[index].evening = diff;
              }
            })
            barChartData.map(elem => {
              elem.time = elem.morning + elem.evening;
            })
            if (barChartData.length > 0)
              this.barData = barChartData;
          })
    },

    getByWeek() {
      let barChartData = [];
      axios
          .get(`http://localhost:4000/api/workingtimes/${this.userId}`)
          .then(response => {
            response.data.data.map(elem => {
              let diff = moment(elem.end).diff(moment(elem.start), 'hours');
              let hourStart = parseInt(moment(elem.start).format('H'));
              let weeknumber = moment(elem.start).week();
              let index = barChartData.findIndex(e => e.day === moment(elem.start).week());
              if (index === -1) {
                barChartData.push({
                  day: weeknumber,
                  morning: (hourStart < 12) ? diff : 0,
                  evening: (hourStart > 12) ? diff : 0,
                  time: 0,
                })
              }
              else {
                if (hourStart < 12)
                  barChartData[index].morning += diff;
                else
                  barChartData[index].evening += diff;
              }
            })
            barChartData.map(elem => {
              elem.time = elem.morning + elem.evening;
            })
            if (barChartData.length > 0)
              this.barData = barChartData;
          })
    },
  }
}
</script>
