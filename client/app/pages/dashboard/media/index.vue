<script lang="ts" setup>
import type { IMedia } from '~~/types/media';
import type { IQueryMedia } from '~~/types/query';

definePageMeta({
  layout: 'authorization',
  middleware: 'auth',
})

let isShowModalDialog = ref(false)
let isShowPreviewImage = ref(false)
let isShowModalPhotoDetails = ref(false)
let isShowActions = ref(false)
let fileEdit = ref<IMedia | undefined>(undefined)
const preview = ref<IMedia | null>(null)

const { get, deleteMedia } = useMediaStore()
const { media, pagination, months, queryParams, isLoading } = storeToRefs(useMediaStore())

const query = reactive({
  term: queryParams.value.term ? queryParams.value.term : '',
  fileType: queryParams.value.fileType ? queryParams.value.fileType : null,
  month: queryParams.value.month ? queryParams.value.month : null,
  orderBy: queryParams.value.orderBy ? queryParams.value.orderBy : 'createdAt',
  orderDir: queryParams.value.orderDir ? queryParams.value.orderDir : 'desc',
  page: queryParams.value.page ? queryParams.value.page : 1,
  per_page: queryParams.value.per_page ? queryParams.value.per_page : 8,
}) as IQueryMedia

async function getMedia() {
  await get(query)
}

onBeforeMount(async () => {
  await getMedia()
})

async function switchPage(event: number) {
  query.page = event
  await getMedia()
}

async function switchPerPage(event: number) {
  query.page = 1
  query.per_page = event
  await getMedia()
}

function showFieldAction() {
    const isSelectedFile = media.value.filter((file: IMedia) => file.selected)
    isShowActions.value = isSelectedFile.length > 0
}

function getPreviewImage(file: IMedia) {
    preview.value = file
    isShowPreviewImage.value = true
    console.log('isShowPreviewImage: ', isShowPreviewImage.value)
}

function openEditFile(file: IMedia) {
    fileEdit.value = file
    isShowModalPhotoDetails.value = true
}

async function deletedFile(mediaId: number) {
    if (confirm('Czy na pewno chcesz usunąć ten plik?')) {
        await deleteMedia(mediaId)
        await getMedia()
    }
}

function addedToLibrary () {
    getMedia()
}
</script>

<template>
  <XDashboardPage :loading="false">
    <template #header-right >
      <div class="flex space-x-3">
        <x-btn
            @click="isShowModalDialog = true"
            color="secondary"
            :tooltip="{text: 'Add new assets'}"
            variant="ghost" square 
            icon="i-material-symbols-attach-file-add-rounded"
        />
      </div>
    </template>

    <template #main>
      <div class=" h-full p-6 lg:p-10 box-border dark:bg-gray-800/20 transition-all duration-500 rounded-xl">
        <div
          v-if="media"
          class="w-full h-full flex"
        >
          <div class="transition-all duration-500 w-full">
            <div class="w-full h-full transition-all duration-500">
              <div class="w-full h-200">
                  <div v-if="!isLoading">                      

                          <div v-if="media" class="w-full h-full">
                              <div v-if="media.length == 0" class="w-full h-full lg:h-150 flex justify-center items-center">
                                  <p class="text-2xl font-bold">
                                      Brak danych do wyświetlenia
                                  </p>   
                              </div>
  
                              <div class="w-full h-full p-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 xl:gap-6" v-else>
                                  <x-card-media
                                      v-for="(file, index) in media"
                                      :key="file.index = index"
                                      :file="file"
                                      @showFieldAction="showFieldAction"
                                      class="h-60 w-full"
                                  >
                                      <template #selected>
                                          <input v-model="file.selected"  @change="showFieldAction" type="checkbox" class="w-6 h-6 bg-background-light/50 dark:bg-background-dark/50 text-muted-light dark:text-muted-dark rounded border-solid border-muted-light dark:border-muted-dark lg:w-4 lg:h-4 focus:ring-blue-500">
                                      </template>
              
                                      <template #action>
                                          <!--
                                              <x-btn  @click="getPreviewImage(file)" color="secondary" icon  :tooltip="{text: 'Udostępnij'}" rounded>
                                                  <Icon name="mdi:share-variant"  class="text-2xl"/>
                                              </x-btn>
                                          -->
                                          <x-tooltip text="priview">
                                            <x-btn  @click="getPreviewImage(file)" color="secondary" icon="i-mdi-eye" variant="ghost" square/>
                                          </x-tooltip>
                                  
                                          <x-tooltip text="Edit">
                                            <x-btn
                                                @click="openEditFile(file)"
                                                color="secondary"
                                                icon="i-material-symbols-edit"
                                                variant="ghost"
                                                square
                                            />
                                          </x-tooltip>
                                          <x-tooltip text="Delete">
                                            <x-btn
                                                @click="deletedFile(file.id)"
                                                color="danger"
                                                icon="i-material-symbols-restore-from-trash-outline-sharp"
                                                variant="ghost"
                                                square
                                            />
                                          </x-tooltip>
                                      </template>
                                  </x-card-media>                   
                              </div>
                              <x-pagination :count="media?.length" :pagination="pagination"  @page="switchPage" @per_page="switchPerPage" />
                            </div>
         
                  </div>

                  <x-loading-page v-if="isLoading" :loading="isLoading"/>          
              </div>
            </div>
          </div>
        </div>
      </div>

      <x-modal-photo-dropzone
          :show="isShowModalDialog"
          @close="event => isShowModalDialog = event"
          @addedToLibrary="addedToLibrary"
          :multiple="true"
          title="Add new assets"
      />

      <x-modal-photo-details
          :show="isShowModalPhotoDetails"
          :file="fileEdit"
          @close="event => isShowModalPhotoDetails = false"
          @addedToLibrary="addedToLibrary"
          title="Photo details"
      />

      <div v-if="media">
          <x-photo-preview
              v-if="preview"
              :isShowPreviewImage="isShowPreviewImage"
              :photos="media"
              :preview="preview"
              @close="isShowPreviewImage = $event"
              @preview="preview = $event"
          />
      </div>
    </template>

    <template #sidebar />
  </XDashboardPage>
</template>
