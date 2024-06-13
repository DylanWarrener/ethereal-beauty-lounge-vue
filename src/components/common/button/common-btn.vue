<template>
	<v-btn color="accent" size="large" class="px-4" :style="style" :class="class" @click="$emit('click')">
		<template #default v-if="text">
			<small :style="textStyle" :class="textClass" v-text="text"></small>
		</template>
	</v-btn>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
	name: "btn-container-component",
	props: {
		style: { type: String, required: false },
		class: { type: String, required: false },

		textStyle: { type: String, required: false },
		textClass: { type: String, required: false, default: "text-default" },

		text: { type: String, required: false },
	},
});
</script>
