<template>
	<dialog-container-component
		:dialog-state="data_dialogLoginBtnCloseDrawerState"
		:tooltip-state="data_dialogLoginBtnCloseTooltipDrawerState"
		@toggle-drawer="toggleDrawer"
	>
		<template #content>
			<v-col cols="12" style="border: 2px solid black">
				<h1 class="text-center">Log in to Ethereal Beauty Lounge</h1>
				<p class="text-center">
					Sign in with Google or Email, to save your preferences; including health forms, bank details and
					more.
				</p>
			</v-col>
			<v-col cols="12" class="d-flex justify-space-evenly" style="border: 2px solid yellow">
				<v-btn class="bg-blue" variant="text" color="accent">Log in with Google</v-btn>
				<v-btn class="bg-blue" variant="text" color="accent">Log in with Email</v-btn>
			</v-col>
		</template>
	</dialog-container-component>
</template>

<script lang="ts">
import { defineComponent } from "vue";

// Stores
import { useCommonStore } from "@plugins/pinia/pinia.js";

// Components
import DialogContainerComp from "@components/common/dialog/common-dialog.vue";

// Interfaces
import { IDialogLoginState } from "@declarations/common/dialog/interfaces/common-interface-dialog.js";

export default defineComponent({
	name: "dialog-component",
	components: {
		"dialog-container-component": DialogContainerComp,
	},
	computed: {
		/* Data */
		// Read only
		data_dialogLogin(): IDialogLoginState {
			return this.storeCommon.getDialogLoginState;
		},
		data_dialogLoginBtnCloseDrawerState(): boolean {
			return this.data_dialogLogin.showDialog;
		},
		// Read & Write
		data_dialogLoginBtnCloseTooltipDrawerState(): boolean {
			return this.storeCommon.getDialogLoginBtnCloseTooltipDrawerState;
		},
	},
	methods: {
		toggleDrawer(): void {
			debugger;
			this.storeCommon.setDialogLoginBtnCloseDrawerState(this.data_dialogLoginBtnCloseDrawerState);
		},
	},
	setup() {
		const storeCommon = useCommonStore();
		return { storeCommon };
	},
});
</script>
