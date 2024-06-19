<template>
	<v-btn class="px-4" :class="btnClass" style="min-width: 100px" size="large" :append-icon="btnAppendIcon" @click="showMenuDrawer">
		<small class="text-default" v-text="btnText"></small>
		<v-menu
			close-on-content-click
			:top="data_locationTop"
			:right="data_locationRight"
			:bottom="data_locationBottom"
			:left="data_locationLeft"
			:transition="menuTransition"
			activator="parent"
		>
			<slot name="menu-items"></slot>
		</v-menu>
	</v-btn>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
	name: "button-text-menu-container-component",
	props: {
		btnClass: { type: String, required: false },
		btnAppendIcon: { type: String, required: false },
		btnText: { type: String, required: false },
		menuLocation: { type: String, required: false, default: "bottom" },
		menuTransition: { type: String, required: false, default: "slide-y-transition" },
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
