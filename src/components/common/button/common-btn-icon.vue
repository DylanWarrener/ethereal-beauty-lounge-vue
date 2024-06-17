<template>
	<common-btn-container-component
		varient="flat"
		:id="id"
		:color="color"
		:style="style"
		:class="class"
		:icon="icon"
		@click="emit"
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
		id: { type: String, required: true },
		color: { type: String, required: false },
		style: { type: String, required: false },
		class: { type: String, required: false },
		icon: { type: String, required: true },
	},
	methods: {
		emit(): void {
			debugger;
			this.$emit('toggle-menu-drawer');
		}
	}
});
</script>
