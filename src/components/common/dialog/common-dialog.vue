<template>
	<v-dialog
		persistent
		transition="dialog-top-transition"
		:max-width="computed_css_maxWidth"
		:max-height="computed_css_maxHeight"
	>
		<common-card-container-component elevation="0">
			<template #card-toolbar>
				<v-col cols="12">
					<v-toolbar flat class="px-2 bg-accent">
						<h5 class="text-default" v-if="toolbarTitle">{{ toolbarTitle }}</h5>
						<v-spacer></v-spacer>
						<slot name="card-toolbar-buttons"></slot>
						<v-tooltip location="bottom" :text="computed_tooltip_dialog_closeBtn_state">
							<template #activator="{ props }">
								<v-btn
									icon
									variant="flat"
									class="ma-0 bg-transparent"
									v-bind="props"
									@click="$emit('close')"
								>
									<v-icon class="text-default" :icon="computed_icon_dialog_closeBtn_state"></v-icon>
								</v-btn>
							</template>
						</v-tooltip>
					</v-toolbar>
				</v-col>
			</template>
			<template #card-content>
				<v-col cols="12">
					<slot name="dialog-card-content"></slot>
				</v-col>
			</template>
			<v-divider></v-divider>
			<template #card-actions>
				<slot name="dialog-card-actions"></slot>
			</template>
		</common-card-container-component>
	</v-dialog>
</template>

<script lang="ts">
import { defineComponent } from "vue";

// Stores
import useEventStore from "@stores/store-events.js";
import useCommonStore from "@stores/store-common.js";

// Components
import CardContainerComp from "@components/common/card/common-card.vue";

export default defineComponent({
	name: "dialog-container-component",
	components: {
		"common-card-container-component": CardContainerComp,
	},
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
				case "md":
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
	setup() {
		const storeEvent = useEventStore();
		const storeCommon = useCommonStore();
		return { storeEvent, storeCommon };
	},
});
</script>
