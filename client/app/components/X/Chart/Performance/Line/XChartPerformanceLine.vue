<script lang="ts" setup>
import { Line } from 'vue-chartjs';

interface PerformanceData {
  date: string
  loadTime: number
}

interface Props {
  data: PerformanceData[]
}

const props = defineProps<Props>()

const chartData = computed(() => ({
  labels: props.data.map(entry => entry.date),
  datasets: [
    {
      label: 'Czas ładowania strony (ms)',
      backgroundColor: '#42A5F5',
      borderColor: '#1E88E5',
      borderWidth: 2,
      tension: 0.4, // dodaje lekkie wygładzenie linii
      data: props.data.map(entry => entry.loadTime),
      fill: false,
    }
  ]
}))

const chartOptions = computed(() => ({
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: {
      display: true,
      position: 'top' as const,
    },
    tooltip: {
      mode: 'index' as const,
      intersect: false,
    },
  },
  scales: {
    y: {
      beginAtZero: true,
      title: {
        display: true,
        text: 'Czas (ms)'
      }
    },
    x: {
      title: {
        display: true,
        text: 'Data'
      }
    }
  }
}))
</script>

<template>
  <div class="h-[300px] w-full">
    <Line :data="chartData" :options="chartOptions" />
  </div>
</template>