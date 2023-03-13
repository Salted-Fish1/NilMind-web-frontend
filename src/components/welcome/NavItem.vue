<script setup lang="ts">
import NavItem, { INavItem } from '@/basicComp/Nav/NavItem.vue'
import { ref } from 'vue'

const navItems = ref<INavItem[]>([
	{
		name: 'Workplace',
		key: 'workplace',
		icon: 'src/assets/time.svg'
	},
	{
		name: 'Template',
		key: 'template',
		icon: 'src/assets/list.svg'
	}
])

const activeNavItem = ref<INavItem>(navItems.value[0])

const localFileInput = ref()
const handleSelectLocalFile = () => {
	localFileInput.value.click()
}
</script>

<template>
	<div class="start-nav">
		<nav-item
			class="nav"
			:nav-items="navItems"
			v-model:active="activeNavItem"
		>
			<template #last-item>
				<div class="nav-btn nav-item" @click="handleSelectLocalFile">
					<div class="item">Open Local Files</div>
					<input ref="localFileInput" class="no-show" type="file">
				</div>
			</template>
		</nav-item>
	</div>
</template>

<style scoped lang="less">
.start-nav {
	height: 100%;
	flex: 1 0 0;
}

:deep(.nav) {
	flex: 1 0 0;
	justify-content: flex-end;
	align-items: center;
	background-color: #F5F5F5;
	border-right: 1px solid #C0C0C0;

	height: 100%;
}

:deep(.nav-items) {
	display: flex;
	flex-direction: column;
	gap: 10px;

	list-style: none;

	min-width: 220px;
	margin-right: 2vw;
}

:deep(.nav-item) {
	display: flex;
	align-items: center;

	border-radius: 5px;
	padding: 10px;
	gap: 10px;
}

:deep(.nav-item:hover) {
	box-shadow: 0px 0px 12px rgba(0, 0, 0, .12);
}

:deep(.item) {
	display: flex;
	gap: 6px;
	align-items: flex-end;
	margin-left: 6px;
}

:deep(.active) {
	background-color: #E2E2E2;
}

.nav-btn {
	background-color: #FFFFFF;
	box-shadow: 0px 0px 12px rgba(0, 0, 0, .12);
}

.no-show {
	display: none;
}
</style>
