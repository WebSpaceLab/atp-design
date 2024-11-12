<script setup>
const { form } = storeToRefs(useResetPasswordStore())
const { resetPassword } = useResetPasswordStore()

const canSeeThePassword = ref(false)
const canSeeTheConfirmPassword = ref(false)
</script>

<template>
  <form
    class="relative w-100 h-full flex flex-col"
    @submit.prevent="resetPassword"
  >
    <span class="w-full h-full text-basic-light dark:text-basic-dark flex flex-col justify-center items-center">

      <div class="text-2xl md:text-3xl mb-4 font-bold">Utwórz nowe hasło</div>
    </span>

    <transition
      enter-active-class="transition ease-in duration-500"
      enter-from-class="transform opacity-0"
      enter-to-class="transform opacity-100"
      leave-active-class="transition ease-in duration-300"
      leave-from-class="transform opacity-0"
      leave-to-class="transform opacity-100"
    >
      <span
        v-if="$auth.errors && $auth.errors?.email"
        class="w-full p-4 box-border text-center text-bold bg-error-300 text-error-900 rounded-lg transition ease-in duration-500"
      >
        {{ $auth.errors.email }}
      </span>
    </transition>

    <transition
      enter-active-class="transition ease-in duration-500"
      enter-from-class="transform opacity-0"
      enter-to-class="transform opacity-100"
      leave-active-class="transition ease-in duration-300"
      leave-from-class="transform opacity-0"
      leave-to-class="transform opacity-100"
    >
      <span
        v-if="$auth.errors && $auth.errors?.token"
        class="w-full p-4 box-border text-center text-bold bg-error-300 text-error-900 rounded-lg transition ease-in duration-500"
      >
        {{ $auth.errors.token }}
      </span>
    </transition>

    <div class="pt-5 space-y-6">
      <x-input
        v-model="form.password"
        :type="canSeeThePassword ? 'text' : 'password'"
        color="blue"
        label="Hasło"
        icon
        name="register_password"
        right-icon
        :error="$auth.errors && $auth.errors?.password ? $auth.errors?.password : ''"
      >
        <template #icon>
          <Icon
            name="teenyicons:password-solid"
            class="text-xl"
          />
        </template>

        <template #right-icon>
          <div class="flex space-x-3">
            <Icon
              v-if="canSeeThePassword"
              name="mdi:eye-off-outline"
              class="text-xl text-blue-600 hover:text-green-600 cursor-pointer"
              @click="canSeeThePassword = false"
            />
            <Icon
              v-else
              name="mdi:eye-outline"
              class="text-xl hover:text-red-600 cursor-pointer"
              @click="canSeeThePassword = true"
            />
          </div>
        </template>
      </x-input>

      <x-input
        v-model="form.password_confirmation"
        :type="canSeeTheConfirmPassword ? 'text' : 'password'"
        color="blue"
        label="Powtórz hasło"
        icon
        name="register_password_confirm"
        right-icon
        :error="$auth.errors && $auth.errors?.password_confirmation ? $auth.errors?.password_confirmation : ''"
      >
        <template #icon>
          <Icon
            name="teenyicons:password-solid"
            class="text-xl"
          />
        </template>

        <template #right-icon>
          <div class="flex space-x-3">
            <Icon
              v-if="canSeeTheConfirmPassword"
              name="mdi:eye-off-outline"
              class="text-xl text-blue-600 hover:text-green-600 cursor-pointer"
              @click="canSeeTheConfirmPassword = false"
            />
            <Icon
              v-else
              name="mdi:eye-outline"
              class="text-xl hover:text-red-600 cursor-pointer"
              @click="canSeeTheConfirmPassword = true"
            />
          </div>
        </template>
      </x-input>

      <div class="w-full space-y-6">
        <x-btn

          :loading="$auth.isLoading"
          type="submit"
          text="Zatwierdź"
          class="w-full"
          color="success-outline"
          rounded
          shadow
        />
      </div>
    </div>
  </form>
</template>
