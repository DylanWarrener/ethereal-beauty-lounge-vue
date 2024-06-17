<template>
	<v-menu
		close-on-content-click
		:top="computed_data_menuLocationTop"
		:right="computed_data_menuLocationRight"
		:bottom="computed_data_menuLocationBottom"
		:left="computed_data_menuLocationLeft"
		:transition="menuTransition"
	>
		<template #activator="{ props: menu }">
			<v-tooltip location="bottom" :text="tooltipText">
				<template #activator="{ props: tooltip }">
					<slot name="btn" :menu-props="menu" :tooltip-props="tooltip"></slot>
				</template>
			</v-tooltip>
		</template>
		<slot name="menu-items"></slot>
	</v-menu>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
	name: "menu-container-component",
	props: {
		menuLocation: { type: String, required: false, default: "bottom" },
		menuTransition: { type: String, required: false, default: "slide-y-transition" },
		
		tooltipText: { type: String, required: true }
	},
	computed: {
		computed_data_menuLocationTop(): boolean {
			return this.method_utils_isMenuLocationValid("top");
		},
		computed_data_menuLocationRight(): boolean {
			return this.method_utils_isMenuLocationValid("right");
		},
		computed_data_menuLocationBottom(): boolean {
			return this.method_utils_isMenuLocationValid("bottom");
		},
		computed_data_menuLocationLeft(): boolean {
			return this.method_utils_isMenuLocationValid("left");
		},
	},
	methods: {
		method_utils_isMenuLocationValid(location: string): boolean {
			if (this.menuLocation === undefined) 
				return false;
			return this.menuLocation === location;
		},
	}
});
</script>
