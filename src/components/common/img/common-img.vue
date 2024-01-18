<template>
	<div class="h-100" :style="styleContainer">
		<v-img class="w-100 h-100" src="logo-transparent.png"></v-img>
	</div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
	name: 'image-container-component',
	props: {
		styleContainer: { type: String, required: false, default: 'width: 100px' },
	},
});
</script>

<style lang="scss"></style>
