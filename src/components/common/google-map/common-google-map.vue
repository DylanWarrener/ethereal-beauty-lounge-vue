<template>
	<section-container-component id="section-google-maps" class_title="text-inverted" title="Our office location">
		<template #section-content>
			<v-container fluid class="text-inverted" style="border: 4px solid black">
				<v-row dense style="border: 4px solid red">
					<v-col cols="12" style="border: 4px solid blue"></v-col>
				</v-row>
			</v-container>
		</template>
	</section-container-component>
</template>

<script lang="ts">
import { defineComponent } from "vue";

// Components
import SectionContainerComp from "@components/common/section/common-section.vue";

export default defineComponent({
	name: "google-maps-office-location-component",
	components: {
		"section-container-component": SectionContainerComp,
	},
});
</script>
