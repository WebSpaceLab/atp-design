<script setup>
// Props
const props = defineProps({
  rows: {
    type: Array,
    required: true,
    default: () => []
  },
  body: {
    type: Boolean,
    default: true
  },
  food: {
    type: Boolean,
    default: false
  },
  loading: {
    type: Boolean,
    default: false
  },
  responsiveSmallTable: {
    type: Boolean,
    default: false
  },
  selected: {
    type: Boolean,
    default: true
  },
  justify: {
    type: String,
    default: 'center'
  },
  count: {
    type: Number,
    default: 0
  },
  isColumnActions: {
    type: Boolean,
    default: false
  },
  columns: {
    type: Array,
    required: false,
    default: () => []
  }
});
// Emitting events
const emits = defineEmits(['select-all', 'query']);

let isShowActions = ref(false)

// Generate 'head' dynamically from 'rows'
const generatedHead = computed(() => {
  return props.columns.length ? props.columns : props.rows.length ? Object.keys(props.rows[0]) : [];
});

// Toggle select all checkboxes
function toggleSelectAll(e) {
  props.rows.forEach(item => item.selected = e.target.checked)
  
  showFieldAction()
  emits('select-all', e);
};

function showFieldAction() {
  const isSelected = props.rows.filter(item => item.selected)
  
  if(isSelected?.length) {
    isShowActions.value = true

  } else {
    isShowActions.value = false
  }
};

// Ref for selected columns
const selectedColumns = ref(generatedHead.value);

const generatedSelectHead = computed(() => {
  return generatedHead.value.map(header => ({ value: header, label: header, selected: true }));
});
</script>

<template>
  <div class="w-full">
    <!-- Table structure -->
    <div v-if="!loading" class="w-full" :class="[responsiveSmallTable ? '' : 'block']">
      <!-- Column selection dropdown -->
      <div class="w-full relative grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 grid-flow-col gap-4  mb-4">
        <div >
          <!-- Actions -->
          <Transition  
            enter-active-class="transition ease-in duration-300"
            enter-from-class="transform opacity-0 "
            enter-to-class="transform  opacity-100"
            leave-active-class="transition ease-in duration-500"
            leave-from-class="transform opacity-100"
            leave-to-class="transform opacity-0"
          >
            <div v-if="isShowActions" class="absolute w-full flex justify-start items-center px-2 space-x-4">
              <x-btn
                color="red"
                @click="showFieldAction"
              >
                Clear
              </x-btn>

              <x-btn
                color="green"
                @click="showFieldAction"
              >
                Delete
              </x-btn>
            </div>
          </Transition>
        </div>

        <div>
          
        </div>
        
        <x-select
          v-model="selectedColumns"
          :options="generatedSelectHead"
          :multiple="true"
          placeholder="Select columns"
        />

        <div>
          <slot name="search" />
        </div>
      </div>

      <div v-if="count === 0" class="w-full h-screen lg:h-48 flex justify-center items-center">
        <p class="text-2xl font-bold">No data to display</p>
      </div>
      
      <div v-else class="w-full">
        <table class="min-w-full overflow-auto divide-y divide-gray-200 rounded-lg shadow-xl shadow-black table-fixed border-spacing-y-2">
          <!-- Table head dynamically generated from 'rows' -->
          <thead class="w-full bg-gradient-to-r from-prime-light/80 to-second-light/80 dark:from-prime-dark/80 dark:to-second-dark/80 ">
            <x-table-head
              v-if="generatedHead.length"
              :head="selectedColumns"
              :justify="justify"
              :selected="selected"
              @select-all="toggleSelectAll"
            />

            <slot v-else name="head" />
          </thead>

          <!-- Table body -->
          <tbody class="bg-prime-light dark:bg-prime-dark divide-y divide-blue-200 rounded-lg overflow-auto">
            <x-table-body v-for="(row, rowIndex) in rows" :key="rowIndex" :row="row">
              <!-- Checkbox for row selection -->
              <x-table-body-cell v-if="selected" justify="center">
                <input v-model="row.selected" @change="showFieldAction" type="checkbox" class="w-6 h-6 lg:w-4 lg:h-4 rounded border-gray-300 focus:ring-blue-500">
              </x-table-body-cell>

              <!-- Render cells dynamically based on row content and selected columns -->
              <x-table-body-cell v-for="(header, cellIndex) in selectedColumns" :key="cellIndex"  justify="center">
                <!-- Check if the current header is 'avatarUrl' -->
                <div v-if="header === 'avatarUrl'" class="w-full flex justify-center items-center">
                  <x-avatar :src="row[header]" alt="avatar" class="w-9 h-9 object-cover rounded-full" />
                </div>

                <!-- Display other cells -->
                <div v-else class="w-full flex justify-start items-center space-x-6">
                  <slot :name="header" v-bind="row" >
                    <p class="w-full">{{ row[header] }}</p>
                  </slot>
                </div>

              </x-table-body-cell>

              <!-- Actions column -->
              <x-table-body-cell v-if="isColumnActions" justify="center">
                <slot name="actions" :id="row.id" />
              </x-table-body-cell>
            </x-table-body>
          </tbody>

          <!-- Table footer -->
          <tfoot v-if="food" class="bg-prime-light dark:bg-prime-dark divide-y divide-blue-200 rounded-lg">
            <slot name="food" />
          </tfoot>
        </table>

        <!-- Pagination slot -->
        <div>
          <slot name="pagination" />
        </div>
      </div>
    </div>

    <!-- Loading spinner -->
    <div v-else class="w-full h-screen lg:h-150 flex justify-center items-center">
      <XSpinner :loading="loading" />
    </div>
  </div>
</template>
