<template>
	<v-dialog 
		persistent 
		transition="dialog-top-transition"
		:width="computed_css_dialog_width"
		:max-height="computed_css_dialog_maxHeight">
		<container-card 
			card-content-class="overflow-hidden" 
			card-actions-class="bg-accent"
			:card-content-style="computed_css_dialog_card_content_style">
			<template #card-toolbar>
				<v-toolbar flat class="px-2 bg-accent">
					<h5 class="text-default text-capitalize" v-if="toolbarTitle">{{ toolbarTitle }}</h5>
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
				<v-col cols="12" class="pa-0" :style="cardContentStyle">
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
		width: { type: String, required: false },
		minHeight: { type: String, required: false },
		maxHeight: { type: String, required: false },
		image: { type: String, required: false },
		cardContentStyle: { type: String, required: false }
	},
	computed: {
		computed_icon_dialog_closeBtn_state(): string {
			return this.storeCommon.getDialog_default_btnClose_icon_state;
		},

		computed_tooltip_dialog_closeBtn_state(): string {
			return this.storeCommon.getDialog_default_btnClose_tooltip_state;
		},

		computed_css_dialog_width(): string {
			let retval: string = "";
			switch (this.$vuetify.display.name) {
				case "xs":
				case "sm":
					retval = "80%";
					break;
				case "md":
				case "lg":
				case "xl":
				case "xxl":
					retval = this.width ? this.width : "60%";
					break;
			}
			return retval;
		},
		computed_css_dialog_maxHeight(): string {
			let retval: string = "";
			switch (this.$vuetify.display.name) {
				case "xs":
				case "sm":
					retval = "80%";
					break;
				case "md":
				case "lg":
				case "xl":
				case "xxl":
					retval = this.maxHeight ? this.maxHeight : "60%";
					break;
			}
			return retval;
		},
		computed_css_dialog_card_content_style(): string {
			return `height: 300px; background-image: url(${this.image}); background-size: cover; background-position: center;`;
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

<style lang="scss">
.dialog-enter-active,
.dialog-leave-active {
	transition: opacity 0.3s ease-in-out;
	opacity: 1;
}
.dialog-enter-from,
.component-leave-to {
	opacity: 0;
}
</style>
