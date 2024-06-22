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
			style="border: 2px solid orange" 
			:class="computed_css_cardContentClass" 
			:style="computed_css_cardContentStyle" 
			v-if="method_event_slotIsPopulated('card-content')">
			<v-container 
				fluid 
				class="pa-0 d-flex flex-column"		
				style="border: 10px solid black" 
				:class="computed_css_cardContentContainerClass" 
				:style="computed_css_cardContentContainerStyle"
				>
				<!-- Content -->
				<v-row
					dense
					style="border: 4px solid red"
					:class="computed_css_cardContentContainerRowClass" 
					:style="computed_css_cardContentContainerRowStyle"
					v-if="method_event_slotIsPopulated('card-content')"
				>
					<slot name="card-content"></slot>
				</v-row>
			</v-container>
		</v-card-text>
		<v-card-actions 
			class="w-100 pa-2"
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
			if (this.cardClass !== undefined) {
				retval = [];
				const cardClassList = this.cardClass.split(" ");
				retval.push(...cardClassList);
			}
			if (this.isHovering) retval.push("on-hover");
			return retval;
		},
		computed_css_cardStyle(): string {
			let retval: string = "";
			if (this.cardStyle !== undefined) retval += this.cardStyle;
			return retval;
		},
		computed_css_cardTitleClass(): string[] {
			let retval: string[] = ["text-default", "text-h1"];
			if (this.cardTitleClass !== undefined) {
				retval = [];
				const cardTitleClassList = this.cardTitleClass.split(" ");
				retval.push(...cardTitleClassList);
			}
			return retval;
		},
		computed_css_cardTitleStyle(): string {
			let retval: string = "";
			if (this.cardTitleStyle !== undefined) retval += this.cardTitleStyle;
			return retval;
		},
		computed_css_cardSubtitleClass(): string[] {
			let retval: string[] = ["text-default"];
			if (this.cardSubtitleClass !== undefined) {
				retval = [];
				const cardSubtitleClassList = this.cardSubtitleClass.split(" ");
				retval.push(...cardSubtitleClassList);
			}
			return retval;
		},
		computed_css_cardSubtitleStyle(): string {
			let retval: string = "";
			if (this.cardSubtitleStyle !== undefined) retval += this.cardSubtitleStyle;
			return retval;
		},
		computed_css_cardContentClass(): string[] {
			let retval: string[] = [];
			if (this.cardContentClass !== undefined) {
				const cardContentClassList = this.cardContentClass.split(" ");
				retval.push(...cardContentClassList);
			}
			return retval;
		},
		computed_css_cardContentStyle(): string {
			let retval: string = "";
			if (this.cardContentStyle !== undefined) retval += this.cardContentStyle;
			return retval;
		},
		computed_css_cardContentContainerClass(): string[] {
			let retval: string[] = [];
			if (this.cardContentContainerClass !== undefined) {
				const cardContentContainerClassList = this.cardContentContainerClass.split(" ");
				retval.push(...cardContentContainerClassList);
			}
			return retval;
		},
		computed_css_cardContentContainerStyle(): string {
			let retval: string = "";
			if (this.cardContentContainerStyle !== undefined) retval += this.cardContentContainerStyle;
			return retval;
		},
		computed_css_cardContentContainerRowClass(): string[] {
			let retval: string[] = ["flex-shrink-1", "flex-grow-1"];
			if (this.cardContentContainerRowClass !== undefined) {
				retval = [];
				const cardContentContainerRowClassList = this.cardContentContainerRowClass.split(" ");
				retval.push(...cardContentContainerRowClassList);
			}
			return retval;
		},
		computed_css_cardContentContainerRowStyle(): string {
			let retval: string = "";
			if (this.cardContentContainerRowStyle !== undefined) retval += this.cardContentContainerRowStyle;
			return retval;
		},
		computed_css_cardActionsClass(): string[] {
			let retval: string[] = [];
			if (this.cardActionsClass !== undefined) {
				const cardActionsClassList = this.cardActionsClass.split(" ");
				retval.push(...cardActionsClassList);
			}
			return retval;
		},
		computed_css_cardActionsStyle(): string {
			let retval: string = "";
			if (this.cardActionsStyle !== undefined) retval += this.cardActionsStyle;
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
