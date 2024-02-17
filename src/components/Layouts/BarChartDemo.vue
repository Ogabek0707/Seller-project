<template>
      <div class="chart">
            <Bar 
            :data="chartData"
            :options="chartData.options"
            :css-classes="cssClasses"
            :style="styles"
            :width="900"
            :height="400"
            />
      </div>
</template>

<script setup>
import{ 
      Chart as ChartJs,
      Title,
      Tooltip,
      Legend,
      BarElement,
      CategoryScale,
      LinearScale
} from 'chart.js'
import { ref } from 'vue'
import { Bar } from 'vue-chartjs'
ChartJs.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend)

const chartData = ref({
      data: {
            labels: ['January', 'February', 'March', 'April', 'May', 'June','July','August','September','October', 'November','December'],
            datasets: [
                  {
                  label: 'Monthly incomes',
                  data: [65,59,80,81,56,55,40,55,22,33,21,88],
                  fill: false,
                  borderColor: 'rgb(75, 192, 192)',
                  tension: 0.1,
                  backgroundColor: [
                   'rgba(67, 94, 190, 0.7)',
                   'rgba(87, 202, 235, 0.5)'
                  ]
                  },
                  {
                  label: 'Monthly expense',
                  data: [65,59,80,81,56,55,45,43,22,68,88,55],
                  fill: false,
                  borderColor: 'rgb(75, 192, 192)',
                  tension: 0.1,
                  backgroundColor: [
                   'rgba(87, 202, 235, 0.5)',  
                   'rgba(67, 94, 190, 0.7)'
                  ]   
                  }
            ]
      },
      options: {
            responsive: true
      }
});
</script>

<style lang="scss" scoped>
.chart{
      overflow-x: scroll;
}
</style>