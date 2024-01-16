<template>
	<v-navigation-drawer temporary class="bg-accent" v-model="drawer">
		<v-list nav variant="text" base-color="white" color="black">
			<v-list-item
				:prepend-icon="value.icon"
				:title="value.title.toUpperCase()"
				:to="value.link"
				:key="key"
				v-for="(value, key) in navigation.items"
			></v-list-item>
		</v-list>
	</v-navigation-drawer>
</template>

<script lang="ts">
import { defineComponent } from "vue";

// Stores
import useHeaderStore from "@stores/store-header.js";

// Interfaces
import { IHeaderNavigationCommonState } from "@declarations/common/header/interfaces/navigation/common-interface-header-navigation.js";

export default defineComponent({
	name: "navigation-container",
	props: {
		navigation: { type: Object as () => IHeaderNavigationCommonState, required: true },
	},
	computed: {
		/* Data */

		/* Conditional */
		drawer: {
			get(): boolean {
				return this.navigation.drawer;
			},
			set(newValue: boolean) {
				this.navigation.drawer = newValue;
			},
		},
	},
	setup() {
		const storeHeader = useHeaderStore();
		return { storeHeader };
	},
});
</script>
