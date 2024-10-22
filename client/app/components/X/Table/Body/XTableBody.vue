<script setup>

defineProps({
    row: Object,
    data: Object,
    isShowActions: Boolean
})

function showFieldAction() {
    const isSelected = data.value.filter(item => item.selected)

    if(isSelected?.length) {
        isShowActions.value = true

    } else {
        isShowActions.value = false
    }
}
</script>

<template>
    <tr class="box-border bg-background dark:bg-background-dark hover:bg-hover-200 hover:dark:bg-hover-900">
        <slot/>
    </tr>
</template>