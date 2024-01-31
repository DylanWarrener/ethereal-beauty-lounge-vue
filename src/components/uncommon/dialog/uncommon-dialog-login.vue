<template>
	<dialog-container-component :dialog-state="data_dialogLoginDrawerState">
		<template #dialog-content>
			<card-container-component title-class="text-h2">
				<template #card-header>
					<v-toolbar color="accent" style="position: sticky; z-index: 1">
						<v-spacer></v-spacer>
						<v-tooltip location="bottom" :text="tooltip_dialogCloseBtn">
							<template #activator="{ props: tooltip }">
								<button-container-component
									:id="id_dialogCloseBtn"
									:icon="icon_dialogCloseBtn"
									v-bind="tooltip"
									@click="data_dialogLoginDrawerState = !data_dialogLoginDrawerState"
								></button-container-component>
							</template>
						</v-tooltip>
					</v-toolbar>
				</template>
				<template #card-title>Log In</template>
				<template #card-subtitle
					>Sign in with Google or Email, to save your preferences; including health forms, bank details and
					more.</template
				>
				<template #card-content>
					<v-btn class="bg-blue" variant="text" color="accent">Log in with Google</v-btn>
					<v-btn class="bg-blue" variant="text" color="accent">Log in with Email</v-btn>
				</template>
			</card-container-component>
		</template>
	</dialog-container-component>
</template>

<script lang="ts">
import { defineComponent } from "vue";

// Stores
import { useCommonStore } from "@plugins/pinia/pinia.js";
import useHeaderStore from "@stores/store-header.js";

// Components
import DialogContainerComp from "@components/common/dialog/common-dialog.vue";
import CardContainerComp from "@components/common/card/common-card.vue";
import BtnContainerComp from "@components/common/button/common-btn.vue";

// Interfaces
import {
	IDialogDefaultState,
	IDialogLoginState,
} from "@declarations/common/dialog/interfaces/common-interface-dialog.js";

// Enums
import { ElementIDs } from "@enums/enums.js";

export default defineComponent({
	name: "dialog-component",
	components: {
		"dialog-container-component": DialogContainerComp,
		"card-container-component": CardContainerComp,
		"button-container-component": BtnContainerComp,
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
		data_dialogLogin(): IDialogLoginState {
			return this.storeCommon.getDialogLoginState;
		},
		// Read & Write
		data_dialogLoginDrawerState: {
			get(): boolean {
				return this.storeHeader.getAppBarLoginDrawerState;
			},
			set(newValue: boolean): void {
				this.storeHeader.setAppBarLoginDrawerState(newValue);
			},
		},
	},
	setup() {
		const storeCommon = useCommonStore();
		const storeHeader = useHeaderStore();
		return { storeCommon, storeHeader };
	},
});
</script>
