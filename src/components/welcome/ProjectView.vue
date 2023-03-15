<script setup lang="ts">
import ItemSelector, { IType } from '@/basicComp/ItemSelector/ItemSelector.vue'
import router from '@/router'
import { ref } from 'vue'
import BasicDivider from '@/basicComp/Divider/BasicDivider.vue'

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
			<BasicDivider :direction="'vertical'" />
			<div class="btns">
				<div class="sign-out" @click="handleSignOut">Sign Out</div>
			</div>
		</div>
		<item-selector :types="types"></item-selector>
	</div>
</template>

<style scoped lang="less">
.project::before {
	content: "";
	backdrop-filter: blur(10px);

	position: absolute;
	left: 0;
	right: 0;
	top: 0;
	bottom: 0;

	z-index: -1;

	animation: fadeInOut 1s ease-in;
	// background-color: rgba(255, 255, 255, 0.5);
}
.project {
	position: relative;
	height: 100%;
	z-index: 10;

	display: flex;
	flex-direction: column;

	animation: fadeInOut 0.5s ease-in-out;

	color: white;
	text-shadow: 0px 0px 10px rgba(0, 0, 0, 1);

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

		.btns {
			.sign-out {
				flex: 1 0 0;
				font-size: medium;
				align-self: flex-end;
				margin: 0 1vh;
				padding: 1vh;
				background-color: silver;
				border-radius: 5px;
			}

			.sign-out:hover {
				box-shadow: 0px 0px 12px rgba(0, 0, 0, .12);
			}
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
		// margin: 1vh;
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

@keyframes fadeInOut {
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
}
</style>
