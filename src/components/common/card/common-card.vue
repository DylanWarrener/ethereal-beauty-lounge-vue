<template>
	<v-card :class="computed_css_cardClass" :style="computed_css_cardStyle">
		<slot name="card-information"></slot>
		<slot name="card-img"></slot>
		<slot name="card-toolbar"></slot>
		<slot name="card-headings">
			<h1 
				:class="computed_css_cardTitleClass" 
				:style="computed_css_cardTitleStyle" 
				v-text="cardTitle" 
				v-if="cardTitle"
			></h1>
			<h2 
				:class="computed_css_cardSubtitleClass" 
				:style="computed_css_cardSubtitleStyle" 
				v-text="cardSubtitle" 
				v-if="cardSubtitle"
			></h2>
		</slot>
		<v-card-text 
			:class="computed_css_cardContentClass" 
			:style="computed_css_cardContentStyle" 
			v-if="method_event_slotIsPopulated('card-content')">
			<v-container 
				fluid 
				:class="computed_css_cardContentContainerClass" 
				:style="computed_css_cardContentContainerStyle">
				<!-- Content -->
				<v-row
					dense
					:class="computed_css_cardContentContainerRowClass" 
					:style="computed_css_cardContentContainerRowStyle"
					v-if="method_event_slotIsPopulated('card-content')"
				>
					<slot name="card-content"></slot>
				</v-row>
			</v-container>
		</v-card-text>
		<v-divider v-if="method_event_slotIsPopulated('card-content')"></v-divider>
		<v-card-actions 
			:class="computed_css_cardActionsClass" 
			:style="computed_css_cardActionsStyle" 
			v-if="method_event_slotIsPopulated('card-actions')">
			<slot name="card-actions"></slot>
		</v-card-actions>
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
		cardTitle: { type: String, required: false },
		cardSubtitle: { type: String, required: false },

		// Title
		cardTitleClass: { type: String, required: false },
		cardTitleStyle: { type: String, required: false },
		// Subtitle
		cardSubtitleClass: { type: String, required: false },
		cardSubtitleStyle: { type: String, required: false },

		/* Card content */
		cardContentClass: { type: String, required: false },
		cardContentStyle: { type: String, required: false },
		// Container
		cardContentContainerClass: { type: String, required: false },
		cardContentContainerStyle: { type: String, required: false },
		// Row
		cardContentContainerRowClass: { type: String, required: false },
		cardContentContainerRowStyle: { type: String, required: false },

		/* Card actions */
		cardActionsClass: { type: String, required: false },
		cardActionsStyle: { type: String, required: false },
	},
	computed: {
		computed_css_cardClass(): string[] {
			let retval: string[] = ["d-flex", "flex-column"];
			if (this.cardClass) {
				retval = [];
				this.cardClass.split(" ").forEach(element => retval.push(element));
			}
			if (this.isHovering) 	
				retval.push("on-hover");
			return retval;
		},
		computed_css_cardStyle(): string {
			let retval: string = "";
			if (this.cardStyle) 
				retval += this.cardStyle;
			return retval;
		},
		computed_css_cardTitleClass(): string[] {
			let retval: string[] = ["text-default", "text-uppercase"];
			if (this.cardTitleClass) {
				retval = [];
				this.cardTitleClass.split(" ").forEach(element => retval.push(element));
			}
			return retval;
		},
		computed_css_cardTitleStyle(): string {
			let retval: string = "";
			if (this.cardTitleStyle)
				retval += this.cardTitleStyle;
			return retval;
		},
		computed_css_cardSubtitleClass(): string[] {
			let retval: string[] = ["text-default"];
			if (this.cardSubtitleClass) {
				retval = [];
				this.cardSubtitleClass.split(" ").forEach(element => retval.push(element));
			}
			return retval;
		},
		computed_css_cardSubtitleStyle(): string {
			let retval: string = "";
			if (this.cardSubtitleStyle) 
				retval += this.cardSubtitleStyle;
			return retval;
		},
		computed_css_cardContentClass(): string[] {
			let retval: string[] = ["pa-0"];
			if (this.cardContentClass)
				this.cardContentClass.split(" ").forEach(element => retval.push(element));
			return retval;
		},
		computed_css_cardContentStyle(): string {
			let retval: string = "";
			if (this.cardContentStyle) 
				retval += this.cardContentStyle;
			return retval;
		},
		computed_css_cardContentContainerClass(): string[] {
			let retval: string[] = ["pa-2", "h-100", "d-flex", "flex-column", "overflow-x-hidden", "overflow-y-auto"];
			if (this.cardContentContainerClass)
				this.cardContentContainerClass.split(" ").forEach(element => retval.push(element));
			return retval;
		},
		computed_css_cardContentContainerStyle(): string {
			let retval: string = "";
			if (this.cardContentContainerStyle) 
				retval += this.cardContentContainerStyle;
			return retval;
		},
		computed_css_cardContentContainerRowClass(): string[] {
			let retval: string[] = ["flex-shrink-1", "flex-grow-1"];
			if (this.cardContentContainerRowClass) {
				retval = [];
				this.cardContentContainerRowClass.split(" ").forEach(element => retval.push(element));
			}
			return retval;
		},
		computed_css_cardContentContainerRowStyle(): string {
			let retval: string = "";
			if (this.cardContentContainerRowStyle) 
				retval += this.cardContentContainerRowStyle;
			return retval;
		},
		computed_css_cardActionsClass(): string[] {
			let retval: string[] = ["w-100", "pa-2"];
			if (this.cardActionsClass)
				this.cardActionsClass.split(" ").forEach(element => retval.push(element));
			return retval;
		},
		computed_css_cardActionsStyle(): string {
			let retval: string = "";
			if (this.cardActionsStyle) 
				retval += this.cardActionsStyle;
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
