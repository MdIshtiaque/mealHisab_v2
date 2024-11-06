<template>
    <div class="pb-2">
        <h2 class="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2 px-3">
            {{ title }}
        </h2>
        <div class="space-y-1">
            <router-link
                v-for="item in items"
                :key="item.text"
                :to="item.route"
                class="flex items-center space-x-3 px-4 py-3 rounded-xl transition-all duration-200"
                :class="[
                    item.active
                        ? 'bg-gradient-to-r from-primary/10 to-secondary/10 text-primary'
                        : 'text-gray-600 hover:bg-gray-100'
                ]"
            >
                <i :class="['fas', item.icon]"></i>
                <span>{{ item.text }}</span>
            </router-link>
        </div>
    </div>
</template>

<script setup>
defineProps({
    title: {
        type: String,
        required: true
    },
    items: {
        type: Array,
        required: true
    }
});
</script>
