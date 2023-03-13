<script setup lang="ts">
</script>

<template>
	<!-- <router-view></router-view> -->
	<router-view v-slot="{ Component }">
		<transition>
			<component :is="Component" />
		</transition>
	</router-view>
</template>

<style lang="less">
.v-enter-active,
.v-leave-active {
  transition: opacity 0.5s ease;
}

.v-enter-from,
.v-leave-to {
  opacity: 0;
}
</style>
