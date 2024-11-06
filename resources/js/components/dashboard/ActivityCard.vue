<template>
    <div class="flex items-center space-x-4">
        <div :class="[
            'w-10 h-10 bg-gradient-to-br rounded-lg flex items-center justify-center',
            `from-${color}-light to-${color}`
        ]">
            <i :class="['fas', icon, 'text-white']"></i>
        </div>
        <div class="flex-1">
            <p class="font-medium text-gray-800">{{ title }}</p>
            <p class="text-sm text-gray-500">{{ description }}</p>
        </div>
        <span class="text-sm text-gray-500">{{ timeAgo }}</span>
    </div>
</template>

<script setup>
defineProps({
    title: String,
    description: String,
    timeAgo: String,
    icon: String,
    color: {
        type: String,
        default: 'primary'
    }
});
</script>
