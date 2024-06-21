<template>
	<navigation-container-component
		class="d-flex d-md-none"
		location="bottom"
		:navigation="navigation"
		v-model="computed_data_appBarMobileMenuDrawerState"
	></navigation-container-component>
</template>

<script lang="ts">
import { defineComponent } from "vue";

// Stores
import useHeaderStore from "@stores/store-header.js";

// Components
import NavigationContainerComp from "@components/common/navigation/common-navigation.vue";

// Constants
import { NAVIGATION_MOBLE_MENU } from "@constants/common/arrays/common-constants-arrays.js";

export default defineComponent({
	name: "navigation-pages-mobile-menu-container-component",
	components: {
		"navigation-container-component": NavigationContainerComp,
	},
	data() {
		return {
			navigation: NAVIGATION_MOBLE_MENU,
		};
	},
	computed: {
		computed_data_appBarMobileMenuDrawerState: {
			get(): boolean {
				return this.storeHeader.get_appBar_mobileMenu_show_state;
			},
			set(newValue: boolean): void {
				this.storeHeader.set_appBar_mobileMenu_show_state(newValue);
			},
		},
	},
	setup() {
		const storeHeader = useHeaderStore();
		return { storeHeader };
	},
});
</script>
