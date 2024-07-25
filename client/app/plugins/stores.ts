import useApi from "~/composables/useApi";
import { useAppStore } from "~/stores/app";
// import type { AppStore } from "~/stores/app";
import { useAuthStore } from "~/stores/auth";

export default defineNuxtPlugin((nuxtApp) => {
    return {
        provide: {
            api: useApi(),
            app: useAppStore(),
            auth: useAuthStore(),
        }
    }
})  
