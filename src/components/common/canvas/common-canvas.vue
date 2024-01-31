<template>
	<v-parallax class="parallax" :src="src">
		<v-container class="d-flex fill-height">
			<v-row>
				<v-col cols="12">
					<card-container-component class="rounded-shaped" title-class="text-h1">
						<template #card-title>{{ title }}</template>
					</card-container-component>
				</v-col>
			</v-row>
		</v-container>
	</v-parallax>
</template>

<script lang="ts">
import { defineComponent } from "vue";

// Components
import CardContainerComp from "@components/common/card/common-card.vue";

export default defineComponent({
	name: "canvas-container-component",
	components: {
		"card-container-component": CardContainerComp,
	},
	props: {
		src: { type: String, required: true },
		title: { type: String, required: true },
		subtitle: { type: String, required: false },
		btnID: { type: String, required: true },
		btnText: { type: String, required: true },
	},
});
</script>
