<template>
	<v-container fluid tag="section" :id="containerId" :style="containerStyle" :class="containerClass">
		<v-row dense :style="rowStyle" :class="rowClass">
			<v-col cols="12" v-if="title" :style="columnTitleStyle" :class="columnTitleClass">
				<h2 :style="titleStyle" :class="titleClass">{{ title }}</h2>
			</v-col>
			<v-col cols="12" v-if="subtitle" :style="columnSubtitleStyle" :class="columnSubtitleClass">
				<h3 :style="subtitleStyle" :class="subtitleClass">{{ subtitle }}</h3>
			</v-col>
			<v-col cols="12" :style="columnContentStyle" :class="columnContentClass">
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
		containerId: { type: String, required: false },
		containerStyle: { type: String, required: false, default: "padding: 0 300px" },
		containerClass: { type: String, required: false },

		rowStyle: { type: String, required: false },
		rowClass: { type: String, required: false },

		columnTitleStyle: { type: String, required: false },
		columnTitleClass: { type: String, required: false },
		columnSubtitleStyle: { type: String, required: false },
		columnSubtitleClass: { type: String, required: false },
		columnContentStyle: { type: String, required: false },
		columnContentClass: { type: String, required: false },

		titleStyle: { type: String, required: false },
		titleClass: { type: String, required: false },
		title: { type: String, required: false },

		subtitleStyle: { type: String, required: false },
		subtitleClass: { type: String, required: false },
		subtitle: { type: String, required: false },
	},
});
</script>
