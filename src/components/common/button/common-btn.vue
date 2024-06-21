<template>
	<v-btn size="large" :id="id" :color="color" :style="style" :class="class" :icon="icon" @click="$emit('click')">
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
		id: { type: String as () => string, required: true },
		color: { type: String as () => string | undefined, required: false, default: "accent" },
		style: { type: String as () => string | undefined, required: false },
		class: { type: String as () => string | string[] | undefined, required: false },
		icon: { type: String as () => string | undefined, required: false },

		textStyle: { type: String as () => string | undefined, required: false },
		textClass: { type: String as () => string | undefined, required: false, default: "text-default" },
		text: { type: String as () => string | undefined, required: false },
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
