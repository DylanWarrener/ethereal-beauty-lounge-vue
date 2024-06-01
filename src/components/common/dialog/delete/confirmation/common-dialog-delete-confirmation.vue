<template>
	<dialog-container-component :toolbar-title="toolbarTitle" @close="$emit('close')">
		<template #card-content>
			<v-row dense>
				<v-col>Are you sure you want to delete?</v-col>
			</v-row>
		</template>
		<template #card-actions>
			<v-spacer></v-spacer>
			<v-btn class="bg-accent" variant="flat" text="Ok" :style="computed_css_btnWidth" @click="$emit('ok')"></v-btn>
		</template>
	</dialog-container-component>
</template>

<script lang="ts">
import { defineComponent } from "vue";

// Components
import DialogContainerComp from "@components/common/dialog/common-dialog.vue";

export default defineComponent({
	name: "dialog-delete-confirmation-container-component",
	components: {
		"dialog-container-component": DialogContainerComp,
	},
	props: {
		toolbarTitle: { type: String, required: true },
	},
	computed: {
		computed_css_btnWidth(): string {
			return `min-width: 100px`;
		},
	},
});
</script>
