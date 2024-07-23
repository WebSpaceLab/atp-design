import { useAuthStore } from "~/stores/auth";

export default defineNuxtPlugin((nuxtApp) => {
    return {
        provide: {
            auth: useAuthStore()
        }
    }
})  
