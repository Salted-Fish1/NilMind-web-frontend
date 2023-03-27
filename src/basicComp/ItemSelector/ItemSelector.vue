<script setup lang="ts">
import BasicCard from '@/basicComp/Card/BasicCard.vue'

export interface IItem {
	key: string
	name: string
	img: string
}

export interface IType {
	key: string
	name: string
	items: IItem[]
}

interface IProps {
	types: IType[]
}
const props = defineProps<IProps>()

interface IEmits {
	(e: 'ItemClick', item: IItem): void
}
const emits = defineEmits<IEmits>()

const handleItemClick = (item: IItem) => {
	emits('ItemClick', item)
}
</script>

<template>
	<div class="selector">
		<template v-for="type in props.types" :key="type.key">
			<div class="type">
				<div class="type-title">
					{{ type.name }}
				</div>

				<div class="items">
					<template v-for="item in type.items" :key="item.key">
						<div class="basic-item" @click="handleItemClick(item)">
							<basic-card :item="item" />
						</div>
					</template>
				</div>
			</div>
		</template>
	</div>
</template>

<style scoped lang="less">
.selector {
	overflow-y: scroll;
}
</style>
