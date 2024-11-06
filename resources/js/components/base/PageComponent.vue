<template>
    <div>
        <div class="mb-6 flex justify-between items-center">
            <h1 class="text-2xl font-semibold text-gray-800">{{ title }}</h1>
            <div>
                <slot name="actions"></slot>
            </div>
        </div>
        <slot></slot>
    </div>
</template>

<script setup>
defineProps({
    title: {
        type: String,
        required: true
    }
});
</script>
