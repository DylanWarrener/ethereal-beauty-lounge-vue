<template>
    <v-text-field
        clearable
        :class="computed_css_class"
        :style="computed_css_style"
        :rules="computed_rules_validation"
    >
        <template #label>
            <span :class="computed_css_class_label" v-text="label"></span>
        </template>
        <template #clear>
            <v-icon></v-icon>
        </template>
        <template #append-inner v-if="appendInnerIcon && appendInnerIconColor">
            <v-icon 
                :icon="appendInnerIcon" 
                :color="appendInnerIconColor"
                @click="$emit('append-inner-click')"
            ></v-icon>
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
        rules: { type: Array, required: false },
        labelClass: { type: String, required: false },
        label: { type: String, required: true },
        appendInnerIcon: { type: String, required: false },
        appendInnerIconColor: { type: String, required: false, default: "inverted" },
    },
    computed: {
        computed_css_class(): string[] {
            let retval: string[] = ["w-100", "align-self-center"];
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
        computed_css_minWidth(): string {
            return "150px";
        },
        computed_css_class_label(): string[] {
            let retval: string[] = [];
            if (this.labelClass)
                this.labelClass.split(" ").forEach(element => retval.push(element));
            else 
                retval.push("text-inverted");
            return retval;
        },

        computed_rules_validation(): any[] {
            let retval: any[] = [this.method_validation_isNotEmpty];
            if (this.rules)
                this.rules.forEach(element => retval.push(element));
            return retval;
		}
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