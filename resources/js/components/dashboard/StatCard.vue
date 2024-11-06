<template>
    <div class="bg-white rounded-xl shadow-soft-xl p-6 border border-gray-100">
        <div class="flex items-center justify-between">
            <div>
                <p class="text-gray-500 font-medium">{{ title }}</p>
                <h3 class="text-2xl font-bold text-gray-800">{{ value }}</h3>
            </div>
            <div :class="[
                'w-12 h-12 bg-gradient-to-br rounded-lg flex items-center justify-center',
                `from-${color}-light to-${color}`
            ]">
                <i :class="['fas', `fa-${icon}`, 'text-white text-xl']"></i>
            </div>
        </div>
        <div class="mt-4 flex items-center" :class="trendColor">
            <i :class="['fas', `fa-arrow-${trendDirection}`, 'mr-1']"></i>
            <span class="font-medium">{{ trendValue }}</span>
        </div>
    </div>
</template>

<script setup>
import { computed } from 'vue';

const props = defineProps({
    title: String,
    value: String,
    icon: String,
    color: String,
    trendValue: String,
    trendDirection: {
        type: String,
        default: 'up'
    }
});

const trendColor = computed(() => {
    return props.trendDirection === 'up' ? 'text-success' : 'text-danger';
});
</script>
