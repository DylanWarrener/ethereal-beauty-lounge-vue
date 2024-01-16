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
import { IHeaderNavigationProfileState } from "@declarations/common/header/interfaces/navigation/common-interface-header-navigation.js";

export default defineComponent({
	name: "header-navigation-profile-component",
	components: {
		"navigation-container-component": NavigationContainerComp,
	},
	computed: {
		navigation(): IHeaderNavigationProfileState {
			return this.storeHeader.getNavigationProfile;
		},
	},
	setup() {
		const storeHeader = useHeaderStore();
		return { storeHeader };
	},
});
</script>
