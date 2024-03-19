<template>
	<v-container fluid tag="section" :class="classContainer" :style="styleContainer">
		<v-row dense :class="classRow" :style="styleRow">
			<v-col cols="12" v-if="title" :class="classColTitle" :style="styleColTitle">
				<h2 :class="classTitle" :style="styleTitle">{{ title }}</h2>
			</v-col>
			<v-col cols="12" v-if="subtitle" :class="classSubtitle" :style="styleSubtitle">
				<h3 :class="classSubtitle" :style="styleSubtitle">{{ subtitle }}</h3>
			</v-col>
			<v-col cols="12" :class="classContent" :style="styleContent">
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
		classRow: { type: String, required: false },
		classColTitle: { type: String, required: false },
		classTitle: { type: String, required: false },
		classColSubtitle: { type: String, required: false },
		classSubtitle: { type: String, required: false },
		classContent: { type: String, required: false },

		styleContainer: { type: String, required: false },
		styleRow: { type: String, required: false },
		styleColTitle: { type: String, required: false },
		styleTitle: { type: String, required: false },
		styleColSubtitle: { type: String, required: false },
		styleSubtitle: { type: String, required: false },
		styleContent: { type: String, required: false },

		title: { type: String, required: false },
		subtitle: { type: String, required: false },
	},
});
</script>
