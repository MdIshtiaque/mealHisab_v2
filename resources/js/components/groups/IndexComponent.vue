<template>
    <PageComponent title="Groups">
        <template #actions>
            <router-link
                to="/groups/create"
                class="px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary-dark transition-colors duration-200"
            >
                Create New Group
            </router-link>
        </template>

        <div class="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            <!-- Group cards will go here -->
            <div class="bg-white rounded-xl shadow-soft-xl p-6">
                <h3 class="text-lg font-semibold">Coming Soon</h3>
                <p class="text-gray-500">Groups functionality is under development</p>
            </div>
        </div>
    </PageComponent>
</template>

<script setup>
import PageComponent from '../base/PageComponent.vue';
</script>
