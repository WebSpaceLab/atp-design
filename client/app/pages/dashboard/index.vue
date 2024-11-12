<script lang="ts" setup>
import { Bar, Doughnut } from 'vue-chartjs';

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
    maintainAspectRatio: false,
    aspectRatio: 2,
    scales: {
      x: {
        grid: { color: gridColor },
        ticks: { color: textColor },
      },
      y: {
        grid: { color: gridColor },
        ticks: { color: textColor },
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

const performanceData = ref([
  { date: '01-04', loadTime: 1200, ttfb: 200 },
  { date: '02-04', loadTime: 1150, ttfb: 180 },
  { date: '03-04', loadTime: 1300, ttfb: 220 },
  { date: '04-04', loadTime: 1100, ttfb: 170 },
  { date: '05-04', loadTime: 1250, ttfb: 190 },
  // ... więcej danych
])

const visitsData = ref([
  { date: 'Pon', count: 150 },
  { date: 'Wt', count: 230 },
  { date: 'Śr', count: 180 },
  { date: 'Czw', count: 290 },
  { date: 'Pt', count: 340 },
  { date: 'Sob', count: 160 },
  { date: 'Nd', count: 120 }
])

const contentTypeData = computed(() => ({
  labels: ['Strony', 'Artykuły', 'Media'],
  datasets: [{
    data: [info.value.content.pages, info.value.content.articles, info.value.content.media],
    backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56']
  }]
}))
const userGrowthData = computed(() => {
  const userGrowth = info.value?.users?.userGrowth as { labels: string[], data: number[] } | null

  return {
    labels: userGrowth?.labels ?? [],
    datasets: [{
      data: userGrowth?.data ?? [],
      backgroundColor: '#36A2EB',
      label: 'Wzrost użytkowników'
    }]
  }
})
</script>

<template>
  <XDashboardPage :loading="isLoading">
    <template #header-panel>
      <h1 class="text-2xl font-bold mb-4">Dashboard CMS</h1>
    </template>

    <template #main>
      <div class="p-6 space-y-6">
        <!-- Szybkie akcje -->
        <div class="flex space-x-4 mb-6">
          <button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
            Dodaj nową stronę
          </button>
          <button class="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded">
            Dodaj nowy artykuł
          </button>
          <button class="bg-yellow-500 hover:bg-yellow-700 text-white font-bold py-2 px-4 rounded">
            Zarządzaj mediami
          </button>
        </div>

        <!-- Statystyki -->
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <XCardStat
            title="Opublikowane strony"
            :value="info.content.pages.toString()"
          />
          <XCardStat
            title="Opublikowane artykuły"
            :value="info.content.articles.toString()"
          />
          <XCardStat
            title="Liczba użytkowników"
            :value="info.users.total.toString()"
          />
          <XCardStat
            title="Komentarze do moderacji"
            :value="info.comments.pending.toString()"
          />
        </div>

        <!-- Wykresy -->
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div class="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
            <h3 class="text-lg font-semibold mb-4">Wzrost liczby użytkowników</h3>
            <div class="h-64"> <!-- Dodajemy stałą wysokość -->
              <Bar
                :data="userGrowthData"
                :options="chartOptions"
              />
            </div>
          </div>
          <div class="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
            <h3 class="text-lg font-semibold mb-4">Odwiedziny w ostatnim tygodniu</h3>
            <div class="h-64"> <!-- Dodajemy stałą wysokość -->
              <XChartVisitsBar
                :visits="visitsData"
                :height="300"
              />
            </div>
          </div>

          <div class="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
            <h3 class="text-lg font-semibold mb-4">Rozkład treści</h3>
            <div class="h-64"> <!-- Dodajemy stałą wysokość -->
              <Doughnut
                :data="contentTypeData"
                :options="chartOptions"
              />
            </div>
          </div>

          <div class="p-4">
                <XChartPerformanceLine
                  :data="performanceData"
                />
            </div>
        </div>

        <!-- Ostatnie aktywności -->
        <div class="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
          <h3 class="text-lg font-semibold mb-4">Ostatnie aktywności</h3>
          <ul class="space-y-2">
            <li v-for="activity in info.recentActivities" :key="activity.id" class="flex justify-between items-center">
              <span>{{ activity.description }}</span>
              <span class="text-sm text-gray-500">{{ activity.time }}</span>
            </li>
          </ul>
        </div>

        <!-- Powiadomienia systemowe -->
        <div class="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
          <h3 class="text-lg font-semibold mb-4">Powiadomienia systemowe</h3>
          <ul class="space-y-2">
            <li v-for="notification in info.systemNotifications" :key="notification.id" class="flex items-center">
              <span :class="{
                'text-yellow-500': notification.type === 'warning',
                'text-red-500': notification.type === 'error',
                'text-blue-500': notification.type === 'info'
              }" class="mr-2">
                <i :class="{
                  'fas fa-exclamation-triangle': notification.type === 'warning',
                  'fas fa-times-circle': notification.type === 'error',
                  'fas fa-info-circle': notification.type === 'info'
                }"></i>
              </span>
              <span>{{ notification.message }}</span>
            </li>
          </ul>
        </div>
      </div>
    </template>
  </XDashboardPage>
</template>
