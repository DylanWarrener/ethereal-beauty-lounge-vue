<template>
	<p style="border: 2px solid red">Links menu</p>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

// Stores
import useHeaderStore from '@stores/store-header.js';

export default defineComponent({
	name: 'header-navigation-links-component',
	setup() {
		const storeHeader = useHeaderStore();
		return { storeHeader };
	},
});
</script>
