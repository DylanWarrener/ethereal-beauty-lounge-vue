<template>
	<v-tooltip :text="txtTooltip"></v-tooltip>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
	name: "tooltip-container-component",
	props: {
		txtTooltip: { type: String, required: false },
	},
});
</script>
