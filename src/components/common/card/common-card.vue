<template>
	<v-card style="border: 2px solid black">
		<!-- Header -->
		<slot name="card-header"></slot>
		<slot name="card-img"></slot>
		<slot name="card-other"></slot>
		<v-card-item class="pa-4" style="border: 2px solid red">
			<!-- Title -->
			<v-card-title class="text-center font-weight-bold" :class="titleClass" style="border: 2px solid green">
				<slot name="card-title"></slot>
			</v-card-title>

			<!-- Subtitle -->
			<v-card-subtitle class="d-flex pa-2 text-wrap" :class="subtitleClass" style="border: 2px solid blue">
				<slot name="card-subtitle"></slot>
			</v-card-subtitle>
		</v-card-item>

		<!-- Content -->
		<v-card-text class="pa-4" :class="contentClass" style="border: 2px solid red">
			<slot name="card-content"></slot>
		</v-card-text>

		<!-- Actions -->
		<v-card-actions class="pa-4" style="border: 2px solid red" :class="actionClass">
			<slot name="card-actions"></slot>
		</v-card-actions>
	</v-card>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
	name: "card-container-component",
	props: {
		cardClass: { type: String, required: false },
		titleClass: { type: String, required: false },
		subtitleClass: { type: String, required: false },
		contentClass: { type: String, required: false },
		actionClass: { type: String, required: false },
		actionBtnClass: { type: String, required: false },
		actionBtnColor: { type: String, required: false },
		cardStyle: { type: String, required: false },
		title: { type: String, required: false },
		subtitle: { type: String, required: false },
		text: { type: String, required: false },
	},
});
</script>
