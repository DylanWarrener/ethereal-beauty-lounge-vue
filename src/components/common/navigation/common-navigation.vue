<template>
	<v-navigation-drawer temporary class="bg-accent">
		<v-list nav variant="text" base-color="white" bg-color="accent" color="white">
			<v-list-item
				:prepend-icon="item.icon"
				:to="item.link"
				:key="index"
				v-for="(item, index) in navigation"
			>
			<v-list-item-title>{{ item.title.toUpperCase() }}</v-list-item-title>
		</v-list-item>
		</v-list>
	</v-navigation-drawer>
</template>

<script lang="ts">
import { defineComponent } from "vue";

// Interfaces
import { IHeaderNavigationCommonItemState } from "@declarations/common/header/interfaces/navigation/common-interface-header-navigation.js";

export default defineComponent({
	name: "navigation-container",
	props: {
		navigation: { type: Array<IHeaderNavigationCommonItemState>, required: true },
	},
});
</script>
