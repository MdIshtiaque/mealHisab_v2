<template>
    <div>
        <!-- Stats Cards -->
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
            <StatCard
                title="Active Groups"
                value="24"
                icon="users-rectangle"
                color="purple"
                trend-value="3 new this month"
                trend-direction="up"
            />
            <StatCard
                title="Total Members"
                value="486"
                icon="user-group"
                color="primary"
                trend-value="45 new members"
                trend-direction="up"
            />
            <StatCard
                title="Total Meals"
                value="12,234"
                icon="utensils"
                color="warning"
                trend-value="234 today"
                trend-direction="up"
            />
            <StatCard
                title="Total Expenses"
                value="$8,384"
                icon="wallet"
                color="secondary"
                trend-value="$1,234 this month"
                trend-direction="up"
            />
        </div>

        <!-- Active Groups Overview -->
        <div class="grid lg:grid-cols-3 gap-6 mb-6">
            <!-- Recent Groups -->
            <div class="lg:col-span-2 bg-white rounded-xl shadow-soft-xl p-6 border border-gray-100">
                <div class="flex justify-between items-center mb-6">
                    <h3 class="text-lg font-semibold text-gray-800">Active Groups</h3>
                    <button class="text-secondary hover:text-secondary-dark transition-colors duration-200">
                        View All Groups
                    </button>
                </div>
                <div class="space-y-6">
                    <GroupCard
                        name="Bachelor's Hub"
                        :member-count="12"
                        :balance="1234"
                        meal-rate="$4.5"
                        :total-meals="234"
                        color="purple"
                    />
                    <GroupCard
                        name="Family Dining"
                        :member-count="8"
                        :balance="-234"
                        meal-rate="$5.2"
                        :total-meals="186"
                        color="primary"
                    />
                </div>
            </div>

            <!-- Recent Activities -->
            <div class="bg-white rounded-xl shadow-soft-xl p-6 border border-gray-100">
                <div class="flex justify-between items-center mb-6">
                    <h3 class="text-lg font-semibold text-gray-800">Recent Activities</h3>
                    <button class="text-secondary hover:text-secondary-dark transition-colors duration-200">
                        View All
                    </button>
                </div>
                <div class="space-y-6">
                    <ActivityCard
                        title="New group created"
                        description="'Tech House' by John Doe"
                        time-ago="2 min ago"
                        icon="fa-plus"
                        color="purple"
                    />
                    <ActivityCard
                        title="Meal count updated"
                        description="Bachelor's Hub - 24 meals added"
                        time-ago="1 hour ago"
                        icon="fa-utensils"
                        color="primary"
                    />
                    <ActivityCard
                        title="Expense added"
                        description="$120 added to Family Dining"
                        time-ago="3 hours ago"
                        icon="fa-wallet"
                        color="warning"
                    />
                    <ActivityCard
                        title="New member added"
                        description="Jane Smith joined Tech House"
                        time-ago="5 hours ago"
                        icon="fa-user-plus"
                        color="secondary"
                    />
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import StatCard from './dashboard/StatCard.vue';
import GroupCard from './dashboard/GroupCard.vue';
import ActivityCard from './dashboard/ActivityCard.vue';
</script>
