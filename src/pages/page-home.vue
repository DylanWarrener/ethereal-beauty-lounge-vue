<template>
	<p style="border: 2px solid blue">Home</p>
	<v-img style="border: 2px solid red" :src="img">This is supposed to be the img</v-img>
</template>

<script lang="ts">
import { defineComponent } from "vue";

// Stores
import useHeaderStore from "@stores/store-header.js";

import Logo from "../assets/png/logo/logo-transparent.png?raw";

export default defineComponent({
	name: "home-page-component",
	computed: {
		img() {
			return Logo;
		},
		menuToggle(): boolean {
			return this.storeHeader.getAppBarMenuDrawer;
		},
	},
	setup() {
		const storeHeader = useHeaderStore();
		return { storeHeader };
	},
});
</script>
