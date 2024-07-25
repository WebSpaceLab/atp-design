<script lang="ts" setup>
  // definePageMeta({
  //   layout: "default",
  // })
  const api = useApi()
  const data =await api.get('/api/app')
// onMounted(async () => {
//  await useAppStore().start()
//   // console.log(data)
// {{ useAppStore().data }}
// <pre class="text-lg font-bold " >
// </pre>
// })
</script>

<template>
  <div>
    :: {{ data }}
  </div>
</template>