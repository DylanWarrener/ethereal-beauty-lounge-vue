<template>
	<v-btn size="large" class="px-4" :id="id" :color="color" :style="style" :class="class" :icon="icon" @click="emit">
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
		id: { type: String, required: true },
		color: { type: String, required: false, default: "accent" },
		style: { type: String, required: false },
		class: { type: String, required: false },
		icon: { type: String, required: false },

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
		}
	},
	methods: {
		emit(): void {
			debugger;
			this.$emit('click');
		}
	}
});
</script>
