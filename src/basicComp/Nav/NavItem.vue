<script setup lang="ts">
export interface INavItem {
	key: string
	name: string
	icon?: string
}

export interface IProps {
	navItems: INavItem[]
	active: INavItem
}

export interface IEmits {
	(e: 'update:active', activeNavItem: INavItem): void
}

const props = defineProps<IProps>()

const emits = defineEmits<IEmits>()

const handleNavItemClick = (item: INavItem) => {
	emits('update:active', item)
}
</script>

<template>
	<div class="nav">
		<ul class="nav-items">
			<slot name="first-item" class="nav-item"></slot>
			<li v-for="item in props.navItems"
				:key="item.name"
				class="nav-item"
				@click="handleNavItemClick(item)"
				:class="{active: props.active.key === item.key}"
			>
				<div class="item">
					<img :src=item.icon>
					<span>{{ item.name }}</span>
				</div>
			</li>
			<slot name="last-item"></slot>
		</ul>
	</div>
</template>

<style scoped lang="less">
.nav {
	display: flex;

	.nav-items {
		display: flex;
		list-style: none;
	}
}
</style>
