<template>
	<v-dialog transition="dialog-top-transition" :max-width="maxWidth" v-model="dialogDrawer">
		<v-card>
			<v-toolbar color="accent">
				<img-container-component style-container="width: 200px"></img-container-component>
				<v-spacer></v-spacer>
				<slot name="toolbar-items"></slot>
				<tooltip-container-component
					location="bottom"
					:id="id_dialogCloseBtn"
					:icon="icon_dialogCloseBtn"
					:tooltip="tooltip_dialogCloseBtn"
					:tooltip-state="tooltipState"
					@toggle-tooltip-drawer="toggleDrawer"
				></tooltip-container-component>
			</v-toolbar>
			<v-card-text style="border: 2px solid red">
				<v-container style="border: 2px solid blue">
					<v-row dense class="ga-4" style="border: 2px solid green">
						<slot name="content"></slot>
					</v-row>
				</v-container>
			</v-card-text>
		</v-card>
	</v-dialog>
</template>

<script lang="ts">
import { defineComponent } from "vue";

// Stores
import { useCommonStore } from "@plugins/pinia/pinia.js";

// Components
import ImgComp from "@components/common/img/common-img.vue";
import TooltipComp from "@components/common/tooltip/common-tooltip.vue";

// Interfaces
import { IDialogDefaultState } from "@declarations/common/dialog/interfaces/common-interface-dialog.js";

// Enums
import { ElementIDs } from "@enums/enums.js";

export default defineComponent({
	name: "dialog-component",
	components: {
		"img-container-component": ImgComp,
		"tooltip-container-component": TooltipComp,
	},
	props: {
		maxWidth: { type: String, required: false, default: "50vw" },
		dialogState: { type: Boolean, required: true },
		tooltipState: { type: Boolean, required: true },
	},
	data() {
		return {
			dialogDrawer: false,
		};
	},
	computed: {
		/* Text */
		// IDs
		id_dialogCloseBtn(): string {
			return ElementIDs.DIALOG_LOGIN_CLOSE_BTN;
		},
		// Tooltips
		tooltip_dialogCloseBtn(): string {
			return this.data_dialogDefaultState.icons.close.tooltip;
		},

		/* Icons */
		icon_dialogCloseBtn(): string {
			return this.data_dialogDefaultState.icons.close.icon;
		},

		/* Data */
		// Read only
		data_dialogDefaultState(): IDialogDefaultState {
			return this.storeCommon.getDialogDefaultState;
		},
	},
	methods: {
		toggleDrawer(): void {
			debugger;
			this.$emit("toggle-drawer");
		},
	},
	watch: {
		dialogState(): void {
			this.dialogDrawer = this.dialogState;
		},
	},
	setup() {
		const storeCommon = useCommonStore();
		return { storeCommon };
	},
});
</script>
