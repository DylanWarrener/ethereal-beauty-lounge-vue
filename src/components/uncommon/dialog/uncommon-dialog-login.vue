<template>
	<v-dialog
		persistent
		transition="dialog-top-transition"
		:max-width="dynamicMaxWidth_dialog"
		v-model="data_dialogAccountDrawerState"
	>
		<v-card style="border: 2px solid red">
			<v-toolbar color="accent">
				<v-spacer></v-spacer>
				<v-tooltip location="bottom" :text="tooltip_dialogCloseBtn">
					<template #activator="{ props: tooltip }">
						<button-container-component
							:id="id_dialogCloseBtn"
							:icon="icon_dialogCloseBtn"
							v-bind="tooltip"
							@click="data_dialogAccountDrawerState = !data_dialogAccountDrawerState"
						></button-container-component>
					</template>
				</v-tooltip>
			</v-toolbar>
			<v-container fluid style="border: 2px solid black">
				<v-row dense style="border: 2px solid red">
					<v-col
						cols="12"
						class="ga-4 d-flex flex-column justify-center align-center"
						style="border: 2px solid red"
					>
						<v-btn color="accent" height="50" :width="dynamicWidth_dialogBtn">Log in with google</v-btn>
						<v-btn color="accent" height="50" :width="dynamicWidth_dialogBtn">Log in with Email</v-btn>
						<!-- <v-form style="border: 2px solid orange">
							<v-text-field
								clearable
								variant="outlined"
								class="text-inverted"
								label="Email*"
							></v-text-field>
							<v-text-field
								clearable
								variant="outlined"
								class="text-inverted"
								label="Password*"
							></v-text-field>
						</v-form> -->
					</v-col>
				</v-row>
			</v-container>
			<template #actions>
				<v-btn color="accent">Log in with google</v-btn>
			</template>
		</v-card>
	</v-dialog>
</template>

<script lang="ts">
/*
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
*/
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

		/* CSS */
		dynamicMaxWidth_dialog(): string {
			let retVal: string = "";
			if (this.$vuetify.display.mdAndUp) retVal = "50%";
			return retVal;
		},
		dynamicWidth_dialogBtn(): string {
			let retVal: string = "200";
			if (this.$vuetify.display.mdAndUp) retVal = "250";
			if (this.$vuetify.display.lgAndUp) retVal = "300";
			return retVal;
		},
		dynamicHeight_dialogBtn(): string {
			let retVal: string = "50";
			return retVal;
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
		data_dialogAccountDrawerState: {
			get(): boolean {
				return this.storeHeader.getAppBarAccountDrawerState;
			},
			set(newValue: boolean): void {
				this.storeHeader.setAppBarAccountDrawerState(newValue);
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

<style lang="scss">
.v-dialog {
	.v-card {
		.v-container {
			.v-row {
				.v-col {
					.v-form {
						.v-input {
							.v-input__control {
								.v-field {
									.v-field__field {
										.v-label {
											color: rgb(var(--v-theme-inverted));
										}
									}
								}
							}
						}
					}
				}
			}
		}
	}
}
</style>
