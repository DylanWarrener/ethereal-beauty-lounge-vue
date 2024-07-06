<template>
	<v-btn 
		:size="size" 
		:color="color" 
		:rounded="rounded" 
		:class="computed_css_class" 
		:style="computed_css_style" 
		:to="to">
		<template #append>
			<v-icon :color="iconAppendColor" :icon="iconAppend" v-if="iconAppend && iconAppendColor"></v-icon>
		</template>
		<small :class="textClass" :style="textStyle" v-text="text" v-if="text"></small>
		<v-icon :color="iconColor" :icon="icon" v-if="icon && iconColor"></v-icon>
		<v-img :src="src" :alt="alt" v-if="src && alt"></v-img>
		<slot name="custom-svg" class="custom-svg"></slot>
		<template #prepend>
			<v-icon :color="iconPrependColor" :icon="iconPrepend" v-if="iconPrepend && iconPrependColor"></v-icon>
		</template>
	</v-btn>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
	name: "btn-container-component",
	props: {
		size: { type: String, required: false, default: "large" },
		color: { type: String, required: false, default: "primary" },
		rounded: { type: String, required: false, default: "lg" },
		class: { type: String, required: false },
		style: { type: String, required: false },
		to: { type: String, required: false },

		/* Append */
		iconAppend: { type: String, required: false },
		iconAppendColor: { type: String, required: false },

		/* Default */
		textClass: { type: String, required: false, default: "text-default" },
		textStyle: { type: String, required: false },
		text: { type: String, required: false },
		icon: { type: String, required: false },
		iconColor: { type: String, required: false },
		src: { type: String, required: false },
		alt: { type: String, required: false },

		/* Loader */
		loader: { type: String, required: false },

		/* Prepend */
		iconPrepend: { type: String, required: false },
		iconPrependColor: { type: String, required: false },
	},
	computed: {
		computed_css_class(): string[] {
			let retval: string[] = [];

			retval.push(!!this.icon ? "pa-2" : "px-4");
            if (this.class)
                this.class.split(" ").forEach(element => retval.push(element));
            return retval;
		},
		computed_css_style(): string {
			let retval: string = "";
            if (this.style)
				retval += this.style;
            return retval;
		},
		computed_css_classText(): string[] {
			let retval: string[] = [];
            if (this.textClass)
                this.textClass.split(" ").forEach(element => retval.push(element));
            return retval;
		},
		computed_css_styleText(): string {
			let retval: string = "";
            if (this.textStyle)
				retval += this.textStyle;
            return retval;
		},
	},
});
</script>

<style lang="scss">
.custom-svg {
  width: 24px;
  height: 24px;
  fill: currentColor; /* Ensures the icon inherits the text color */
  margin-right: 8px; /* Adds some space between the icon and the text */
}
</style>
