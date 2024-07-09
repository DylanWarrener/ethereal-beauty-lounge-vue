<template>
	<v-btn 
		:variant="computed_variant"
		:icon="icon"
		:size="computed_size" 
		:color="computed_color" 
		:class="computed_class" 
		:style="computed_style" 
		:to="to"
		v-ripple="{ class: rippleColor }">
		<template #append>
			<v-icon 
				:color="iconAppendColor" 
				:icon="iconAppend" 
				v-if="iconAppend && iconAppendColor"
			></v-icon>
		</template>
		<small :class="textClass" :style="textStyle" v-text="text" v-if="text"></small>
		<v-icon :color="iconColor" :icon="icon" v-if="icon"></v-icon>
		<v-img :src="src" :alt="alt" v-if="src && alt"></v-img>
		<slot name="custom-svg" class="custom-svg"></slot>
		<template #prepend>
			<v-icon 
				:color="iconPrependColor" 
				:icon="iconPrepend" 
				v-if="iconPrepend && iconPrependColor"
			></v-icon>
		</template>
	</v-btn>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
	name: "btn-container-component",
	props: {
		variant: { type: String, required: false },
		size: { type: String, required: false },
		color: { type: String, required: false, default: "primary" },
		class: { type: String, required: false },
		style: { type: String, required: false },
		to: { type: String, required: false },
		rippleColor: { type: String, required: false, default: "text-accent" },

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
		computed_variant(): string {
			let retval: string = "";
			if (this.variant)
				retval = this.variant;
			else {
				if (this.text)
					retval = "text";
				if (this.icon)
					retval = "flat";
			}
            return retval;
		},
		computed_size(): string {
			let retval: string = "large";
			if (this.size)
				retval = this.size;
			if (this.icon)
				retval = "small";
            return retval;
		},
		computed_color(): string {
			let retval: string = "primary";
			if (this.color)
				retval = this.color;
			if (this.icon)
				retval += "default";
            return retval;
		},

		computed_class(): string[] {
			let retval: string[] = [];

			retval.push(this.icon ? "" : "px-4");
            if (this.class)
                this.class.split(" ").forEach(element => retval.push(element));
            return retval;
		},
		computed_style(): string {
			let retval: string = "";
            if (this.style)
				retval += this.style;
            return retval;
		},
		computed_classText(): string[] {
			let retval: string[] = [];
            if (this.textClass)
                this.textClass.split(" ").forEach(element => retval.push(element));
            return retval;
		},
		computed_styleText(): string {
			let retval: string = "";
            if (this.textStyle)
				retval += this.textStyle;
            return retval;
		}
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
