<script lang="ts" setup>
  import { Cropper, CircleStencil } from 'vue-advanced-cropper'
  import 'vue-advanced-cropper/dist/style.css'

  const {avatarUrlUpdate} = useProfileStore() as any
  const {body} = storeToRefs(useProfileStore()) as any


  let file = ref(null) as any
  let cropper = ref(null) as any
  let uploadedImage = ref(null) as any
  let progressImage = ref(0)
  const onProgress: any = (event: number) => {
    progressImage.value = event
  }
  const getUploadedImage = (e: any) => {
    file.value = e.target.files[0]
    uploadedImage.value = URL.createObjectURL(file.value)
  }
  
  const cropAndUpdateImage = async () => {
    // $account.progressImage = 0
    const { coordinates } = cropper.value.getResult()
    let data = new FormData();
    
    data.append('image', file.value || '')
    data.append('height', coordinates.height || '')
    data.append('width', coordinates.width || '')
    data.append('left', coordinates.left || '')
    data.append('top', coordinates.top || '')
    
    await avatarUrlUpdate(data, onProgress)
  }
  
  watch(() => progressImage.value, (value) => {
    // console.log('Progress', value)
    if(value >= 100) {
      uploadedImage.value = false
      progressImage.value = 0
    }
  },{deep: true, immediate: true})
</script>

<template>
  <div class="relative w-full flex flex-col rounded-lg box-border">
    <x-card-action>
      <template #title>
        Profile picture
      </template>

      <template #description>
        Your profile picture helps people recognize you.
      </template>

      <template #content>
        <div v-if="!uploadedImage" class="h-full flex flex-col">

          <div  class="h-full flex items-center justify-center lg:-mt-6">
            <label for="image" class="relative cursor-pointer">
              <XAvatar v-if="body.avatarUrl !== ''" :src="body.avatarUrl" alt="userName" size="3xl" />

              <div
                class="absolute  w-6 h-6 flex justify-center items-center bottom-0 right-0  rounded-full bg-white  border  border-gray-300  shadow-xl shadow-black">
                <Icon name="ph:pencil-simple-line-bold" size="17" class="-mt-1 ml-0.5 text-gray-600" />
              </div>
            </label>

            <input class="hidden" type="file" id="image" @input="getUploadedImage"
              accept="image/png, image/jpeg, image/jpg">
          </div>
        </div>

        <div v-else class="w-full h-[300px] relative box-border space-y-4">
          <Cropper class="h-[250px] w-full " ref="cropper" :stencil-component="CircleStencil" :src="uploadedImage" />

          <div v-if="uploadedImage && progressImage != 0"
            class="w-full absolute -top-9 bg-gray-400/60 rounded-full h-5 shadow-inner overflow-hidden flex items-center justify-center">

            <div class="inline-block h-full bg-indigo-600 absolute top-0 left-0" :style="`width: ${progressImage}%`">
            </div>

            <div class="relative z-10 text-xs font-semibold text-center text-white drop-shadow text-shadow">{{
              progressImage }}%</div>
          </div>

          <div class="flex items-center justify-end space-x-3">

            <x-btn @click="uploadedImage = false" color="danger" rounded="xl">
              <span class="mx-4 font-medium text-[15px]">Close</span>
            </x-btn>

            <x-btn @click="cropAndUpdateImage()" color="primary" rounded="xl">
              <span class="mx-4 font-medium text-[15px]">Apply</span>
            </x-btn>
          </div>
        </div>
      </template>
    </x-card-action>
  </div>
</template>