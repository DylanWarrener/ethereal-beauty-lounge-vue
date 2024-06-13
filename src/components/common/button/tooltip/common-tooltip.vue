<template>
	<v-tooltip :text="tooltip">
		<template #activator="{ props }">
			<common-btn-icon-container-component
				:icon="icon"
				:style="btnStyle"
				:class="btnClass"
				v-bind="props"
				@click="$emit('click')"
			></common-btn-icon-container-component>
		</template>
	</v-tooltip>
</template>

<script lang="ts">
import { defineComponent } from "vue";

// Components
import BtnIconContainerComp from "@components/common/button/common-btn-icon.vue";

export default defineComponent({
	name: "tooltip-container-component",
	components: {
		"common-btn-icon-container-component": BtnIconContainerComp,
	},
	props: {
		tooltip: { type: String, required: true },

		icon: { type: String, required: true },
		btnStyle: { type: String, required: false },
		btnClass: { type: String, required: false },
	},
});
</script>
