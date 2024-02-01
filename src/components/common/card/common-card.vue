<template>
	<v-card style="border: 2px solid black">
		<!-- Header -->
		<slot name="card-header"></slot>
		<slot name="card-img"></slot>
		<slot name="card-other"></slot>
		<v-card-item class="pa-4" style="border: 2px solid red">
			<!-- Title -->
			<v-card-title class="text-center font-weight-bold" :tag="tag_cardTitle" :class="titleClass" style="border: 2px solid green">
				<slot name="card-title"></slot>
			</v-card-title>

			<!-- Subtitle -->
			<v-card-subtitle class="d-flex pa-2 text-wrap" :tag="tag_cardSubtitle" :class="subtitleClass" style="border: 2px solid blue">
				<slot name="card-subtitle"></slot>
			</v-card-subtitle>
		</v-card-item>

		<!-- Content -->
		<v-card-text :class="contentClass" style="border: 2px solid red">
			<v-container style="border: 2px solid blue">
				<v-row class="d-flex justify-space-evenly" dense style="border: 2px solid green">
					<slot name="card-content"></slot>
				</v-row>
			</v-container>
		</v-card-text>

		<!-- Actions -->
		<v-card-actions class="pa-4 d-flex" style="border: 2px solid black" :class="actionClass">
			<slot name="card-actions"></slot>
		</v-card-actions>
	</v-card>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
	name: 'card-container-component',
	props: {
		cardClass: { type: String, required: false, default: 'bg-background-secondary' },
		titleClass: { type: String, required: false },
		subtitleClass: { type: String, required: false },
		contentClass: { type: String, required: false },
		actionClass: { type: String, required: false, default: 'justify-end' },
		actionBtnClass: { type: String, required: false },
		actionBtnColor: { type: String, required: false },
		cardStyle: { type: String, required: false },
		title: { type: String, required: false },
		subtitle: { type: String, required: false },
		text: { type: String, required: false },
	},
	computed: {
		/* Text */
		tag_cardTitle(): string {
			let retVal: string = '';
			if (this.titleClass) {
				const [type, heading]: string[] = this.titleClass.split('-');
				retVal = heading;
			}
			return retVal;
		},
		tag_cardSubtitle(): string {
			let retVal: string = '';
			if (this.subtitleClass) {
				const [type, heading]: string[] = this.subtitleClass.split('-');
				retVal = heading;
			} else {
				retVal = 'p';
			}
			return retVal;
		},
	},
});
</script>
