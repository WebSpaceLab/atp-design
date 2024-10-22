<script setup>
const props = defineProps({
    actions: Array,
    isShowActions: Boolean
});


const emits = defineEmits([
    'execute'
]);

const actionId = ref(null);
</script>

<template>
    <div v-if="actions && isShowActions" class="flex justify-center items-center space-x-3">
      <template v-for="(action, index) in actions" :key="index">
        <x-btn @click="$emit('execute', action.action)" :color="action.action === 'delete' ? 'danger-outline' : 'primary-outline'" rounded shadow>
            {{ action.label }}
        </x-btn>
      </template>
    </div>
</template>