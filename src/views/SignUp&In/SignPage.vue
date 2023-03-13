<script setup lang="ts">
import BasicForm from '@/basicComp/Form/BasicForm.vue'
import router from '@/router'

const handleLogin = () => {
	router.push('welcome')
}
</script>

<template>
	<div class="sign">
		<div class="login" @click="handleLogin">Login</div>
		<basic-form></basic-form>
	</div>
</template>

<style scoped lang="less">
</style>
