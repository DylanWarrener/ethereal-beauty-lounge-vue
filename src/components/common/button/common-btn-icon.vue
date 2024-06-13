<template>
	<common-btn-container-component
		elevation="0"
		density="compact"
		:style="style"
		:ripple="false"
		:icon="icon"
	></common-btn-container-component>
</template>

<script lang="ts">
import { defineComponent } from "vue";

// Components
import BtnContainerComp from "@components/common/button/common-btn.vue";

export default defineComponent({
	name: "btn-icon-container-component",
	components: {
		"common-btn-container-component": BtnContainerComp,
	},
	props: {
		style: { type: String, required: false },
		icon: { type: String, required: true },
	},
});
</script>
