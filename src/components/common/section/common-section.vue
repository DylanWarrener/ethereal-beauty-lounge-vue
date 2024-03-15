<template>
	<v-container fluid tag="section" :class="classContainer" :stye="styleContainer">
		<v-row dense>
			<v-col cols="12" v-if="title">
				<h2 :class="class_title">{{ title }}</h2>
			</v-col>
			<v-col cols="12" v-if="subtitle">
				<h3 :class="class_subtitle">{{ subtitle }}</h3>
			</v-col>
			<v-col cols="12">
				<slot name="section-content"></slot>
			</v-col>
		</v-row>
	</v-container>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
	name: "section-container-component",
	props: {
		classContainer: { type: String, required: false },
		class_title: { type: String, required: false },
		class_subtitle: { type: String, required: false },
		styleContainer: { type: String, required: false },
		title: { type: String, required: false },
		subtitle: { type: String, required: false },
	},
});
</script>
