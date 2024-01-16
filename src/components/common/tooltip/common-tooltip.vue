<template>
	<v-tooltip v-model="toggledTooltip">
		<template #activator="{ props }">
			<v-btn variant="text" :id="id" :icon="icon" v-bind="props" @click.left="toggleClickHander"></v-btn>
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
		icon: { type: String, required: true },
		tooltip: { type: String, required: false },
		toggledTooltip: { type: Boolean, required: true },
	},
	methods: {
		toggleClickHander(): void {
			this.$emit("toggle-drawer");
		},
	},
});
</script>
