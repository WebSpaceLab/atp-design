<script setup>
defineProps({
    user: {
        type: Object,
        required: true,
    },
})
</script>

<template>
    <x-dropdown align-x="right" width="64">
        <template #trigger>
            <XAvatar v-if="user?.avatarUrl" :src="user.avatarUrl" :alt="user.username" size="md" cursor-pointer />
        </template>

        <template #content>
            <div class="w-full p-2">
                <div  class="flex space-x-3 bg-gradient-to-r from-prime-light/80 to-second-light/80 dark:from-prime-dark/80 dark:to-second-dark/80 rounded-xl  w-full h-20 my-4 justify-start items-center rounded-l-full rounded-r-none pl-2">
                    <div class=" h-16 w-16 flex justify-center items-center">
                        <XAvatar v-if="user?.avatarUrl" :src="user.avatarUrl" :alt="user.username" size="lg" cursor-pointer to="/dashboard/profile" />
                    </div>

                    <div  class="flex flex-col justify-center items-start">
                        <div class="text-sm mb-3 font-medium text-basic-light dark:text-basic-dark">{{ user?.username }}</div>

                        <div class="text-xs text-muted-light dark:text-muted-dark font-bold">
                            <span>{{ user?.email }}</span>
                        </div>
                    </div>
                </div>

                <div class="border-t border-tertiary dark:border-tertiary-dark" />

                <div class="w-full box-border">
                    <!-- Account Management 
                    
                        <div class="flex justify-center items-center py-2 mb-2 text-xs bg-second-light dark:bg-second-dark text-muted-light dark:text-dark rounded">
                            Manage Account
                        </div>
                    -->

                    <div class="w-full flex flex-col space-y-2 p-2 justify-center items-center">
                        <x-dropdown-link to="/dashboard" name="Dashboard"/>
                        
                        <x-dropdown-link to="/dashboard/profile" name="Profile"/>

                        <x-dropdown-link to="/dashboard/users" name=" Users"/>

                        <x-btn-logout />
                    </div>
                </div>
            </div>
        </template>
    </x-dropdown>
</template>