import type { IForm } from '~~/types/form'
import type { IMedia, IMediaResponse, IMovieForm } from '~~/types/media'
import type { IPagination } from '~~/types/pagination'
import type { IQueryMedia } from '~~/types/query'



export const useMediaStore = defineStore('media', {
  state: () => ({
    media: [] as IMedia[],
    fileTypes: [] as string[],
    pagination: {
      total: null,
      current_page: null,
      per_page: null,
      first_page: 1,
    } as IPagination,
    months: [] as string[],
    queryParams: {
      fileType: '',
      term: '',
      month: '',
      orderBy: '',
      orderDir: '',
      page: 1,
      per_page: 8,
    } as IQueryMedia,
    isLoading: true,
  }),

  actions: {
    async get(query: IQueryMedia, path = `/api/media`) {
      this.isLoading = true
      await useApi().get(path, {
        params: {
          term: query.term,
          month: query.month,
          fileType: query.fileType,
          orderBy: query.orderBy,
          orderDir: query.orderDir,
          per_page: query.per_page,
          page: query.page,
        },
      }).then((res: IMediaResponse) => {
        this.media = res.media

        this.pagination.total = res.pagination.total
        this.pagination.current_page = res.pagination.current_page
        this.pagination.per_page = res.pagination.per_page

        this.fileTypes = res.fileTypes
        this.months = res.months
        this.queryParams = res.queryParams
      }).catch((err) => {
        console.error(err)
      }).finally(() => {
        this.isLoading = false
      })
    },

    async mediaUploader(formData: any, onProgress?: (progress: number) => void) {
      return await useUploader().upload(`/api/media`, formData, onProgress)
    },

    async mediaCropperUploader(formData: any, onProgress?: (progress: number) => void) {
      return await useUploader().upload(`/api/media/cropper`, formData, onProgress)
    },

    async update(mediaId = null as string | null, body: object) {
      if (!mediaId) return

      const { data, error, status } = await useFetchApi('/api/media/' + mediaId, {
        method: 'PUT',
        body: body,
      }) as any

      if (error.value) {
        useToast().flash(error.value.data.flash.message, 'error')

        console.error(error.value)
        return error.value
      }
      else {
        if (data.value && status.value === 'success') {
          useToast().flash(data.value.flash.message, 'success')

          return status.value
        }
      }
    },

    async updateMediaWithUploader(mediaId: string | null, body: FormData, onProgress?: (progress: number) => void) {
      try {
        const response = await useUploader().upload(
          `/api/media/${mediaId}`,
          body,
          onProgress
        )
        return response
      } catch (error) {
        console.error('Upload failed:', error)
        throw error
      }
    },

    async deleteMedia(mediaId: number) {
      const { data, error, status } = await useFetchApi('/api/media/' + mediaId, {
        method: 'DELETE',
      }) as any

      if (error.value) {
        useToast().flash(error.value.data.flash.message, 'error')

        console.error(error.value)
        return error.value
      }
      else {
        if (data.value && status.value === 'success') {
          useToast().flash(data.value.flash.message, 'success')

          return status.value
        }
      }
    },

    async uploadMovieFile(form: IForm<IMovieForm>) {
      return form.submit('/api/media/movie', 'POST', {
        success: () => {
          form.reset()
        },
      }, {})

    },
  },
})
