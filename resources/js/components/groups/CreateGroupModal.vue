<template>
  <div class="fixed inset-0 bg-black bg-opacity-50 z-50">
    <div class="min-h-screen flex items-center justify-center p-4">
      <div class="bg-white rounded-xl shadow-xl max-w-md w-full p-6">
        <!-- Modal Header -->
        <div class="flex justify-between items-center mb-6">
          <h3 class="text-xl font-semibold text-gray-800">Create New Group</h3>
          <button @click="$emit('close')" class="text-gray-400 hover:text-gray-600">
            <i class="fas fa-times"></i>
          </button>
        </div>

        <!-- Form -->
        <form @submit.prevent="handleSubmit" class="space-y-4">
          <!-- Group Name -->
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">Group Name</label>
            <input
              v-model="formData.name"
              type="text"
              class="w-full px-4 py-2 rounded-xl border border-gray-200 focus:border-primary focus:ring-2 focus:ring-primary/20 focus:outline-none"
              :class="{ 'border-red-500': errors.name }"
            >
            <p v-if="errors.name" class="mt-1 text-sm text-red-500">{{ errors.name }}</p>
          </div>

          <!-- Description -->
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">Description</label>
            <textarea
              v-model="formData.description"
              rows="3"
              class="w-full px-4 py-2 rounded-xl border border-gray-200 focus:border-primary focus:ring-2 focus:ring-primary/20 focus:outline-none"
              :class="{ 'border-red-500': errors.description }"
            ></textarea>
            <p v-if="errors.description" class="mt-1 text-sm text-red-500">{{ errors.description }}</p>
          </div>

          <!-- Member Selection -->
          <div class="relative">
            <label class="block text-sm font-medium text-gray-700 mb-1">Add Members</label>
            <div class="relative">
              <button
                type="button"
                @click="showMembersList = !showMembersList"
                class="w-full px-4 py-2 rounded-xl border border-gray-200 bg-white text-left flex items-center justify-between focus:border-primary focus:ring-2 focus:ring-primary/20 focus:outline-none"
                :class="{ 'border-red-500': errors.members }"
              >
                <span>{{ selectedMembersText }}</span>
                <i class="fas fa-chevron-down text-gray-400"></i>
              </button>

              <!-- Members Dropdown -->
              <div
                v-if="showMembersList"
                v-click-away="closeMembersList"
                class="absolute z-50 mt-1 w-full bg-white rounded-xl shadow-lg border border-gray-200 max-h-60 overflow-y-auto"
              >
                <div class="p-2 border-b border-gray-100">
                  <input
                    v-model="memberSearch"
                    type="text"
                    placeholder="Search members..."
                    class="w-full px-3 py-1.5 rounded-lg border border-gray-200 focus:border-primary focus:ring-2 focus:ring-primary/20 focus:outline-none"
                  >
                </div>
                <div class="p-2">
                  <div
                    v-for="member in filteredMembers"
                    :key="member.id"
                    class="flex items-center space-x-3 p-2 hover:bg-gray-50 rounded-lg cursor-pointer"
                    @click="toggleMember(member)"
                  >
                    <input
                      type="checkbox"
                      :checked="isSelected(member)"
                      class="rounded border-gray-300 text-primary focus:ring-primary/20"
                    >
                    <div class="flex items-center space-x-3">
                      <img
                        :src="`https://ui-avatars.com/api/?name=${encodeURIComponent(member.name)}&background=22C55E&color=fff`"
                        class="w-8 h-8 rounded-full"
                      >
                      <div>
                        <p class="text-sm font-medium text-gray-700">{{ member.name }}</p>
                        <p class="text-xs text-gray-500">{{ member.email }}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <p v-if="errors.members" class="mt-1 text-sm text-red-500">{{ errors.members }}</p>
          </div>

          <!-- Selected Members Tags -->
          <div v-if="selectedMembers.length" class="flex flex-wrap gap-2">
            <div
              v-for="member in selectedMembers"
              :key="member.id"
              class="inline-flex items-center bg-primary/10 text-primary text-sm rounded-lg px-3 py-1"
            >
              <span>{{ member.name }}</span>
              <button
                type="button"
                @click="toggleMember(member)"
                class="ml-2"
              >
                <i class="fas fa-times"></i>
              </button>
            </div>
          </div>

          <!-- Action Buttons -->
          <div class="flex justify-end space-x-3 mt-6">
            <button
              type="button"
              @click="$emit('close')"
              class="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              :disabled="isLoading"
              class="px-4 py-2 bg-gradient-to-r from-primary to-primary-dark text-white rounded-lg hover:shadow-lg transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <i v-if="isLoading" class="fas fa-spinner fa-spin mr-2"></i>
              Create Group
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue';

// State
const formData = ref({
  name: '',
  description: '',
});
const errors = ref({});
const isLoading = ref(false);
const showMembersList = ref(false);
const memberSearch = ref('');
const selectedMembers = ref([]);

// Sample members data (replace with API call)
const availableMembers = ref([
  { id: 1, name: 'John Doe', email: 'john@example.com' },
  { id: 2, name: 'Jane Smith', email: 'jane@example.com' },
  { id: 3, name: 'Mike Johnson', email: 'mike@example.com' },
  // Add more members as needed
]);

// Computed
const filteredMembers = computed(() => {
  const search = memberSearch.value.toLowerCase();
  return availableMembers.value.filter(member =>
    member.name.toLowerCase().includes(search) ||
    member.email.toLowerCase().includes(search)
  );
});

const selectedMembersText = computed(() => {
  const count = selectedMembers.value.length;
  if (count === 0) return 'Select Members';
  return `${count} member${count === 1 ? '' : 's'} selected`;
});

// Methods
const toggleMember = (member) => {
  const index = selectedMembers.value.findIndex(m => m.id === member.id);
  if (index === -1) {
    selectedMembers.value.push(member);
  } else {
    selectedMembers.value.splice(index, 1);
  }
};

const isSelected = (member) => {
  return selectedMembers.value.some(m => m.id === member.id);
};

const closeMembersList = () => {
  showMembersList.value = false;
};

const validateForm = () => {
  errors.value = {};

  if (!formData.value.name) {
    errors.value.name = 'Group name is required';
  }

  if (!formData.value.description) {
    errors.value.description = 'Description is required';
  }

  if (selectedMembers.value.length === 0) {
    errors.value.members = 'Please select at least one member';
  }

  return Object.keys(errors.value).length === 0;
};

const handleSubmit = async () => {
  if (!validateForm()) return;

  isLoading.value = true;

  try {
    const response = await fetch('/api/groups', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        ...formData.value,
        member_ids: selectedMembers.value.map(m => m.id),
      }),
    });

    if (!response.ok) {
      const data = await response.json();
      errors.value = data.errors || {};
      return;
    }

    const newGroup = await response.json();
    emit('created', newGroup);
  } catch (error) {
    console.error('Error creating group:', error);
  } finally {
    isLoading.value = false;
  }
};

// Expose events
const emit = defineEmits(['close', 'created']);

// Custom directive
const vClickAway = {
  mounted(el, binding) {
    el._clickOutside = (event) => {
      if (!(el === event.target || el.contains(event.target))) {
        binding.value(event);
      }
    };
    document.addEventListener('click', el._clickOutside);
  },
  unmounted(el) {
    document.removeEventListener('click', el._clickOutside);
  }
};

// Add the directive to your component
const directives = {
  'click-away': vClickAway
};
</script>

<style scoped>
.modal-enter-active,
.modal-leave-active {
  transition: opacity 0.3s ease;
}

.modal-enter-from,
.modal-leave-to {
  opacity: 0;
}
</style>
