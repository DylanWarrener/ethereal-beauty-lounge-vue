<template>
	<common-btn-container-component
		:style="computed_css_minWidth"
		:class="computed_css_backgroundColour"
		:text="text"
	></common-btn-container-component>
</template>

<script lang="ts">
import { defineComponent } from "vue";

// Components
import BtnContainerComp from "@components/common/button/common-btn.vue";

export default defineComponent({
	name: "btn-text-container-component",
	components: {
		"common-btn-container-component": BtnContainerComp,
	},
	props: {
		style: { type: String, required: false },
		class: { type: String, required: false },
		text: { type: String, required: true },
	},
	computed: {
		computed_css_backgroundColour(): string {
			return this.class ? this.class : "bg-accent";
		},
		computed_css_minWidth(): string {
			return this.style ? this.style : "min-width: 100px";
		},
	},
});
</script>
