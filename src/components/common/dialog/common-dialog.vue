<template>
	<v-dialog
		persistent
		transition="dialog-top-transition"
		:max-width="computed_data_css_maxWidth"
		:max-height="computed_data_css_maxHeight"
		v-model="dialog.show"
	>
		<v-card>
			<v-toolbar flat class="bg-accent">
				<h5 class="text-default" v-if="propsToolbarTitle">{{ propsToolbarTitle }}</h5>
				<v-spacer></v-spacer>
				<slot name="toolbar-buttons"></slot>
				<v-tooltip location="bottom" :text="dialog.toolbar.defaults.btn.close.tooltip">
					<template #activator="{ props }">
						<v-btn icon variant="flat" class="bg-transparent" v-bind="props">
							<v-icon class="text-default" :icon="dialog.toolbar.defaults.btn.close.icon"></v-icon>
						</v-btn>
					</template>
				</v-tooltip>
			</v-toolbar>
			<v-card-text style="border: 2px solid black">
				<v-container fluid>
					<slot name="dialog-content"></slot>
				</v-container>
			</v-card-text>
		</v-card>
	</v-dialog>
</template>

<script lang="ts">
import { defineComponent } from "vue";

// Stores
import useEventStore from "@stores/store-events.js";

// Icons
import { mdiClose } from "@constants/common/primitives/icons/common-constants-primative-icons.js";

export default defineComponent({
	name: "dialog-container-component",
	props: {
		propsToolbarTitle: { type: String, required: false },
	},
	data() {
		return {
			dialog: {
				show: true,
				toolbar: {
					defaults: {
						btn: {
							close: {
								icon: mdiClose,
								tooltip: "Close dialog",
							},
						},
					},
				},
			},
		};
	},
	computed: {
		computed_data_css_maxWidth(): string {
			let retVal: string = "80%";
			switch (this.$vuetify.display.name) {
				case "md":
				case "lg":
				case "xl":
				case "xxl":
					retVal = "50%";
					break;
			}
			return retVal;
		},
		computed_data_css_maxHeight(): string {
			return "80%";
		},
	},
	setup() {
		const storeEvent = useEventStore();
		return { storeEvent };
	},
});
</script>
