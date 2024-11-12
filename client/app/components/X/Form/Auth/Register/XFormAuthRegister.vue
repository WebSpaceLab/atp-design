<script setup lang="ts">
const { register } = useRegisterStore()
const form = useForm({
  username: '',
  email: '',
  password: '',
  password_confirmation: '',
  isAgree: false,
})

const canSeeThePassword = ref(false)
const canSeeTheConfirmPassword = ref(false)

const isOpenAgreementModel = ref<boolean>(false)
const lang = ref(['en'])

const optionsSelected = ref([
  { value: 'en', label: 'English', selected: false },
  { value: 'pl', label: 'Polish', selected: true },
])

function agreement(value: boolean) {
  form.body.isAgree = value
  isOpenAgreementModel.value = false
}
</script>

<template>
  <div>
    <form
      class="relative flex flex-col w-full h-full"
      @submit.prevent="register(form)"
    >
      <div class="pt-5 space-y-8">
        <x-input
          v-model="form.body.username"
          :color="form.errors && form.errors?.username ? 'error' : 'default'"
          label="Name"
          icon="material-symbols:person-3-rounded"
          name="register_name"
          :error="form.errors && form.errors?.username ? form.errors?.username : ''"
          autofocus
        />

        <x-input
          v-model="form.body.email"
          :color="form.errors && form.errors?.email ? 'error' : 'default'"
          label="Email"
          icon="material-symbols:mark-email-unread-sharp"
          type="email"
          name="register_email"
          :error="form.errors && form.errors?.email ? form.errors?.email : ''"
        />

        <x-input
          v-model="form.body.password"
          :type="canSeeThePassword ? 'text' : 'password'"
          :color="form.errors && form.errors?.password ? 'error' : 'default'"
          label="Password"
          icon="teenyicons:password-solid"
          name="register_password"
          right-icon
          :error="form.errors && form.errors?.password ? form.errors?.password : ''"
        >
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
          v-model="form.body.password_confirmation"
          :type="canSeeTheConfirmPassword ? 'text' : 'password'"
          :color="form.errors && form.errors?.password_confirmation ? 'error' : 'default'"
          label="Password confirmation"
          icon="teenyicons:password-solid"
          name="register_password_confirm"
          right-icon
          :error="form.errors && form.errors?.password_confirmation ? form.errors?.password_confirmation : ''"
        >
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

        <div class="flex flex-col">
          <div class="flex items-center">
            <x-checkbox
              v-model="form.body.isAgree"
              label="I accept the"
              color="primary"
            />

            <x-btn
              variant="link"
              color="primary"
              label="Terms and Conditions"
              size="sm"
              @click="isOpenAgreementModel = true"
            />
          </div>

          <div
            v-if="form.errors && form.errors?.isAgree"
            class="w-full text-center text-error-900 text-[14px] font-semibolds bg-error-300 p-2 box-border mt-1 rounded"
          >
            {{ form.errors?.isAgree }}
          </div>
        </div>

        <div class="w-full space-y-6">
          <x-btn
            :loading="form.loading"
            type="submit"
            label="Register"
            class="w-full"
            color="success"
            shadow
            block
          />
        </div>
      </div>
    </form>

    <XModal :show="isOpenAgreementModel">
      <div class="w-full relative  p-4">
        <div class="absolute top-2 right-4 flex items-center space-x-2">
          <x-select
            v-model="lang"
            label="Language"
            :options="optionsSelected"
          />
        </div>

        <h2 class="text-xl font-semibold pb-4 text-basic dark:text-basic-dark">
          Terms and Conditions
        </h2>

        <div class="w-full overflow-y-auto h-80  p-4 bg-gray-300 text-justify rounded">
          <ContentDoc :path="`/terms/${lang}`" />
        </div>

        <div class="w-full mt-4 flex justify-between">
          <x-btn
            variant="solid"
            color="danger"
            label="Reject"
            @click="agreement(false)"
          />

          <x-btn
            variant="solid"
            color="primary"
            label="Agree"
            @click="agreement(true)"
          />
        </div>
      </div>
    </XModal>
  </div>
</template>
