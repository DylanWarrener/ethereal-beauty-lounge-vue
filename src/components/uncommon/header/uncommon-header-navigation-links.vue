<template>
	<navigation-container-component :navigation="navigation"></navigation-container-component>
</template>

<script lang="ts">
import { defineComponent } from "vue";

// Stores
import useHeaderStore from "@stores/store-header.js";

// Components
import NavigationContainerComp from "@components/common/navigation/common-navigation.vue";

// Interfaces
import { IHeaderNavigationLinksState } from "@declarations/common/header/interfaces/navigation/common-interface-header-navigation.js";

export default defineComponent({
	name: "header-navigation-links-component",
	components: {
		"navigation-container-component": NavigationContainerComp,
	},
	computed: {
		navigation(): IHeaderNavigationLinksState {
			return this.storeHeader.getNavigationLinks;
		},
	},
	setup() {
		const storeHeader = useHeaderStore();
		return { storeHeader };
	},
});
</script>
