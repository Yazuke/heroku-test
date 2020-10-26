<template>
  <div style="height: 300px; width: 1000px;">
    <donut-chart
        id="donut"
        :data="donutData"
        colors='[ "#FF6384", "#36A2EB", "#FFCE56" ]'
        resize="true"/>
    <datetime type="datetime" v-model="startDate"/>
  </div>
</template>
<script>
import {DonutChart} from 'vue-morris'
import Raphael from 'raphael/raphael'
import {Datetime} from "vue-datetime";

global.Raphael = Raphael
const axios = require('axios');
const moment = require('moment');

export default {
  name: 'ChartDonut',
  props: [],
  components: {
    DonutChart,
    datetime: Datetime,
  },
  data() {
    return {
      donutData: [],
      startDate: moment().subtract(1, 'month').utcOffset(0, true).format()
    }
  },
  watch:{
    'startDate': function () {
      this.getWorkingDays();
    }
  },
  methods: {
    getWorkingDays()
    {
      axios
          .get('http://localhost:4000/api/workingtimes/' + this.$route.params.userId + '?start=' + this.startDate)
          .then(response => {
            const data = response.data.data;
            let total = moment().diff(moment(this.startDate), 'days') + 1;
            let work = 0;
            for (let i = 0; i < total; ++i) {
              let currentDate = moment().subtract(i, 'days')
                for (let j = 0; j < data.length; ++j) {
                if (moment(currentDate).isSame(moment(data[j].start), "days")) {
                  ++work;
                  break;
                }
              }
            }
            if(total < 0){
              total = 0;
              work = 0;
            }

            this.donutData = [
              {label: 'Total Working Days', value: work},
              {label: 'Total Not Working Days', value: total - work},
            ];


          })
    }
  },
  mounted() {
    this.getWorkingDays();
  }
}
</script>
