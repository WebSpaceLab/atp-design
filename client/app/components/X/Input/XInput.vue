<script setup lang="ts">
    const props = defineProps({
        type: {
            type: String,
            default: 'text'
        },
        label: {
            type: String,
            default: 'Label'
        },
        color: {
            type: String,
            default: 'default'
        },
        icon: {
            type: String,
            default: ''
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
        autocomplete: {
            type: Boolean,
            default: false
        },
        modelValue: {
            type: String,
            required: true
        },
        error: {
            type: String,
            default: ''
        },
        name: {
            type: String,
            default: 'floating_outlined'
        },
        size: {
            type: String,
            default: 'md' // Możliwe wartości: 'xs', 'sm', 'md', 'lg', 'xl'
        }
    });

    const emits = defineEmits(['update:modelValue']);

    function setInputColor(c: string) {
        return {
            'default': 'text-slate-500 focus:text-blue-700 dark:focus:text-blue-400 border-solid border-slate-500 focus:border-blue-600 placeholder-slate-600 focus:ring-blue-600',
            'error': 'text-error-600 focus:text-error-600 border-solid border-error-600 focus:border-error-600 placeholder-error-600 focus:ring-error-600',
            'success': 'text-success-600 focus:text-success-600 border-solid border-success-600 focus:border-success-600 placeholder-success-600 focus:ring-success-600',
        }[c];
    }

    function setLabelColor(c: string) {
        return {
            'default': 'text-slate-500 peer-focus:text-blue-600 peer-focus:dark:text-blue-500',
            'error': 'text-error-600 peer-focus:text-error-600',
            'success': 'text-success-600 peer-focus:text-success-600',
        }[c];
    }

    function setIconColor(c: string) {
        return {
            'default': 'text-slate-600 dark:text-slate-400',
            'error': 'text-error-600',
            'success': 'text-success-600',
        }[c];
    }

    const setSizeClass = computed(() => {
        return {
            'xs': 'px-1.5 py-1 text-xs',
            'sm': 'px-2 py-1.5 text-sm',
            'md': 'px-2.5 py-2 text-base',
            'lg': 'px-3 py-2.5 text-lg',
            'xl': 'px-3.5 py-3 text-xl',
        }[props.size];
    });
</script>

<template>
    <div>
        <div class="relative w-full">
            <div v-if="icon !== ''" :class="[iconPosition === 'left' ? 'left-0' : 'right-0', setIconColor(color)]"
                class="absolute z-10 inset-y-0 flex items-center p-3">
                <Icon :name="icon" class="text-xl" />
            </div>

            <div v-if="rightIcon"
                class="absolute z-10 inset-y-0 right-0 flex items-center p-3 text-slate-600 dark:text-slate-400">
                <slot name="right-icon" />
            </div>

            <label class="block relative w-full">
                <input :value="modelValue"
                    class="block rounded-lg w-full text-md decoration-none appearance-none border peer borde-2 bg-background dark:bg-background-dark focus:outline-none focus:ring-0 peer"
                    :class="[
                        setInputColor(color),
                        icon !== '' && iconPosition === 'left' ? 'pl-10' : 'pl-3',
                        setSizeClass
                    ]" :placeholder="label" :name="name" :type="type" :required="required"
                    :autocomplete="autocomplete ? 'on' : 'off'" :autofocus="autofocus"
                    @input="event => emits('update:modelValue', (event?.target as HTMLInputElement)?.value)">

                <span :class="[
                    setLabelColor(color),
                    icon !== '' && iconPosition === 'left' ? 'translate-x-5 peer-focus:translate-x-0' : '',
                    setSizeClass
                ]"
                    class="absolute text-sm duration-500 opacity-0 peer-focus:opacity-100 transform -translate-y-9 px-4 py-1 scale-90 top-2 z-10 origin-[0] left-2.5 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-90 peer-focus:-translate-y-9">
                    {{ label }}
                </span>
            </label>
        </div>

        <div v-if="error"
            class="w-full duration-500 text-center text-error-600 text-sm font-semibold bg-error-900 p-1 box-border mt-1 rounded">
            <p>{{ error }}</p>
        </div>
    </div>
</template>
