<template>
	<navigation-container-component
		class="d-flex d-md-none"
		location="bottom"
		:navigation="data_mobileMenuNavigation"
		v-model="data_appBarMobileMenuDrawerState"
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
		data_mobileMenuNavigation(): IHeaderNavigationCommonItemState[] {
			return this.storeHeader.getNavigationMobileMenuState;
		},
		data_appBarMobileMenuDrawerState(): boolean {
			return this.storeHeader.getAppBarMobileMenuDrawerState;
		},
	},
	setup() {
		const storeHeader = useHeaderStore();
		return { storeHeader };
	},
});
</script>
