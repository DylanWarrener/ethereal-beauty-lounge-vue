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
		tooltipDrawerState: { type: Boolean, required: true },
	},
	data() {
		return {
			tooltipDrawer: false,
		};
	},
	methods: {
		drawerHandler(): void {
			debugger;
			this.$emit("toggle-drawer");
		},
	},
	watch: {
		tooltipDrawer(): void {
			this.$emit("toggle-tooltip-drawer", this.tooltipDrawer);
		},
	},
});
</script>
