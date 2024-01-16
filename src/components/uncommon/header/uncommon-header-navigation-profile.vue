<template>
	<p style="border: 2px solid orange">Profile menu</p>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

// Stores
import useHeaderStore from '@stores/store-header.js';

export default defineComponent({
	name: 'header-navigation-profile-component',
	setup() {
		const storeHeader = useHeaderStore();
		return { storeHeader };
	},
});
</script>
