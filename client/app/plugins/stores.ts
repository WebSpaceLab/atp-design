import { useAppStore } from "~/stores/app";
// import { useAuthStore } from "~/stores/auth";

export default defineNuxtPlugin((nuxtApp) => {
    return {
        provide: {
            app: useAppStore(),
            // auth: useAuthStore(),
        }
    }
})  
