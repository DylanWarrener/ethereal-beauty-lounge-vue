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
			<v-img class="align-self-center" src="logo-transparent.png" width="128" height="128"></v-img>
			<h4 class="text-inverted">Log into Ethereal Beauty Lounge</h4>
			<v-container fluid style="border: 2px solid black">
				<v-row dense style="border: 2px solid red">
					<v-col cols="12" style="border: 2px solid black">
						<v-form class="w-100 d-flex flex-column justify-space-evenly" style="border: 2px solid red">
							<v-text-field variant="outlined" :label="data_dialogLogin.form.email.label"></v-text-field>
							<v-text-field 
								variant="outlined" 
								:label="data_dialogLogin.form.password.label"
								:append="data_dialogLogin.form.password.icon"
								@click:append="data_dialogLogin.form.password.show = !data_dialogLogin.form.password.show">
							</v-text-field>
						</v-form>
						<!--
							<v-form class="w-100 d-flex flex-column justify-space-evenly" style="border: 2px solid red">
							<v-text-field 
								variant="outlined" 
								:label="input.label" 
								:append-icon="input.icon !== null && input.show ? input.icon!.show : input.icon!.hide" 
								:key="index" 
								v-for="(input, index) in data_dialogLogin.form"
								@click:append="input.show !== null ? input.show = !input.show"
							></v-text-field>
						</v-form>
						-->
					</v-col>
					<v-col cols="12" style="border: 2px solid orange">
						<v-row dense style="border: 2px solid black">
							<v-col class="d-flex flex-column justify-center" style="border: 2px solid purple">
								<v-divider style="opacity: 1" color="accent"></v-divider>
							</v-col>
							<v-col cols="1" class="d-flex flex-column justify-center" style="border: 2px solid purple">
								<small class="text-center text-inverted">OR</small>
							</v-col>
							<v-col class="d-flex flex-column justify-center" style="border: 2px solid purple">
								<v-divider style="opacity: 1" color="accent"></v-divider>
							</v-col>
						</v-row>
					</v-col>
					<v-col
						cols="12"
						class="ga-4 d-flex flex-column justify-center align-center"
						style="border: 2px solid red"
					>
						<v-btn variant="outlined" class="bg-transparent" :key="index" v-for="(btn, index) in data_dialogLogin.btn">
							<v-icon class="mr-4">
								<template #default>
									<v-img :src="btn.icon"></v-img>
								</template>
							</v-icon>
							{{ btn.text }}
						</v-btn>
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
		</v-card>
	</v-dialog>
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

// Icons
import GoogleIcon from "@assets/svg/authentication/google.svg";
import { iconsFormPassword } from "@constants/common/objects/common-constants-objects.js";

export default defineComponent({
	name: "dialog-login-component",
	components: {
		"dialog-container-component": DialogContainerComp,
		"card-container-component": CardContainerComp,
		"button-container-component": BtnContainerComp,
	},
	data() {
		return {
			data_dialogLogin: {
				btn: {
					google: {
						text: "Continue with Google",
						icon: GoogleIcon
					}
				},
				form: {
					valid: null,
					email: {
						show: null,
						icon: null,
						label: "Email"
					},
					password: {
						show: false,
						icon: {
							show: iconsFormPassword.show,
							hide: iconsFormPassword.hide
						},
						label: "Password"
					}
				}
			},
		}
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
					.v-btn {
						border-color: rgb(var(--v-theme-inverted));

						.v-btn__content {
							color: rgb(var(--v-theme-inverted));
						}
					}

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
