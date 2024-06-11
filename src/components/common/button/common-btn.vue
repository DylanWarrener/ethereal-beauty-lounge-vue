<template>
	<v-btn color="accent" size="large" style="min-width: 100px" class="px-4" :style="btnStyle" :class="btnClass">
		<template #default v-if="btnText">
			<small :style="btnTextStyle" :class="btnTextClass" v-text="btnText"></small>
		</template>
	</v-btn>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
	name: "button-container-component",
	props: {
		btnStyle: { type: String, required: false },
		btnClass: { type: String, required: false },
		btnTextStyle: { type: String, required: false },
		btnTextClass: { type: String, required: false },
		btnTextColour: { type: String, required: false, default: "text-default" },
		btnText: { type: String, required: false }
	}
});
</script>
