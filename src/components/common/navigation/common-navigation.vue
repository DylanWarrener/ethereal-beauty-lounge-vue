<template>
	<v-navigation-drawer temporary class="bg-accent" :class="classDrawer">
		<v-list nav variant="text" base-color="white" bg-color="accent" color="white">
			<v-list-item :prepend-icon="item.icon" :to="item.link" :key="index" v-for="(item, index) in navigation">
				<v-list-item-title>{{ item.title.toUpperCase() }}</v-list-item-title>
			</v-list-item>
		</v-list>
	</v-navigation-drawer>
</template>

<script lang="ts">
import { defineComponent } from "vue";

// Stores
import useHeaderStore from "@stores/store-header.js";

export default defineComponent({
	name: "navigation-container",
	props: {
		classDrawer: { type: String, required: false },
		navigation: { type: Array as () => any[], required: true },
	},
	setup() {
		const storeHeader = useHeaderStore();
		return { storeHeader };
	},
});
</script>
