<template>
	<common-menu-container-component 
		:menu-location="menuLocation" 
		:menu-transition="menuTransition" 
		:tooltip-text="tooltipText">
		<template #btn="{ menuProps, tooltipProps }">
			<common-button-container-component
				:id="btnId"
				:class="btnClass"
				:icon="btnIcon"
				v-bind="mergeProps(menuProps, tooltipProps)"
				@click="emit"
			></common-button-container-component>
		</template>
	</common-menu-container-component>
</template>

<script lang="ts">
import { defineComponent, mergeProps } from "vue";

// Components
import MenuContainerComp from "@components/common/menu/common-menu.vue";
import BtnContainerComp from "@components/common/button/common-btn.vue";

export default defineComponent({
	name: "button-text-menu-container-component",
	components: {
		"common-menu-container-component": MenuContainerComp,
		"common-button-container-component": BtnContainerComp,
	},
	props: {
		menuLocation: { type: String, required: false },
		menuTransition: { type: String, required: false },

		tooltipText: { type: String, required: true },
		tooltipLocation: { type: String, required: false },

		btnId: { type: String, required: true },
		btnClass: { type: String, required: false },
		btnIcon: { type: String, required: true }
	},
	methods: {
		mergeProps,
		emit(): void {
			debugger;
			this.$emit('toggle-menu-drawer');
		}
	}
});
</script>
