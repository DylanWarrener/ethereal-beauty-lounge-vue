<template>
	<v-btn size="large" :color="color" :class="class" :style="style" :icon="icon" :to="to">
		<template #default v-if="text">
			<small :class="textClass" :style="textStyle" v-text="text"></small>
		</template>
	</v-btn>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
	name: "btn-container-component",
	props: {
		color: { type: String, required: false, default: "accent" },
		style: { type: String, required: false },
		class: { type: String, required: false },
		icon: { type: String, required: false },
		to: { type: String, required: false },

		textStyle: { type: String, required: false },
		textClass: { type: String, required: false, default: "text-default" },
		text: { type: String, required: false },
	},
	computed: {
		computed_css_class(): any {
			let retval: any = [];
			if (this.class !== undefined) {
				retval.push(this.class);
			}

			if (!!this.icon) {
				retval.push("pa-2");
			} else {
				retval.push("px-4");
			}
			return retval;
		},
	},
});
</script>
