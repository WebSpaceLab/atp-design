<template>
    <div class="md:col-span-1 flex justify-between box-border">
        <div class="px-4 sm:px-0">
            <h3 class="text-lg font-semibold text-muted dark:text-muted-dark">
                <slot name="title" />
            </h3>

            <p class="mt-1 text-sm text-basic-600 dark:text-basic-400">
                <slot name="description" />
            </p>
        </div>

        <div class="px-4 sm:px-0">
            <slot name="aside" />
        </div>
    </div>
</template>