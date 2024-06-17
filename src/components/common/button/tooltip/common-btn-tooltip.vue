<template>
	<v-tooltip location="bottom" :text="tooltip">
		<template #activator="{ props }">
			<slot name="tooltip-btn" :tooltip-prop="{ props }"></slot>
		</template>
	</v-tooltip>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
	name: "btn-tooltip-container-component",
	props: {
		tooltip: { type: String, required: true },
	}
});
</script>
