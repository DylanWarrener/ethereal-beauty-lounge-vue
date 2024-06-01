<template>
	<v-dialog
		persistent
		transition="dialog-top-transition"
		:max-width="computed_data_css_maxWidth"
		:max-height="computed_data_css_maxHeight"
	>
		<v-card elevation="0">
			<v-toolbar flat class="px-2 bg-accent">
				<h5 class="text-default" v-if="toolbarTitle">{{ toolbarTitle }}</h5>
				<v-spacer></v-spacer>
				<slot name="card-toolbar-buttons"></slot>
				<v-tooltip location="bottom" :text="computed_tooltip_dialog_closeBtn_state">
					<template #activator="{ props }">
						<v-btn icon variant="flat" class="ma-0 bg-transparent" v-bind="props" @click="$emit('close')">
							<v-icon class="text-default" :icon="computed_icon_dialog_closeBtn_state"></v-icon>
						</v-btn>
					</template>
				</v-tooltip>
			</v-toolbar>
			<v-card-text>
				<v-container fluid>
					<slot name="card-content"></slot>
				</v-container>
			</v-card-text>
			<v-divider></v-divider>
			<v-card-actions class="pa-2">
				<slot name="card-actions"></slot>
			</v-card-actions>
		</v-card>
	</v-dialog>
</template>

<script lang="ts">
import { defineComponent } from "vue";

// Stores
import useEventStore from "@stores/store-events.js";
import useCommonStore from "@stores/store-common.js";

export default defineComponent({
	name: "dialog-container-component",
	props: {
		toolbarTitle: { type: String, required: false },
	},
	computed: {
		computed_icon_dialog_closeBtn_state(): string {
			return this.storeCommon.getDialog_default_btnClose_icon_state;
		},

		computed_tooltip_dialog_closeBtn_state(): string {
			return this.storeCommon.getDialog_default_btnClose_tooltip_state;
		},

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
		const storeCommon = useCommonStore();
		return { storeEvent, storeCommon };
	},
});
</script>
