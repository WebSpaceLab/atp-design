export function useUploader() {

  return {
    upload(url: string, form: any, onProgress: any) {
      return new Promise((resolve, reject) => {
        const xhr = new XMLHttpRequest()
        xhr.open('POST', url, true)

        // authorization
        const token: string | any = useAuthStore().session.token
        if (token) {
          xhr.setRequestHeader('Authorization', `Bearer ${token}`)
        }

        xhr.upload.onprogress = function (event) {
          if (!event.lengthComputable) return
          onProgress((event.loaded / event.total) * 100)
        }
        xhr.onload = function () {
          if (xhr.status >= 200 && xhr.status < 300) {
            try {
              resolve(JSON.parse(xhr.responseText))
            } catch (error) {
              reject(new Error('Failed to parse response as JSON'))
            }
          } else {
            reject(new Error(`Upload failed with status: ${xhr.status}`))
          }
        }
        xhr.onerror = function () {
          reject(new Error('Upload failed due to a network error'))
        }
        xhr.send(form)
      })
    }
  }
}