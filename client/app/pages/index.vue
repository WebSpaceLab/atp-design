<script lang="ts" setup>
  // definePageMeta({
  //   layout: "default",
  // })

  const { loggedIn, user, session, fetch, clear } = useUserSession()
  const { app } = storeToRefs(useAppStore())
</script>

<template>
  <div>
    <h1 class="text-2xl">Home Page</h1>

    <pre>
      {{app }}
<div>
User {{ user }}
<div>
session: {{ session }}  

</div>
loggedIn: {{ loggedIn }}
</div>
    </pre>

    <div class="w-full h-screen"/>
  </div>
  
</template>