<template>
	<v-divider :color="color" :thickness="thickness" :style="computed_style"></v-divider>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
	name: "divider-container-component",
	props: {
		color: { type: String, required: false, default: "accent" },
		thickness: { type: String, required: false, default: "4" },
		style: { type: String, required: false },
	},
	computed: {
		computed_style(): string {
			debugger;
			const isStylePropValid: boolean = !!this.style && this.style.length > 0;

			let retVal: string = "opacity: 1 !important;";
			if (isStylePropValid) {
				retVal += `${this.style}`;
			}
			return retVal;
		},
	},
});
</script>
