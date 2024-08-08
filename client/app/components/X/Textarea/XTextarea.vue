<script setup>
    const props = defineProps({
        label: {
            type: String,
            default: 'Label'
        },
        color: {
            type: String,
            default: 'blue'
        },
        placeholder: {
            type: Boolean,
            default: false
        },
        icon: {
            type: Boolean,
            default: false
        },
        rightIcon: {
            type: Boolean,
            default: false
        },
        iconPosition: {
            type: String,
            default: 'left'
        },
        required: {
            type: Boolean,
            default: false
        },
        autofocus: {
            type: Boolean,
            default: false
        },
        validatedType: {
            type: Object || Boolean,
            default: null
        },
        modelValue: {
            type: String,
            required: true
        },
        cols: {
            type: Number,
            default: 30
        },
        rows: {
            type: Number,
            default: 7
        },
        maxlength: {
            type: Number,
            default: 0
        },
        error: {
            type: String,
            default: ''
        },
        name: {
            type: String,
            default: 'floating_outlined_text'
        }
    })

    const emits = defineEmits([
        'update:modelValue'
    ])

    const inputColor = computed(() => {
        return {
            'blue': 'text-blue-500 focus:text-blue-600 border-solid border-blue-500 focus:border-blue-600 placeholder-blue-600',
            'red': 'text-red-500 focus:text-red-600 border-solid border-red-500 focus:border-red-600 placeholder-red-600',
            'green': 'text-green-500 focus:text-green-600 border-solid border-green-500 focus:border-green-600 placeholder-green-600',
            'info': 'text-info focus:text-info border-solid border-info focus:border-info placeholder-info',
            'error': 'text-error focus:text-error border-solid border-error focus:border-error placeholder-error',
            'success': 'text-success focus:text-success border-solid border-success focus:border-success placeholder-success',
        }[props.color]
    })

    const labelColor = computed(() => {
        return {
            'blue': 'peer-focus:text-blue-600 peer-focus:dark:text-blue-500',
            'red': 'peer-focus:text-red-600 peer-focus:dark:text-red-500',
            'green': 'peer-focus:text-green-600 peer-focus:dark:text-green-500',
            'info': 'text-info-600  peer-focus:text-info-600',
            'error': 'text-error-600 peer-focus:text-error-600',
            'success': 'text-success-600 peer-focus:text-success-600',
        }[props.color]
    })
</script>

<template>
    <div class="relative w-full">
        <div v-if="icon" :class="[iconPosition === 'left' ? 'left-0' : 'right-0']"
            class="absolute inset-y-0 flex items-center p-3 text-slate-500">
            <slot name="icon"></slot>
        </div>

        <div v-if="rightIcon" class="absolute inset-y-0 right-0 flex items-center p-3 text-slate-500">
            <slot name="right-icon"></slot>
        </div>

        <textarea :id="name" :value="modelValue"
            :class="[inputColor, icon & iconPosition === 'left' ? 'pl-10' : 'pl-3', validatedType ? validatedType : '']"
            :placeholder="placeholder ? label : ''"
            class="block rounded-lg box-border px-2.5 pb-2.5 pt-5 w-full text-md text-slate-900 bg-background dark:bg-background-dark border border-slate-500 appearance-none dark:text-basic-500 dark:border-slate-600 focus:outline-none focus:ring-0 peer"
            :name="name" :required="required" :autofocus="autofocus" :cols="cols" :rows="rows" :maxlength="maxlength"
            @input="event => emits('update:modelValue', event.target.value)" />

        <label :for="name"
            :class="[labelColor, icon & iconPosition === 'left' ? 'translate-x-8 peer-focus:translate-x-8' : '', validatedType ? validatedType : '']"
            class="absolute text-sm text-gray-800 dark:text-gray-500 duration-300 transform -translate-y-4 scale-75 top-4 z-10 origin-[0] left-2.5  peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-4 ">
            {{ label }}
        </label>

        <div v-if="modelValue && maxlength" class="text-[11px] text-gray-500">{{ modelValue?.length }}/{{ maxlength }}
        </div>

        <div v-if="error"
            class="w-full text-center text-error-300 text-[14px] font-semibold bg-error-900 p-1 box-border mt-1 rounded">
            {{ error }}
        </div>
    </div>
</template>