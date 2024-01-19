<template>
	<v-card>
		<!-- Header -->
		<slot name="header"></slot>

		<slot name="img"></slot>
		<slot name="other"></slot>
		<v-card-item class="pa-4" v-if="title || subtitle">
			<!-- Title -->
			<v-card-title class="pa-2 text-wrap" :class="titleClass">
				<slot name="title">
					<h1>{{ title }}</h1>
				</slot>
			</v-card-title>

			<!-- Subtitle -->
			<v-card-subtitle class="pa-2 text-wrap" :class="subtitleClass">
				<slot name="subtitle">
					<h3>{{ subtitle }}</h3>
				</slot>
			</v-card-subtitle>
		</v-card-item>

		<!-- Content -->
		<v-card-text class="pa-0" :class="contentClass">
			<slot name="content"></slot>
		</v-card-text>

		<!-- Actions -->
		<v-card-actions class="pa-4 d-flex" :class="actionClass" v-if="btnText">
			<slot name="actions">
				<v-btn
					variant="outlined"
					size="large"
					min-width="200"
					:id="actionBtnId"
					:class="actionBtnClass"
					:color="actionBtnColor"
					:text="btnText"
					@click="scrollTo"
				></v-btn>
			</slot>
		</v-card-actions>
	</v-card>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
	name: "dialog-component",
	props: {
		cardClass: { type: String, required: false, default: "bg-background-secondary" },
		titleClass: { type: String, required: false },
		subtitleClass: { type: String, required: false },
		contentClass: { type: String, required: false },
		actionClass: { type: String, required: false, default: "justify-end" },
		actionBtnId: { type: String, required: true },
		actionBtnClass: { type: String, required: false },
		actionBtnColor: { type: String, required: false },
		cardStyle: { type: String, required: false },
		title: { type: String, required: false },
		subtitle: { type: String, required: false },
		text: { type: String, required: false },
		btnText: { type: String, required: false },
	},
});
</script>
