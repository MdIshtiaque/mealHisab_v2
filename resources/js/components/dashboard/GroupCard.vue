<template>
    <div class="flex items-center space-x-4 p-4 bg-gray-50 rounded-lg">
        <div :class="[
            'w-12 h-12 bg-gradient-to-br rounded-lg flex items-center justify-center',
            `from-${color}-light to-${color}`
        ]">
            <i class="fas fa-users text-white"></i>
        </div>
        <div class="flex-1">
            <div class="flex justify-between items-start">
                <div>
                    <p class="font-medium text-gray-800">{{ name }}</p>
                    <p class="text-sm text-gray-500">{{ memberCount }} members</p>
                </div>
                <div class="text-right">
                    <p :class="['font-medium', balanceClass]">{{ formattedBalance }}</p>
                    <p class="text-sm text-gray-500">Balance</p>
                </div>
            </div>
            <div class="mt-2 flex justify-between text-sm">
                <span class="text-gray-500">Meal Rate: {{ mealRate }}</span>
                <span class="text-gray-500">Total Meals: {{ totalMeals }}</span>
            </div>
        </div>
    </div>
</template>

<script setup>
import { computed } from 'vue';

const props = defineProps({
    name: String,
    memberCount: Number,
    balance: Number,
    mealRate: String,
    totalMeals: Number,
    color: {
        type: String,
        default: 'primary'
    }
});

const formattedBalance = computed(() => {
    return props.balance >= 0 ? `$${props.balance}` : `-$${Math.abs(props.balance)}`;
});

const balanceClass = computed(() => {
    return props.balance >= 0 ? 'text-success' : 'text-danger';
});
</script>
