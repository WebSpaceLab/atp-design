<script setup>
const props = defineProps({
    item: {
        type: Object,
        required: true
    }   
});

const emit = defineEmits(['remove']);

const shadowStyle = computed(() => {
    return {
        'error' : 'shadow-error-800',
        'success' : 'shadow-success-800',
        'warning' : 'shadow-warning-800',
        'info' : 'shadow-info-800',
        'none' : ''
    } [props.item.style]
})

const textStyle = computed(() => {
    return {
        'error' : 'text-error-600',
        'success' : 'text-success-600',
        'warning' : 'text-warning-600',
        'info' : 'text-info-600',
        'none' : ''
    } [props.item.style]
})


const iconStyle = computed(() => {
    return {
        'error' : 'text-error-600 ',
        'success' : 'text-success-600 ',
        'warning' : 'text-warning-600 ',
        'info' : 'text-info-600 ',
        'none' : ''
    } [props.item.style]
})

const iconName = computed(() => {
    return {
        'error' : 'material-symbols:error-outline',
        'success' : 'material-symbols:library-add-check-outline-sharp',
        'warning' : 'material-symbols:error-outline',
        'info' : 'material-symbols:library-add-check-outline-sharp',
        'none' : ''
    } [props.item.style]
})

function close() {
    // if(props.item.closable) {
        emit('remove', props.item.id)
    // }
}
</script>

<template>
   <div
        :class="[shadowStyle]"
        class="relative rounded-lg py-2 flex w-full max-h-48 z-50 shadow-md bg-background dark:bg-background-dark"
    >
        <div class="w-full flex items-start justify-between">
            <div class="px-2 flex justify-center items-center space-x-2">
                <div class="flex justify-center p-2">
                    <span class="flex " :class="[iconStyle]">
                        <Icon :name="iconName"  class="text-3xl"/>
                    </span>
                </div>

                <div v-if="item.html" v-html="item.html"/>

                <p v-else class="pl-2 font-medium text-sm" :class="[textStyle]">
                    {{ item.message }}
                </p>
            </div>

            <div class="flex px-2">
                <x-btn
                    :color="item.style"
                    variant="ghost"
                    size="md"
                    icon="material-symbols:close"
                    @click="close()"
                    square
                />
            </div>
        </div>
    </div>
</template>