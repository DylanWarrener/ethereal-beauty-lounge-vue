<template>
	<v-navigation-drawer temporary class="bg-accent" v-model="drawerOpen">
		<v-list nav variant="text" base-color="white" color="black">
			<v-list-item
				:prepend-icon="item.icon"
				:title="item.title.toUpperCase()"
				:to="item.link"
				:key="index"
				v-for="(item, index) in navigation"
			></v-list-item>
		</v-list>
	</v-navigation-drawer>
</template>

<script lang="ts">
import { defineComponent } from "vue";

// Stores
import useHeaderStore from "@stores/store-header.js";

// Interfaces
import { IHeaderNavigationCommonItemState } from "@declarations/common/header/interfaces/navigation/common-interface-header-navigation.js";

export default defineComponent({
	name: "navigation-container",
	props: {
		navigation: { type: Array<IHeaderNavigationCommonItemState>, required: true },
		drawer: { type: Boolean, required: true },
	},
	data() {
		return {
			drawerOpen: false,
		};
	},
	watch: {
		drawer(): void {
			this.drawerOpen = this.drawer;
		},
	},
	setup() {
		const storeHeader = useHeaderStore();
		return { storeHeader };
	},
});
</script>
