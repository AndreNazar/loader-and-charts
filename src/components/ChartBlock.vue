<template>
  <Pie :data="chartData" :options="chartOptions"  />
</template>

<script lang="ts">
import { defineComponent, PropType, ref, watch } from 'vue';
import { Pie } from 'vue-chartjs';
import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  ArcElement
} from 'chart.js'
import { ISector } from '../types';

// Регистрируем необходимые компоненты Chart.js
ChartJS.register(Title, Tooltip, Legend, ArcElement)


export default defineComponent({
  name: 'ChartBlock',
  components: { Pie },
  props: {
    sectorsData: {
      type: Object as PropType<ISector[]>,
      required: true
    } 
  },
  setup(props) {
    const sectorsData: ISector[] = props.sectorsData;

    // Данные для диаграммы
    let chartData = ref({
      labels: sectorsData.map(item => item.name),
      datasets: [
        {
          label: 'Значение',
          backgroundColor: sectorsData.map(item => item.color),
          data: sectorsData.map(item => item.value)
        }
      ]
    })

    watch(() => props.sectorsData, 
    (newSector) => {
      chartData.value = {
        labels: newSector.map(item => item.name),
        datasets: [
          {
            label: 'Значение',
            backgroundColor: newSector.map(item => item.color),
            data: newSector.map(item => item.value)
          }
        ]
      }
    })

    // Опции для диаграммы
    const chartOptions = ref({
      responsive: true,
      plugins: {
        legend: {
          position: 'bottom' as const,
        },
        
      },
    })

    return {
      chartData,
      chartOptions
    }
  }
});
</script>