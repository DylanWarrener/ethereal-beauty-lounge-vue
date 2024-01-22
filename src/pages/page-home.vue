<template>
	<h1>Heading 1</h1>
	<h2>Heading 2</h2>
	<h3>Heading 3</h3>
	<h4>Heading 4</h4>
	<h5>Heading 5</h5>
	<h6>Heading 6</h6>
	<p>Body</p>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

// Stores
import useHeaderStore from '@stores/store-header.js';

import Logo from '../assets/png/logo/logo-transparent.png?raw';

export default defineComponent({
	name: 'home-page-component',
	computed: {
		img() {
			return Logo;
		},
	},
	setup() {
		const storeHeader = useHeaderStore();
		return { storeHeader };
	},
});
</script>
