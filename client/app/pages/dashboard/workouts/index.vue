<script lang="ts" setup>
import { Line, Bar, Doughnut } from 'vue-chartjs'

definePageMeta({
  layout: 'authorization',
  middleware: 'auth',
})

const { get } = useDashboardStore()
const { info, isLoading } = storeToRefs(useDashboardStore())

onMounted(async () => {
  await get()
})

const colorMode = useColorMode()

const chartOptions = computed(() => {
  const isDark = colorMode.value === 'dark'
  const gridColor = isDark ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)'
  const textColor = isDark ? 'rgba(255, 255, 255, 0.7)' : 'rgba(0, 0, 0, 0.7)'

  return {
    responsive: true,
    maintainAspectRatio: false, // To pozwoli wykresowi dostosować się do kontenera
    aspectRatio: 2, // Możesz dostosować tę wartość
    scales: {
      x: {
        grid: { color: gridColor },
        ticks: { color: textColor },
      },
      y: {
        grid: { color: gridColor },
        ticks: { color: textColor },
      },
      r: {
        angleLines: { color: gridColor },
        grid: { color: gridColor },
        pointLabels: { color: textColor },
        ticks: {
          color: textColor,
          backdropColor: isDark ? 'rgba(0, 0, 0, 0.3)' : 'rgba(255, 255, 255, 0.3)',
          callback: (value: number) => value.toString(),
        },
      },
    },
    plugins: {
      legend: {
        labels: {
          color: textColor,
        },
      },
    },
  }
})

const visitsData = computed(() => ({
  labels: ['Pon', 'Wt', 'Śr', 'Czw', 'Pt', 'Sob', 'Nd'],
  datasets: [{
    label: 'Odwiedziny',
    data: info.value.visits.weeklyData,
    borderColor: '#4BC0C0',
    fill: false
  }]
}))

const contentTypeData = computed(() => ({
  labels: ['Strony', 'Artykuły', 'Media'],
  datasets: [{
    data: [info.value.content.pages, info.value.content.articles, info.value.content.media],
    backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56']
  }]
}))
</script>

<template>
  <XDashboardPage :loading="isLoading">
    <template #header-panel>
      <h1 class="text-2xl font-bold mb-4">Workouts CMS</h1>
    </template>

    <template #main>
      <div>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div class="bg-white dark:bg-gray-800/20 p-6 rounded-xl">
            <h2 class="text-lg font-bold mb-4">Odwiedziny</h2>
            <x-chart-line
              :chart-data="visitsData"
              :options="chartOptions"
            />
          </div>

          <div class="bg-white dark:bg-gray-800/20 p-6 rounded-xl">
            <h2 class="text-lg font-bold mb-4">Zawartość</h2>
            <x-chart-doughnut
              :chart-data="contentTypeData"
              :options="chartOptions"
            />
          </div>
        </div>
      </div>
    </template>
  </XDashboardPage>
</template>
