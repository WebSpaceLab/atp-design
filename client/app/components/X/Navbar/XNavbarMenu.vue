<script lang="ts" setup>
defineProps({
  links: {
    type: Array,
    required: true,
  }
});

const emit = defineEmits(['closeMobile'])

const closeMobile = (event: boolean) => {
  emit('closeMobile', event )
}
</script>

<template>
  <div class="flex flex-col lg:flex-row justify-center items-center space-y-3 lg:space-y-0 lg:space-x-3">
    <template v-for="(link, index) in links" :key="index">
      <XNavbarMenuItem v-if="link"
        :link="link"
        @close-mobile="closeMobile"
      />
    </template>
  </div>
</template>
