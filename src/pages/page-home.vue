<template>
	<p style="border: 2px solid blue">Home</p>
	<v-img style="border: 2px solid red" :src="img">This is supposed to be the img</v-img>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

import Logo from '../assets/png/logo/logo-transparent.png?raw';

export default defineComponent({
	name: 'home-page-component',
	computed: {
		img() {
			return Logo;
		},
	},
});
</script>
