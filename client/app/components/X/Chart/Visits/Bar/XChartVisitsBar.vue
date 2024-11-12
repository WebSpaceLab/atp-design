<script setup lang="ts">
import { Bar } from 'vue-chartjs';

interface VisitsData {
  date: string;
  count: number;
}

interface Props {
  visits: VisitsData[];
  height?: number;
  width?: number;
}

const props = withDefaults(defineProps<Props>(), {
  height: 300,
  width: 600
})

const chartData = computed(() => ({
  labels: props.visits.map(visit => visit.date),
  datasets: [
    {
      label: 'Liczba odwiedzin',
      data: props.visits.map(visit => visit.count),
      backgroundColor: 'rgba(75, 192, 192, 0.6)',
      borderColor: 'rgba(75, 192, 192, 1)',
      borderWidth: 1,
      borderRadius: 5,
      hoverBackgroundColor: 'rgba(75, 192, 192, 0.8)'
    }
  ]
}))

const chartOptions = computed(() => {
  const isDark = useColorMode().value === 'dark'
  const textColor = isDark ? '#FFFFFF' : '#2D3748'
  const gridColor = isDark ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)'

  return {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        labels: {
          color: textColor
        }
      },
      title: {
        display: true,
        text: 'Statystyki odwiedzin - ostatnie 7 dni',
        color: textColor,
        font: {
          size: 16,
          weight: 'bold'
        }
      },
      tooltip: {
        backgroundColor: isDark ? 'rgba(0, 0, 0, 0.8)' : 'rgba(255, 255, 255, 0.8)',
        titleColor: !isDark ? '#000000' : '#FFFFFF',
        bodyColor: !isDark ? '#000000' : '#FFFFFF',
        displayColors: false,
        callbacks: {
          label: (context: any) => `Liczba odwiedzin: ${context.raw}`
        }
      }
    },
    scales: {
      y: {
        beginAtZero: true,
        grid: {
          color: gridColor
        },
        ticks: {
          color: textColor
        }
      }
    }
  }
})
</script>

<template>
  <div class="visits-chart">
    <Bar
      :data="chartData"
      :options="chartOptions"
      :height="height"
      :width="width"
    />
  </div>
</template>

<style scoped>
.visits-chart {
  background-color: var(--color-background);
  padding: 1rem;
  border-radius: 0.5rem;
  box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06);
}
</style>
