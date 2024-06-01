<template>
	<v-card elevation="0" class="h-100 bg-accent">
		<v-container fluid>
			<v-row dense>
				<!-- Title -->
				<v-col cols="12">
					<h4 v-text="security.title"></h4>
				</v-col>

				<!-- Security info -->
				<v-col cols="12" class="d-flex align-center">
					<v-text-field
						readonly
						disabled
						variant="outlined"
						:label="security.input.accountID.label"
						:model-value="computed_data_userID"
					></v-text-field>
				</v-col>
				<v-col cols="12" md="6" class="d-flex align-center">
					<v-switch readonly disabled color="default">
						<template v-slot:label>
							<span class="text-default" v-text="security.input.switch.twoFactorAuth.label"></span>
						</template>
					</v-switch>
				</v-col>
				<v-col cols="12" md="6" class="d-flex align-center">
					<v-switch readonly disabled color="default" v-model="computed_data_hasUserVerifiedEmail">
						<template v-slot:label>
							<span class="text-default" v-text="security.input.switch.emailVerified.label"></span>
						</template>
					</v-switch>
				</v-col>
				<v-col cols="12" md="6" class="d-flex align-center">
					<v-switch readonly disabled color="default" v-model="computed_data_isUserAnonymous">
						<template v-slot:label>
							<span class="text-default" v-text="security.input.switch.anonymous.label"></span>
						</template>
					</v-switch>
				</v-col>
			</v-row>
		</v-container>
		<v-card-actions class="pa-4">
			<v-spacer></v-spacer>
			<v-btn class="px-4" variant="outlined" style="min-width: 100px" @click="computed_data_dialog_confirmDeleteAccount_show_state = true">
				<template #default>
					<small class="text-default" v-text="security.actions.btn.deleteAccount.text"></small>
				</template>
			</v-btn>
		</v-card-actions>
	</v-card>

	<dialog-delete-confirmation-container-component
		toolbar-title="Delete account"
		v-model="computed_data_dialog_confirmDeleteAccount_show_state"
		@close="computed_data_dialog_confirmDeleteAccount_show_state = false"
		@ok="method_event_deleteAccount_clickHandler"
	></dialog-delete-confirmation-container-component>
</template>

<script lang="ts">
import { defineComponent } from "vue";

// Stores
import useFirebaseStore from "@stores/store-firebase.js";
import useCommonStore from "@stores/store-common.js";

// Component
import DialogDeleteConfirmationContainerComp from "@components/common/dialog/delete/confirmation/common-dialog-delete-confirmation.vue";

export default defineComponent({
	name: "uncommon-account-security-component",
	components: {
		"dialog-delete-confirmation-container-component": DialogDeleteConfirmationContainerComp,
	},
	data() {
		return {
			security: {
				title: "Security",
				input: {
					switch: {
						emailVerified: {
							label: "Email verified",
						},
						twoFactorAuth: {
							label: "Enabled two-factor authentication",
						},
						anonymous: {
							label: "Anonymous user",
						},
					},
					accountID: {
						label: "Account ID",
					},
				},
				actions: {
					btn: {
						deleteAccount: {
							text: "Delete account",
						},
						save: {
							text: "Save",
						},
					},
				},
			},
		};
	},
	computed: {
		computed_css_btnWidth(): string {
			return `min-width: 100px`;
		},

		computed_data_userID(): string | null {
			return this.storeFirebase.get_userAuth_id_state;
		},
		computed_data_timeout_value(): number {
			return this.storeCommon.getSnackbar_timeout_state;
		},
		computed_data_hasUserVerifiedEmail: {
			get(): boolean {
				return this.storeFirebase.get_userAuth_emailIsVerified_state;
			},
			set(newValue: boolean): void {
				this.storeFirebase.set_userAuth_emailIsVerified_state(newValue);
			},
		},
		computed_data_isUserAnonymous: {
			get(): boolean {
				return this.storeFirebase.get_userAuth_isAnonymous_state;
			},
			set(newValue: boolean): void {
				this.storeFirebase.set_userAuth_isAnonymous_state(newValue);
			},
		},
		computed_data_dialog_confirmDeleteAccount_show_state: {
			get(): boolean {
				return this.storeCommon.getDialog_accountSecurity_deleteAccount_show_state;
			},
			set(newValue: boolean): void {
				this.storeCommon.setDialog_accountSecurity_deleteAccount_show_state(newValue);
			},
		},
	},
	methods: {
		method_event_deleteAccount_clickHandler(): void {
			this.storeFirebase
				.delete_userAuth()
				.then(() => {
					this.storeCommon.setSnackbar_success_state(
						"Sucessfully deleted account. Thank you for being a member. We are sorry to see you leave."
					);
					setTimeout(() => {
						this.computed_data_dialog_confirmDeleteAccount_show_state = false;
					}, this.computed_data_timeout_value);
				})
				.catch((errorMessage: string) => this.storeCommon.setSnackbar_error_state(errorMessage))
				.finally(() => {
					this.computed_data_dialog_confirmDeleteAccount_show_state = false;
					setTimeout(() => {
						this.storeCommon.setSnackbar_reset_state();
					}, this.computed_data_timeout_value);
				});
		},
	},
	setup() {
		const storeFirebase = useFirebaseStore();
		const storeCommon = useCommonStore();
		return { storeFirebase, storeCommon };
	},
});
</script>
