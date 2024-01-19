<template>
	<v-tooltip close-on-content-click v-model="tooltipDrawer">
		<template #activator="{ props }">
			<v-btn
				variant="text"
				:id="id"
				:class="classBtn"
				:icon="icon"
				v-bind="props"
				@click.left="drawerHandler"
			></v-btn>
		</template>
		<span>{{ tooltip }}</span>
	</v-tooltip>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
	name: "tooltip-container-component",
	props: {
		id: { type: String, required: false },
		classBtn: { type: String, required: false },
		icon: { type: String, required: true },
		tooltip: { type: String, required: false },
	},
	data() {
		return {
			tooltipDrawer: false,
		};
	},
	methods: {
		drawerHandler(): void {
			this.$emit("toggle-drawer-state");
		},
	},
	watch: {
		tooltipDrawer(): void {
			this.$emit("toggle-tooltip-drawer-state", this.tooltipDrawer);
		},
	},
});
</script>
