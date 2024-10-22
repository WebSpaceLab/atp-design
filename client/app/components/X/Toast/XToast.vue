<script setup>
    const {items, remove} = useToast()
    const removeItem = (event) => remove(event);
</script>

<template>
    <div class="fixed bottom-0 py-5 right-5 z-50 space-y-4 w-full max-w-xs z-120">
        <TransitionGroup
        
            enter-active-class="transition ease-out duration-300"
            enter-from-class="transform opacity-0 translate-x-full"
            enter-to-class="transform opacity-100 translate-x-0"
            leave-active-class="transition ease-in duration-300"
            leave-from-class="transform opacity-100 translate-x-0"
            leave-to-class="transform opacity-0 translate-x-full"
            
        >
            
            <template v-if="items"  v-for="item in items" :key="item.id">
               <x-toast-item
                    :item="item"
                    @remove="removeItem"
                />
            </template>
        </TransitionGroup>
    </div>
</template>