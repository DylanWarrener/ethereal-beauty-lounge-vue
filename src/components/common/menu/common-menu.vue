<template>
	<v-menu
		close-on-content-click
		:top="data_locationTop"
		:right="data_locationRight"
		:bottom="data_locationBottom"
		:left="data_locationLeft"
		:transition="menuTransition"
	>
		<template #activator="{ props: menu }">
			<v-tooltip location="bottom" :text="tooltipText">
				<template #activator="{ props: tooltip }">
					<button-container-component
						:id="btnId"
						:class="btnClass"
						:icon="btnIcon"
						v-bind="mergeProps(menu, tooltip)"
						@click.left="showMenuDrawer"
					></button-container-component>
				</template>
			</v-tooltip>
		</template>
		<slot name="menu-items"></slot>
	</v-menu>
</template>

<script lang="ts">
import { defineComponent, mergeProps } from "vue";

// Components
import BtnComp from "@components/common/button/common-btn.vue";

export default defineComponent({
	name: "menu-container-component",
	components: {
		"button-container-component": BtnComp,
	},
	props: {
		menuLocation: { type: String, required: true },
		menuTransition: { type: String, required: false, default: "slide-y-transition" },
		tooltipLocation: { type: String, required: false, default: "bottom" },
		tooltipText: { type: String, required: true },
		btnId: { type: String, required: true },
		btnClass: { type: String, required: false },
		btnIcon: { type: String, required: true },
	},
	computed: {
		/* Data */
		data_locationTop(): boolean {
			return this.isLocationValid("top");
		},
		data_locationRight(): boolean {
			return this.isLocationValid("right");
		},
		data_locationBottom(): boolean {
			return this.isLocationValid("bottom");
		},
		data_locationLeft(): boolean {
			return this.isLocationValid("left");
		},
	},
	methods: {
		/* Events */
		mergeProps,
		showMenuDrawer(): void {
			this.$emit("toggle-menu-drawer");
		},

		/* Utils */
		isLocationValid(location: string): boolean {
			return this.menuLocation === location;
		},
	},
});
</script>
