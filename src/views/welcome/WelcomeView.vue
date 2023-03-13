<script setup lang="ts">
import NavItem from '@/components/welcome/NavItem.vue'
import ProjectView from '@/components/welcome/ProjectView.vue'
</script>

<template>
	<transition name="opacity">
		<div class="welcome">
			<nav-item></nav-item>
			<project-view></project-view>
		</div>
	</transition>
</template>

<style scoped lang="less">
.welcome {
	display: flex;
	height: 100vh;
}

.welcome > * {
	user-select: none;
}

.opacity-enter-active,
.opacity-leave-active {
  transition: opacity 0.5s ease;
}

.opacity-enter-from,
.opacity-leave-to {
  opacity: 0;
}
</style>
