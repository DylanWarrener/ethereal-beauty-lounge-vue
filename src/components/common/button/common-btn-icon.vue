<template>
	<common-btn-container-component
		varient="flat"
		:icon="icon"
		:style="style"
		@click="$emit('click')"
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
		icon: { type: String, required: true },
		style: { type: String, required: false },
	},
});
</script>
