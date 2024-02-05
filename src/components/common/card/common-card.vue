<template>
	<v-card>
		<!-- Header -->
		<slot name="card-header"></slot>
		<slot name="card-img"></slot>
		<slot name="card-other"></slot>

		<!-- Headings -->
		<slot name="card-headings"></slot>

		<!-- Content -->
		<slot name="card-content"></slot>

		<!-- Actions -->
		<slot name="card-actions"></slot>
	</v-card>
</template>

<script lang="ts">
/*
<v-card-item class="pa-4" style="border: 2px solid red">	
	<v-card-title class="text-center text-wrap" :class="titleClass" style="border: 2px solid green">
		<slot name="card-title">
			<h1>{{ title }}</h1>
		</slot>
	</v-card-title>
	<v-card-subtitle class="d-flex pa-2 text-wrap" :class="subtitleClass" style="border: 2px solid blue">
		<slot name="card-subtitle"></slot>
	</v-card-subtitle>
</v-card-item>
*/
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
