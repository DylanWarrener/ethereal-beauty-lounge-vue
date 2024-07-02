<template>
    <v-text-field
        clearable
        :class="computed_css_class_textField"
        :style="computed_css_style_textField"
        :rules="computed_rules_validation_textField"
    >
        <template #label>
            <span :class="computed_css_class_label_textField" v-text="label"></span>
        </template>
    </v-text-field>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
    name: "text-field-container-component",
    props: {
        class: { type: String, required: false },
        style: { type: String, required: false },
        minWidth: { type: String, required: false },
        maxWidth: { type: String, required: false },
        rules: { type: Array, required: false },
        labelClass: { type: String, required: false },
        label: { type: String, required: true }
    },
    computed: {
        computed_css_class_textField(): string[] {
            let retval: string[] = ["w-100", "align-self-center"];
            if (this.class)
                this.class.split(" ").forEach(element => retval.push(element));
            return retval;
        },
        computed_css_style_textField(): string {
            let retval: string = "";
            let minWidth: string = "250px";
            let maxWidth: string = "";
            
            if (this.$vuetify.display.mdAndDown) {
                minWidth = this.minWidth ? this.minWidth : "150px";
                maxWidth = this.maxWidth ? this.maxWidth : "100%";
            }
            else {
                minWidth = this.minWidth ? this.minWidth : "300px";
                maxWidth = this.maxWidth ? this.maxWidth : "100%";
            }
            retval += `min-width: ${minWidth}; max-width: ${maxWidth};`;

            if (this.style) 
                retval += this.style;
            return retval;
        },
        computed_css_class_label_textField(): string[] {
            let retval: string[] = [];
            if (this.labelClass)
                this.labelClass.split(" ").forEach(element => retval.push(element));
            else 
                retval.push("text-inverted");
            return retval;
        },

        computed_rules_validation_textField(): any[] {
            let retval: any[] = [this.method_validation_isNotEmpty];
            if (this.rules)
                this.rules.forEach(element => retval.push(element));
            return retval;
		},
    },
    methods: {
        method_validation_isNotEmpty(newValue: string): boolean | string {
			let retVal: boolean | string = false;
			// Checks for null & undefined
			if (newValue) {
				// Gets rid of whitespace
				let val = newValue.trim();

				// Checks the length
				retVal = val.length > 0 || "A value must be entered.";
			} else {
				retVal = "A value must be entered.";
			}
			return retVal;
		},
    }
});
</script>