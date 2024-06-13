<template>
	<v-card class="d-flex flex-column" :style="cardStyle" :class="computed_css_cardClass">
		<v-container
			fluid
			class="h-100 d-flex flex-column"
			style="border: 4px solid red"
			:class="containerClass"
			:style="containerStyle"
		>
			<!-- Toolbar -->
			<v-row :class="toolbarRowClass" :style="toolbarRowStyle" v-if="method_event_slotIsPopulated('card-toolbar')">
				<slot name="card-toolbar"></slot>
			</v-row>

			<!-- Images -->
			<v-row :class="imageRowClass" :style="imageRowStyle" v-if="method_event_slotIsPopulated('card-img')">
				<slot name="card-img"></slot>
			</v-row>

			<!-- Headings -->
			<v-row
				style="border: 4px solid green"
				:class="headingRowClass"
				:style="headingRowStyle"
				v-if="method_event_slotIsPopulated('card-headings')"
			>
				<slot name="card-headings"></slot>
			</v-row>

			<!-- Content -->
			<v-row
				style="border: 4px solid green"
				:class="contentRowClass"
				:style="contentRowStyle"
				v-if="method_event_slotIsPopulated('card-content')"
			>
				<slot name="card-content"></slot>
			</v-row>

			<!-- Actions -->
			<v-row
				style="border: 4px solid green"
				:class="actionRowClass"
				:style="actionRowStyle"
				v-if="method_event_slotIsPopulated('card-actions')"
			>
				<v-col
					cols="12"
					class="pa-0 flex-row align-center"
					style="border: 4px solid blue"
					:class="actionColClass"
					:style="actionColStyle"
				>
					<v-card-actions class="pa-1">
						<slot name="card-actions"></slot>
					</v-card-actions>
				</v-col>
			</v-row>
		</v-container>
	</v-card>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
	name: "card-container-component",
	props: {
		/* Card */
		isHovering: { type: Boolean, required: false },
		cardClass: { type: String, required: false },
		cardStyle: { type: String, required: false },

		/* Card container */
		containerClass: { type: String, required: false },
		containerStyle: { type: String, required: false },

		/* Card toolbar */
		toolbarRowClass: { type: String, required: false },
		toolbarRowStyle: { type: String, required: false },

		/* Card images */
		imageRowClass: { type: String, required: false },
		imageRowStyle: { type: String, required: false },

		/* Card headings */
		headingRowClass: { type: String, required: false },
		headingRowStyle: { type: String, required: false },

		/* Card content */
		contentRowClass: { type: String, required: false },
		contentRowStyle: { type: String, required: false },

		/* Card actions */
		actionRowClass: { type: String, required: false },
		actionRowStyle: { type: String, required: false },
		actionColClass: { type: String, required: false },
		actionColStyle: { type: String, required: false },
	},
	computed: {
		computed_css_cardClass(): { "on-hover"?: boolean; "text-default"?: boolean } {
			let retval: { "on-hover"?: boolean; "text-default"?: boolean } = {};
			if (this.isHovering) retval["on-hover"] = this.isHovering;
			if (this.cardClass !== undefined) retval["text-default"] = !!this.cardClass;
			return retval;
		},
	},
	methods: {
		method_event_slotIsPopulated(slotName: string): boolean {
			return this.$slots[slotName] !== undefined;
		},
	},
});
</script>
