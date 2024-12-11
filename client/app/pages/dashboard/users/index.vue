<script lang="ts" setup>
definePageMeta({
  layout: 'authorization',
  middleware: 'auth',
})

const { get } = useUsersStore()
const { users, pagination, months, queryParams, isLoading } = storeToRefs(useUsersStore())

const query = reactive({
  column: queryParams.value.column ? queryParams.value.column : 'username',
  term: queryParams.value.term ? queryParams.value.term : '',
  month: queryParams.value.month ? queryParams.value.month : null,
  orderBy: queryParams.value.orderBy ? queryParams.value.orderBy : 'createdAt',
  orderDir: queryParams.value.orderDir ? queryParams.value.orderDir : 'desc',
  page: queryParams.value.page ? queryParams.value.page : 1,
  per_page: queryParams.value.per_page ? queryParams.value.per_page : 8,
})
async function getUsers() {
  await get({
    ...query,
    month: query.month || '' // Convert null to empty string to satisfy type
  })
}

onBeforeMount(async () => {
  await getUsers()
})

async function switchPage(event: number) {
  query.page = event
  await getUsers()
}

async function switchPerPage(event: number) {
  query.page = 1
  query.per_page = event
  await getUsers()
}
</script>

<template>
  <XDashboardPage :loading="isLoading">
    <template #header-left />

    <template #main>
      <div class=" h-full p-6 lg:p-10 box-border dark:bg-gray-800/20 transition-all duration-500 rounded-xl">
        <div
          v-if="users"
          class="w-full h-full flex"
        >
          <div class="transition-all duration-500 w-full">
            <div class="w-full h-full transition-all duration-500">
              <x-table
                :rows="users"
                :columns="['id', 'username', 'email', 'firstName', 'lastName', 'bio']"
                justify="center"
                :selected="true"
                :loading="isLoading"
                :count="users.length"
                is-column-actions
              >
                <template #search>
                  <x-table-search
                    v-model="query.term"
                    :query="query"
                    icon
                    size="md"
                    placeholder="Search"
                    :columns="['username', 'email', 'firstName', 'lastName', 'bio']"
                    :months="months"
                    @apply-filters="getUsers"
                  />
                </template>

                <template #roles="{ roles }">
                  <div
                    v-if="roles"
                    class="flex flex-col space-y-2 "
                  >
                    <span
                      v-for="(role, index) in roles"
                      :key="index"
                    >
                      <span>{{ role }}</span>
                    </span>
                  </div>
                </template>

                <template #isActiveAccount="{ isActiveAccount }">
                  <div :class="[isActiveAccount ? 'text-success-600' : 'text-danger-600']">
                    {{ isActiveAccount ? 'active' : 'not active' }}
                  </div>
                </template>

                <template #isAgree="{ isAgree }">
                  <div :class="[isAgree ? 'text-success-600' : 'text-danger-600']">
                    {{ isAgree ? 'accepted' : 'not accepted' }}
                  </div>
                </template>

                <template #isDelete="{ isDelete }">
                  <div :class="[isDelete ? 'text-success-600' : 'text-danger-600']">
                    {{ isDelete ? 'deleted' : 'not deleted' }}
                  </div>
                </template>

                <template #actions="{ id }">
                  <div class="flex space  -x-2">
                    {{ id }}
                  </div>
                </template>

                <template #pagination>
                  <x-pagination
                    :count="users.length"
                    :pagination="pagination"
                    @page="switchPage"
                    @per_page="switchPerPage"
                  />
                </template>
              </x-table>
            </div>
          </div>
        </div>
      </div>
    </template>

    <template #sidebar />
  </XDashboardPage>
</template>
