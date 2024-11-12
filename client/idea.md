# Auth
  ## Register
    - username, firstName, lastName, email, password, confirmPassword
    -[TODO] After registration, a confirmation email is sent.
  >[!WARNING]
>>**There was a problem sending emails to customers.**
    - The user is redirected to the trainer selection panel and waits for verification by the coach or admin.

  ## Login
    - Login with email and password
    - Login via Google Authorization
    - after authorization user is redirected to dashboard
  
# Users: 
  - Create roles: ['admin', 'user', 'coach', 'editor']
  - Create a user panel ('/dashboard/user') only available to the coach (Only visible users assigned to him) and the admin (Visible to all users)

# TODO
Personal form - a form in which the client answers questions about: 
  - their health, 
  - the time they have, 
  - training experience, 
  - what their training goal is
Strength test form - strength test in main exercises at 100%, 85%, 70% 
Performance test form - test in basic exercises / WOD
Endurance test form - test in basic exercises
Fail form - if a training fail occurs, a survey will be triggered
Pain form - a questionnaire to be completed in the event of muscle pain

# Propozycja systemu powiadomień dla ATP, zaprojektowana z myślą o równowadze między informowaniem a zachowaniem komfortu użytkownika:
1. Kategorie Powiadomień
Krytyczne (Czerwone)
🔴 Zbliżający się termin treningu (1h przed)
🔴 Zmiana w harmonogramie trenera
🔴 Problemy z płatnością
Ważne (Pomarańczowe)
🟠 Nowa wiadomość od trenera
🟠 Osiągnięcie celu treningowego
🟠 Aktualizacja planu treningowego
Informacyjne (Niebieskie)
🔵 Nowe osiągnięcia
🔵 Tygodniowe podsumowanie
🔵 Wskazówki treningowe
2. Kanały Dostarczania
<script setup>
  interface NotificationChannel {
    push: boolean;
    email: boolean;
    inApp: boolean;
    sms?: boolean;
  }
  
  interface NotificationPreferences {
    workoutReminders: NotificationChannel;
    trainerMessages: NotificationChannel;
    achievements: NotificationChannel;
    systemUpdates: NotificationChannel;
  }
</script>
3. Zasady Częstotliwości
  - Maksymalnie 3 powiadomienia push dziennie
  - Grupowanie podobnych powiadomień
  - Inteligentne odstępy czasowe między powiadomieniami
  - Respektowanie stref czasowych użytkownika
4. Personalizacja
<script setup>
  interface UserNotificationSettings {
    quietHours: {
      start: string; // "22:00"
      end: string;   // "07:00"
    };
    preferredChannels: NotificationChannel;
    frequency: 'high' | 'medium' | 'low';
    categories: {
      [key: string]: boolean;
    };
  }
</script>
5. Przykłady Komunikatów
Push Notifications
<script setup>
  interface PushNotification {
    title: string;
    body: string;
    priority: 'high' | 'default' | 'low';
    action?: {
      type: string;
      route: string;
    };
  }
  
  const notifications = {
    workoutReminder: {
      title: "Czas na trening! 💪",
      body: "Twój trening klatki piersiowej zaczyna się za 1 godzinę",
      priority: "high",
      action: {
        type: "open_workout",
        route: "/workout/today"
      }
    }
  };
</script>
6. Implementacja w UI
<template>
  <div class="notification-center">
    <div v-for="notification in notifications" 
         :key="notification.id" 
         :class="['notification', notification.priority]">
      <div class="notification-icon">
        {{ getIcon(notification.type) }}
      </div>
      <div class="notification-content">
        <h4>{{ notification.title }}</h4>
        <p>{{ notification.body }}</p>
      </div>
      <div class="notification-actions">
        <button @click="handleAction(notification)">
          {{ getActionText(notification) }}
        </button>
      </div>
    </div>
  </div>
</template>

## 7. Best Practices
1. Kontrola Użytkownika
  - Łatwe zarządzanie preferencjami
  - Możliwość wyciszenia kategorii
  - Opcja "Nie przeszkadzać"
2. Kontekst
  - Powiadomienia związane z aktualną aktywnością
  - Personalizacja based na historii użytkownika
  - Uwzględnienie strefy czasowej
3. Design
  - Czytelne ikony i kolory
  - Krótkie, jasne komunikaty
  - Możliwość szybkiej akcji
4. Optymalizacja
  - Batching powiadomień
  - Inteligentne priorytety
  - A/B testing skuteczności

##  Strategia optymalizacji wydajności dla ATP, skupiające się na krytycznych aspektach aplikacji webowej:
1. Optymalizacja ładowania danych
<script setup>
  // Implementacja wirtualnej listy dla długich zestawów danych
interface VirtualScrollConfig {
  itemHeight: number;
  windowSize: number;
  buffer: number;
}

const useVirtualScroll = (items: any[], config: VirtualScrollConfig) => {
  const visibleItems = computed(() => {
    // Oblicz tylko widoczne elementy bazując na scrollu
    return items.slice(startIndex.value, endIndex.value);
  });
  
  // Implementacja infinite scroll z paginacją
  const loadMore = async (page: number) => {
    const pageSize = 20;
    const offset = (page - 1) * pageSize;
    return await fetchItems({ offset, limit: pageSize });
  };
};
</script>
2. Strategia cachowania
<script setup>
  // Implementacja wielopoziomowego cachowania
interface CacheConfig {
  storage: 'memory' | 'localStorage' | 'indexedDB';
  ttl: number;
  maxSize?: number;
}

const cacheStrategies = {
  // Cache dla często używanych, rzadko zmieniających się danych
  staticData: {
    storage: 'localStorage',
    ttl: 24 * 60 * 60 * 1000, // 24h
  },
  
  // Cache dla dynamicznych danych
  userPreferences: {
    storage: 'memory',
    ttl: 5 * 60 * 1000, // 5min
  },
  
  // Cache dla dużych zestawów danych
  workoutHistory: {
    storage: 'indexedDB',
    ttl: 12 * 60 * 60 * 1000, // 12h
    maxSize: 50 * 1024 * 1024, // 50MB
  }
} as const;
</script>

3. Optymalizacja obrazów i zasobów
<script setup>
  // Konfiguracja lazy loadingu i progresywnego ładowania obrazów
interface ImageOptimizationConfig {
  lazyLoading: boolean;
  placeholder: 'blur' | 'color' | 'none';
  formats: ('webp' | 'avif' | 'jpg')[];
  sizes: number[];
}

const imageConfig: ImageOptimizationConfig = {
  lazyLoading: true,
  placeholder: 'blur',
  formats: ['webp', 'avif', 'jpg'],
  sizes: [640, 750, 828, 1080, 1200]
};

// Przykład komponentu zoptymalizowanego obrazu
const OptimizedImage = defineComponent({
  props: {
    src: String,
    alt: String,
  },
  setup(props) {
    const generateSrcSet = () => {
      return imageConfig.sizes
        .map(size => `${props.src}?w=${size} ${size}w`)
        .join(', ');
    };
  }
});
</script>

4. Optymalizacja stanu aplikacji
<script setup>
  // Implementacja selektywnego odświeżania komponentów
interface StateManagementConfig {
  debounceTime: number;
  batchUpdates: boolean;
  optimisticUpdates: boolean;
}

const stateConfig: StateManagementConfig = {
  debounceTime: 300,
  batchUpdates: true,
  optimisticUpdates: true
};

// Store z zoptymalizowanym zarządzaniem stanem
const useOptimizedStore = defineStore('optimized', {
  state: () => ({
    lastUpdate: null,
    pendingUpdates: new Map(),
  }),
  
  actions: {
    // Implementacja batch updates
    batchUpdate(updates: Map<string, any>) {
      if (stateConfig.batchUpdates) {
        this.pendingUpdates = new Map([...this.pendingUpdates, ...updates]);
        this.debouncedCommit();
      }
    },
    
    // Implementacja optimistic updates
    async optimisticUpdate(key: string, value: any) {
      if (stateConfig.optimisticUpdates) {
        this[key] = value; // Natychmiastowa aktualizacja UI
        try {
          await api.update(key, value);
        } catch (error) {
          this[key] = this.pendingUpdates.get(key); // Rollback w przypadku błędu
        }
      }
    }
  }
});
</script>
5. Monitorowanie wydajności
<script setup>
  // System monitorowania wydajności
interface PerformanceMetrics {
  timeToFirstByte: number;
  firstContentfulPaint: number;
  timeToInteractive: number;
  memoryUsage: number;
}

const performanceMonitor = {
  // Zbieranie metryk wydajności
  collectMetrics(): PerformanceMetrics {
    const metrics = {
      timeToFirstByte: performance.timing.responseStart - performance.timing.navigationStart,
      firstContentfulPaint: performance.getEntriesByType('paint')[0].startTime,
      timeToInteractive: performance.timing.domInteractive - performance.timing.navigationStart,
      memoryUsage: performance.memory?.usedJSHeapSize || 0
    };
    
    return metrics;
  },
  
  // Automatyczne raportowanie problemów z wydajnością
  reportPerformanceIssues(metrics: PerformanceMetrics) {
    if (metrics.timeToInteractive > 3000) {
      console.warn('Time to Interactive przekracza 3 sekundy');
    }
  }
};
</script>

Kluczowe rekomendacje:
1. Wdrożenie lazy loading dla wszystkich niekriytycznych komponentów i zasobów
Wykorzystanie Service Workers do cachowania statycznych zasobów
2. Implementacja progresywnego ładowania danych dla dużych zestawów
3. Optymalizacja bundle size poprzez code splitting i tree shaking
4. Regularne monitorowanie metryk wydajności i automatyczne alerty
5. Czy chciałbyś, żebym rozwinął któryś z tych aspektów lub skupił się na konkretnym obszarze optymalizacji?

## Analiza bezpieczeństwa dla ATP z konkretnymi rekomendacjami:
1. Autoryzacja i Uwierzytelnianie
Znalezione problemy:

<script setup lang="ts">
const { login } = useAuthStore()
const form = useForm({
  email: '',
  password: '',
})

const canSeeThePassword = ref(true)
</script>

<template>
  <form
    class="relative w-full h-full flex flex-col"
    @submit.prevent="login(form)"
  >
    <span
      v-if="form.error"
      class="bg-error-200 text-error-600 flex justify-center items-center w-full h-10 rounded-lg"
    >
      {{ form.error }}
    </span>

    <div class="pt-5 space-y-8">
      <x-input
        v-model="form.body.email"
        label="Email"
        type="email"
        icon="material-symbols:mark-email-unread-sharp"
        name="email_login"
        autofocus
      />

      <div>
        <x-input
          v-model="form.body.password"
          :type="canSeeThePassword ? 'text' : 'password'"
          label="Hasło"
          icon="teenyicons:password-solid"
          right-icon
          name="password_login"
        >
          <template #right-icon>
            <Icon
              v-if="canSeeThePassword"
              name="mdi:eye-off-outline"
              class="text-xl text-blue-600 hover:text-green-600 cursor-pointer"
              @click="canSeeThePassword = !canSeeThePassword"
            />

            <Icon
              v-if="!canSeeThePassword"
              name="mdi:eye-outline"
              class="text-xl hover:text-red-600 cursor-pointer"
              @click="canSeeThePassword = !canSeeThePassword"
            />
          </template>
        </x-input>

        <XModalAuthForgotPassword />
      </div>

      <div class="w-full space-y-6">
        <x-btn
          :disabled="(!form.body.email || !form.body.password)"
          type="submit"
          color="success"
          :loading="form.loading"
          shadow
          block
        >
          Sign in
        </x-btn>
      </div>
    </div>
  </form>
</template>


- Brak limitu prób logowania
- Brak dwuskładnikowego uwierzytelniania (2FA)
- Widoczne przełączanie typu pola hasła

**Rekomendowane rozwiązania:**
<script>
  interface AuthConfig {
  maxLoginAttempts: number;
  lockoutDuration: number;
  passwordPolicy: {
    minLength: number;
    requireSpecialChars: boolean;
    requireNumbers: boolean;
    requireUppercase: boolean;
  };
  twoFactorAuth: {
    enabled: boolean;
    methods: ('email' | 'authenticator' | 'sms')[];
  };
}

const securityConfig: AuthConfig = {
  maxLoginAttempts: 5,
  lockoutDuration: 15 * 60 * 1000, // 15 minut
  passwordPolicy: {
    minLength: 12,
    requireSpecialChars: true,
    requireNumbers: true,
    requireUppercase: true
  },
  twoFactorAuth: {
    enabled: true,
    methods: ['authenticator', 'email']
  }
};
</script>


## 2. Zarządzanie Sesjami
**Znalezione problemy:**
<script lang="ts" setup>
import { Line, Bar, Doughnut } from 'vue-chartjs'

definePageMeta({
  layout: 'authorization',
  middleware: 'auth',
})

const { get } = useDashboardStore()
const { info, isLoading } = storeToRefs(useDashboardStore())

onMounted(async () => {
  await get()
})
</script>


- Brak automatycznego wylogowania
- Brak invalidacji sesji po zmianie hasła

**Rekomendowane rozwiązania:**
<script>
  interface SessionConfig {
  sessionTimeout: number;
  maxConcurrentSessions: number;
  refreshTokenRotation: boolean;
}

const sessionManager = {
  validateSession: async (token: string) => {
    const session = await getSession(token);
    if (Date.now() - session.lastActivity > sessionConfig.sessionTimeout) {
      await invalidateSession(token);
      return false;
    }
    return true;
  },
  
  rotateRefreshToken: async (userId: string) => {
    const newToken = generateSecureToken();
    await invalidateOldRefreshTokens(userId);
    return newToken;
  }
};
</script>

## 3. Bezpieczeństwo Danych
**Znalezione problemy:**
<template>
  <p class="uppercase m-0  text-white drk:text-black text-bold">Asset ID</p>  
  <p class="text-basic-800 dark:text-basic-300">
    {{ fileDetails.id }}
  </p>
          </span>
        </div>

        <div class="flex flex-col space-y-6">
          <div>
            <x-input v-model="fileDetails.name" label="Name" :error="errors && errors.name ? errors.name[0] : ''" />
          </div>

          <div>
            <x-textarea v-model="fileDetails.description" label="Description" :rows="5" :cols="20" :error="errors && errors.description ? errors.description[0] : ''" />
          </div>
        </div>
      </div>
    </div> 
<!--
TODO: Jeśli utworzony zostanie 'cropper' w Symfony to należało by włączyć ten komponent
    <x-modal-photo-cropper
        :show="isShowModalPhotoCropper"
        :file="uploadedImageUrl"
        :media="media"
        @close="event => isShowModalPhotoCropper = event"
        @uploadCropImage="uploadCropImage"
        title="Photo cropper"
    />
-->
        
        <template #footer>
</template>

- Brak szyfrowania wrażliwych danych
- Potencjalny wyciek informacji w logach
- Brak sanityzacji danych wejściowych
**Rekomendowane rozwiązania:**
<script>
  interface DataSecurityConfig {
  encryption: {
    algorithm: 'AES-256-GCM' | 'ChaCha20-Poly1305';
    keyRotationPeriod: number;
  };
  sanitization: {
    allowedTags: string[];
    allowedAttributes: Record<string, string[]>;
  };
}

const securityUtils = {
  sanitizeInput: (input: string): string => {
    // Implementacja sanityzacji HTML i XSS protection
    return DOMPurify.sanitize(input, {
      ALLOWED_TAGS: ['b', 'i', 'em', 'strong'],
      ALLOWED_ATTR: []
    });
  },
  
  encryptSensitiveData: async (data: any): Promise<string> => {
    const key = await getEncryptionKey();
    return encrypt(data, key);
  }
};
</script>

## 4. Bezpieczeństwo API
**Rekomendowane rozwiązania:**
<script>
  interface APISecurityConfig {
  rateLimit: {
    windowMs: number;
    maxRequests: number;
  };
  cors: {
    allowedOrigins: string[];
    allowedMethods: string[];
  };
}

const apiSecurity = {
  rateLimit: {
    windowMs: 15 * 60 * 1000, // 15 minut
    maxRequests: 100
  },
  
  validateRequest: async (req: Request) => {
    // Walidacja nagłówków i tokenów
    const token = req.headers.authorization;
    if (!token) throw new Error('Brak autoryzacji');
    
    // Sprawdzenie rate limit
    await checkRateLimit(req.ip);
    
    // Walidacja CORS
    validateCORS(req.origin);
  }
};
</script>

## 5. Monitoring i Audyt
**Rekomendowane rozwiązania:**
<script>
  interface SecurityAuditConfig {
  logRetentionDays: number;
  alertThresholds: {
    failedLogins: number;
    suspiciousActivities: number;
  };
}

const securityMonitor = {
  logSecurityEvent: async (event: SecurityEvent) => {
    await saveToSecureLog({
      timestamp: new Date(),
      type: event.type,
      userId: event.userId,
      ip: event.ip,
      details: event.details
    });
    
    // Sprawdzenie progów alertów
    await checkAlertThresholds(event);
  },
  
  generateSecurityReport: async () => {
    const report = await aggregateSecurityMetrics();
    return {
      failedLoginAttempts: report.failedLogins,
      suspiciousActivities: report.suspicious,
      vulnerabilities: report.vulnerabilities
    };
  }
};
</script>

### Kluczowe Rekomendacje:
1. Wdrożenie kompleksowej polityki haseł i 2FA
2. Implementacja mechanizmów rate-limiting dla API
3. Szyfrowanie wrażliwych danych w spoczynku i podczas transmisji
4. Regularne audyty bezpieczeństwa i monitoring
5. Implementacja mechanizmów wykrywania anomalii