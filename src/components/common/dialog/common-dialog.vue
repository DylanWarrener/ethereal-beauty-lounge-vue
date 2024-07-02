<template>
	<v-dialog
		persistent
		transition="dialog-top-transition"
		:max-width="computed_css_maxWidth"
		:max-height="computed_css_maxHeight"
	>
		<container-card>
			<template #card-toolbar>
				<v-toolbar flat class="px-2 bg-accent">
					<h5 class="text-default" v-if="toolbarTitle">{{ toolbarTitle }}</h5>
					<v-spacer></v-spacer>
					<slot name="card-toolbar-buttons"></slot>
					<v-tooltip location="bottom" :text="computed_tooltip_dialog_closeBtn_state">
						<template #activator="{ props }">
							<container-btn
								variant="flat"
								class="ma-0 bg-transparent"
								:icon="computed_icon_dialog_closeBtn_state"
								v-bind="props"
								@click="$emit('close')"
							></container-btn>
						</template>
					</v-tooltip>
				</v-toolbar>
			</template>
			<template #card-content v-if="method_event_slotIsPopulated('dialog-card-content')">
				<v-col cols="12">
					<slot name="dialog-card-content"></slot>
				</v-col>
			</template>
			<v-divider></v-divider>
			<template #card-actions v-if="method_event_slotIsPopulated('dialog-card-actions')">
				<slot name="dialog-card-actions"></slot>
			</template>
		</container-card>
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

		computed_css_maxWidth(): string {
			let retVal: string = "80%";
			switch (this.$vuetify.display.name) {
				case "lg":
				case "xl":
				case "xxl":
					retVal = "50%";
					break;
			}
			return retVal;
		},
		computed_css_maxHeight(): string {
			return "80%";
		},
	},
	methods: {
		method_event_slotIsPopulated(slotName: string): boolean {
			return this.$slots[slotName] !== undefined;
		},
	},
	setup() {
		const storeEvent = useEventStore();
		const storeCommon = useCommonStore();
		return { storeEvent, storeCommon };
	},
});
</script>
