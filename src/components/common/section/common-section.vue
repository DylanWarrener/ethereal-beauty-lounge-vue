<template>
	<v-container fluid style="border: 2px solid red">
		<v-row dense style="border: 2px solid green">
			<v-col cols="12" style="border: 2px solid blue">
				<h2 style="border: 2px solid purple" :class="class_title">{{ title }}</h2>
			</v-col>
			<v-col cols="12" style="border: 2px solid black">
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
		class_title: { type: String, required: false },
		title: { type: String, required: true },
	},
});
</script>
