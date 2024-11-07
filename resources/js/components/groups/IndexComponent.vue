<template>
  <div class="p-6 max-w-7xl mx-auto">
    <!-- Search and Filter -->
    <div class="flex flex-col md:flex-row gap-4 mb-6">
      <div class="flex-1">
        <div class="relative">
          <input
            v-model="searchQuery"
            type="text"
            placeholder="Search groups..."
            class="w-full pl-10 pr-4 py-2.5 rounded-xl border border-gray-200 focus:border-primary focus:ring-2 focus:ring-primary/20 focus:outline-none"
          >
          <i class="fas fa-search absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"></i>
        </div>
      </div>
      <div class="flex gap-4">
        <select
          v-model="sortBy"
          class="px-4 py-2.5 rounded-xl border border-gray-200 focus:border-primary focus:ring-2 focus:ring-primary/20 focus:outline-none bg-white"
        >
          <option value="">Sort by</option>
          <option value="members-desc">Members: High to Low</option>
          <option value="members-asc">Members: Low to High</option>
          <option value="created">Date Created</option>
        </select>
        <button
          @click="showCreateModal = true"
          class="px-4 py-2.5 bg-gradient-to-r from-primary to-primary-dark text-white rounded-xl hover:shadow-lg transition-all duration-200"
        >
          <i class="fas fa-plus mr-2"></i>New Group
        </button>
      </div>
    </div>

    <!-- Groups Grid -->
    <div class="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
      <div
        v-for="group in filteredGroups"
        :key="group.id"
        class="group bg-white rounded-xl shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100"
      >
        <!-- Card Header -->
        <div class="p-4 border-b border-gray-100">
          <div class="flex items-center justify-between">
            <div class="flex items-center space-x-3">
              <div class="relative">
                <div class="w-12 h-12 rounded-xl bg-gradient-to-br from-purple-500 to-purple-700 flex items-center justify-center text-xl font-bold text-white">
                  {{ getInitials(group.name) }}
                </div>
                <span class="absolute -bottom-1 -right-1 w-4 h-4 bg-success rounded-full border-2 border-white"></span>
              </div>
              <div>
                <h3 class="font-semibold text-gray-800">{{ group.name }}</h3>
                <p class="text-xs text-gray-500">Created {{ formatDate(group.created_at) }}</p>
              </div>
            </div>
            <!-- Dropdown Menu -->
            <div class="relative" v-click-outside="closeDropdown">
              <button
                @click="toggleDropdown(group.id)"
                class="p-1.5 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <i class="fas fa-ellipsis-v text-gray-400"></i>
              </button>
              <div
                v-show="activeDropdown === group.id"
                class="absolute right-0 mt-2 w-48 bg-white rounded-xl shadow-lg border border-gray-100 z-50"
              >
                <a @click="editGroup(group)" class="flex items-center px-4 py-2.5 text-sm text-gray-600 hover:bg-gray-50 border-b border-gray-100 cursor-pointer">
                  <i class="fas fa-edit w-4 mr-3"></i> Edit Group
                </a>
                <a @click="addMember(group)" class="flex items-center px-4 py-2.5 text-sm text-gray-600 hover:bg-gray-50 border-b border-gray-100 cursor-pointer">
                  <i class="fas fa-user-plus w-4 mr-3"></i> Add Member
                </a>
                <a @click="openSettings(group)" class="flex items-center px-4 py-2.5 text-sm text-gray-600 hover:bg-gray-50 border-b border-gray-100 cursor-pointer">
                  <i class="fas fa-cog w-4 mr-3"></i> Settings
                </a>
                <a @click="confirmDelete(group)" class="flex items-center px-4 py-2.5 text-sm text-red-600 hover:bg-red-50 cursor-pointer">
                  <i class="fas fa-trash-alt w-4 mr-3"></i> Delete Group
                </a>
              </div>
            </div>
          </div>
        </div>

        <!-- Card Stats -->
        <div class="p-4">
          <div class="grid grid-cols-2 gap-3">
            <div class="bg-gray-50/80 p-3 rounded-lg">
              <div class="flex items-center justify-between">
                <span class="text-xs font-medium text-gray-500">Members</span>
                <i class="fas fa-users text-gray-400"></i>
              </div>
              <p class="text-lg font-semibold text-gray-800 mt-1">{{ group.members_count }}</p>
            </div>
            <div class="bg-gray-50/80 p-3 rounded-lg">
              <div class="flex items-center justify-between">
                <span class="text-xs font-medium text-gray-500">Meals</span>
                <i class="fas fa-utensils text-gray-400"></i>
              </div>
              <p class="text-lg font-semibold text-gray-800 mt-1">{{ group.meals_count }}</p>
            </div>
          </div>
          <div class="mt-3 bg-gray-50/80 p-3 rounded-lg">
            <div class="flex items-center justify-between">
              <div>
                <span class="text-xs font-medium text-gray-500">Balance</span>
                <p class="text-lg font-semibold text-success mt-1">${{ group.balance }}</p>
              </div>
              <div class="text-right">
                <span class="text-xs font-medium text-gray-500">Rate</span>
                <p class="text-lg font-semibold text-gray-800 mt-1">${{ group.rate }}</p>
              </div>
            </div>
          </div>
        </div>

        <!-- Card Footer -->
        <div class="p-4 border-t border-gray-100">
          <div class="flex items-center justify-between">
            <div class="flex -space-x-2 overflow-hidden">
              <template v-for="(member, index) in group.recent_members" :key="member.id">
                <img
                  v-if="index < 3"
                  :src="`https://ui-avatars.com/api/?name=${encodeURIComponent(member.name)}&background=4ADE80&color=fff`"
                  :alt="member.name"
                  class="w-7 h-7 rounded-full border-2 border-white"
                >
              </template>
              <span
                v-if="group.members_count > 3"
                class="flex items-center justify-center w-7 h-7 rounded-full border-2 border-white bg-gray-100 text-xs font-medium text-gray-500"
              >
                +{{ group.members_count - 3 }}
              </span>
            </div>
            <router-link
              :to="{ name: 'groups.show', params: { id: group.id }}"
              class="inline-flex items-center px-3 py-1.5 bg-primary/10 text-primary rounded-lg text-sm font-medium hover:bg-primary/20 transition-all duration-200"
            >
              <i class="fas fa-chart-line mr-1.5"></i>
              View
            </router-link>
          </div>
        </div>
      </div>
    </div>

    <!-- Pagination -->
    <div class="mt-8">
      <div class="flex items-center justify-between">
        <div class="text-sm text-gray-500">
          Showing {{ paginationInfo.from }} to {{ paginationInfo.to }} of {{ paginationInfo.total }} results
        </div>
        <div class="flex items-center space-x-2">
          <button
            @click="changePage(currentPage - 1)"
            :disabled="currentPage === 1"
            class="p-2 rounded-lg text-gray-500 hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <i class="fas fa-chevron-left"></i>
          </button>
          <template v-for="page in displayedPages" :key="page">
            <button
              @click="changePage(page)"
              :class="[
                'px-3.5 py-2 rounded-lg',
                currentPage === page
                  ? 'bg-primary text-white font-medium'
                  : 'text-gray-500 hover:bg-gray-100'
              ]"
            >
              {{ page }}
            </button>
          </template>
          <button
            @click="changePage(currentPage + 1)"
            :disabled="currentPage === lastPage"
            class="p-2 rounded-lg text-gray-500 hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <i class="fas fa-chevron-right"></i>
          </button>
        </div>
      </div>
    </div>

    <!-- Create Group Modal -->
    <CreateGroupModal
      v-if="showCreateModal"
      @close="showCreateModal = false"
      @created="handleGroupCreated"
    />
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import CreateGroupModal from './CreateGroupModal.vue';
import { format } from 'date-fns';

// State
const groups = ref([]);
const searchQuery = ref('');
const sortBy = ref('');
const currentPage = ref(1);
const lastPage = ref(1);
const showCreateModal = ref(false);
const activeDropdown = ref(null);
const router = useRouter();

// Computed
const filteredGroups = computed(() => {
  let result = [...groups.value];

  // Search filter
  if (searchQuery.value) {
    result = result.filter(group =>
      group.name.toLowerCase().includes(searchQuery.value.toLowerCase())
    );
  }

  // Sort
  if (sortBy.value) {
    result.sort((a, b) => {
      switch (sortBy.value) {
        case 'members-desc':
          return b.members_count - a.members_count;
        case 'members-asc':
          return a.members_count - b.members_count;
        case 'created':
          return new Date(b.created_at) - new Date(a.created_at);
        default:
          return 0;
      }
    });
  }

  return result;
});

const paginationInfo = computed(() => ({
  from: ((currentPage.value - 1) * 9) + 1,
  to: Math.min(currentPage.value * 9, groups.value.length),
  total: groups.value.length
}));

const displayedPages = computed(() => {
  const total = Math.ceil(groups.value.length / 9);
  if (total <= 5) return Array.from({ length: total }, (_, i) => i + 1);

  let pages = [1];
  if (currentPage.value > 3) pages.push('...');
  for (let i = Math.max(2, currentPage.value - 1); i <= Math.min(total - 1, currentPage.value + 1); i++) {
    pages.push(i);
  }
  if (currentPage.value < total - 2) pages.push('...');
  pages.push(total);
  return pages;
});

// Methods
const fetchGroups = async () => {
  try {
    const response = await fetch('/api/groups');
    const data = await response.json();
    groups.value = data.groups;
    lastPage.value = Math.ceil(data.groups.length / 9);
  } catch (error) {
    console.error('Error fetching groups:', error);
  }
};

const getInitials = (name) => {
  return name
    .split(' ')
    .map(word => word[0])
    .join('')
    .toUpperCase()
    .slice(0, 2);
};

const formatDate = (date) => {
  return format(new Date(date), 'MMM d, yyyy');
};

const toggleDropdown = (groupId) => {
  activeDropdown.value = activeDropdown.value === groupId ? null : groupId;
};

const closeDropdown = () => {
  activeDropdown.value = null;
};

const changePage = (page) => {
  if (page >= 1 && page <= lastPage.value) {
    currentPage.value = page;
  }
};

const handleGroupCreated = (newGroup) => {
  groups.value.unshift(newGroup);
  showCreateModal.value = false;
};

// Lifecycle
onMounted(() => {
  fetchGroups();
});

// Group Actions
const editGroup = (group) => {
  // Implement edit functionality
};

const addMember = (group) => {
  // Implement add member functionality
};

const openSettings = (group) => {
  // Implement settings functionality
};

const confirmDelete = (group) => {
  // Implement delete confirmation
};
</script>

<style scoped>
.group-card-hover {
  transition: all 0.3s ease;
}

.group-card-hover:hover {
  transform: translateY(-2px);
}
</style>
