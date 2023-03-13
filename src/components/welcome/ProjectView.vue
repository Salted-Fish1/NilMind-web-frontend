<script setup lang="ts">
import ItemSelector, { IType } from '@/basicComp/ItemSelector/ItemSelector.vue'
import router from '@/router'
import { ref } from 'vue'

const types = ref<IType[]>([
	{
		key: 'new',
		name: 'New',
		items: [
			{
				key: 'new',
				name: 'New',
				img: 'src/assets/200*120.png'
			}
		]
	},
	{
		key: 'previous',
		name: 'Previous Work',
		items: [
			{
				key: 'nilmind',
				name: 'NilMind',
				img: 'src/assets/200*120.png'
			},
			{
				key: 'test',
				name: 'TESTTESTTESTTESTTESTTESTTEST',
				img: 'src/assets/200*120.png'
			}
		]
	}
])

const handleSignOut = () => {
	router.push({ name: 'signIn' })
}
</script>

<template>
	<div class="project">
		<div class="title">
			<span class="text">Welcome, Nilexpr</span>
			<div class="sign-out" @click="handleSignOut">Sign Out</div>
		</div>
		<item-selector :types="types"></item-selector>
	</div>
</template>

<style scoped lang="less">
.project {
	display: flex;
	flex-direction: column;
	flex: 2 0 0;

	.title {
		display: flex;
		flex: 1 0 0;

		width: 100%;

		justify-content: center;
		align-items: center;
		align-self: center;

		font-size: 40px;

		margin: 0 2vw;

		border-bottom: 1px solid silver;

		.text {
			flex: 5 0 0;
		}
		.sign-out {
			flex: 1 0 0;
			font-size: medium;
			align-self: flex-end;
			margin: 1vh;
		}
	}

	:deep(.selector) {
			display: flex;
			flex-direction: column;

			flex: 2 0 0;
			margin-left: 2vw;
	}

	:deep(.type) {
		margin-top: 1vh;
		margin-bottom: 2vh;
	}

	:deep(.type-title) {
		font-size: 20px;
		margin: 1vh;
	}

	:deep(.type-title::before) {
		content: "Type: ";
		font-size: 20px;
		margin: 1vh;
	}

	:deep(.items) {
		display: flex;
		flex-wrap: wrap;
		gap: 2vh
	}

	:deep(.item) {
		border: 1px solid silver;
		border-radius: 5px;
		box-shadow: 0px 0px 12px rgba(0, 0, 0, .12);

		max-width: 200px;
	}

	:deep(.title) {
		margin: 1vh;
		text-align: center;
		overflow: hidden;
		white-space: nowrap;
		text-overflow: ellipsis;
		// text-shadow: 0px 0px 12px rgba(0, 0, 0, .2);
	}

	:deep(.item:hover) {
		text-shadow: 0px 0px 30px rgba(0, 0, 0, 1);
	}
}
</style>
