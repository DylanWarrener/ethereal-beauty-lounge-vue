<template>
	<navigation-container-component
		location="bottom"
		:navigation="menuNavigation"
		:drawer="menuDrawer"
	></navigation-container-component>
</template>

<script lang="ts">
import { defineComponent } from "vue";

// Stores
import useHeaderStore from "@stores/store-header.js";

// Components
import NavigationContainerComp from "@components/common/navigation/common-navigation.vue";

// Interfaces
import { IHeaderNavigationCommonItemState } from "@declarations/common/header/interfaces/navigation/common-interface-header-navigation.js";

export default defineComponent({
	name: "header-navigation-links-component",
	components: {
		"navigation-container-component": NavigationContainerComp,
	},
	computed: {
		/* Data */
		menuNavigation(): IHeaderNavigationCommonItemState[] {
			return this.storeHeader.getNavigationMobileMenu;
		},

		/* Conditional */
		menuDrawer(): boolean {
			return this.storeHeader.getAppBarMenuDrawer;
		},
	},
	setup() {
		const storeHeader = useHeaderStore();
		return { storeHeader };
	},
});
</script>
