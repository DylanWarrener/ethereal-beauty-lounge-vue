<template>
	<v-card elevation="0" class="h-100 bg-accent">
		<v-container fluid>
			<v-row dense>
				<!-- Title -->
				<v-col cols="12">
					<h4 v-text="notifications.title"></h4>
				</v-col>

				<!-- Email preferences subtitle -->
				<v-col cols="12">
					<h5 class="pa-0 text-left" v-text="notifications.subtitles.emailPreferences"></h5>
				</v-col>
				<!-- Security info -->
				<v-col cols="12" md="6">
					<v-switch color="default" v-model="computed_data_notifications_treatments_isEnabled_local">
						<template v-slot:label>
							<span class="text-default" v-text="notifications.input.switch.treatment.label"></span>
						</template>
					</v-switch>
				</v-col>
				<v-col cols="12" md="6">
					<v-switch color="default" v-model="computed_data_notifications_store_isEnabled_local">
						<template v-slot:label>
							<span class="text-default" v-text="notifications.input.switch.store.label"></span>
						</template>
					</v-switch>
				</v-col>
				<v-col cols="12" md="6">
					<v-switch color="default" v-model="computed_data_notifications_promotions_isEnabled_local">
						<template v-slot:label>
							<span class="text-default" v-text="notifications.input.switch.promotion.label"></span>
						</template>
					</v-switch>
				</v-col>
				<v-col cols="12" md="6">
					<v-switch color="default" v-model="computed_data_notifications_unsubscribeToAll_isEnabled_local">
						<template v-slot:label>
							<span class="text-default" v-text="notifications.input.switch.unsubscribeToAll.label"></span>
						</template>
					</v-switch>
				</v-col>
			</v-row>
		</v-container>
		<v-card-actions class="pa-4">
			<v-spacer></v-spacer>
			<v-btn variant="outlined" class="px-4" style="min-width: 100px" @click="method_event_saveSettings_clickHandler">
				<template #default>
					<small class="text-default" v-text="notifications.actions.btn.save.text"></small>
				</template>
			</v-btn>
		</v-card-actions>
		{{ local_data }}
		<br />
		{{ state_data }}
	</v-card>
</template>

<script lang="ts">
import { defineComponent } from "vue";

// Stores
import useFirebaseStore from "@stores/store-firebase.js";
import useCommonStore from "@stores/store-common.js";

export default defineComponent({
	name: "uncommon-account-notifications-component",
	data() {
		return {
			notifications: {
				title: "Notifications",
				subtitles: {
					emailPreferences: "Email preferences",
				},
				input: {
					switch: {
						treatment: {
							label: "Enable treatment updates",
							isEnabled: true,
						},
						store: {
							label: "Enable product/store updates",
							isEnabled: true,
						},
						promotion: {
							label: "Enable promotions",
							isEnabled: true,
						},
						unsubscribeToAll: {
							label: "Unsubscribe to all",
							isEnabled: false,
						},
					},
				},
				actions: {
					btn: {
						save: {
							text: "Save",
							isLoading: false,
						},
					},
				},
			},
		};
	},
	computed: {
		computed_data_doesTreatmentsLocal_matchState(): boolean {
			return (
				this.computed_data_notifications_treatments_isEnabled_local ===
				this.computed_data_notifications_treatments_isEnabled_state
			);
		},
		computed_data_doesStoreLocal_matchState(): boolean {
			return (
				this.computed_data_notifications_store_isEnabled_local ===
				this.computed_data_notifications_store_isEnabled_state
			);
		},
		computed_data_doesPromotionsLocal_matchState(): boolean {
			return (
				this.computed_data_notifications_promotions_isEnabled_local ===
				this.computed_data_notifications_promotions_isEnabled_state
			);
		},
		computed_data_doesUnsubscribeToAllLocal_matchState(): boolean {
			return (
				this.computed_data_notifications_unsubscribeToAll_isEnabled_local ===
				this.computed_data_notifications_unsubscribeToAll_isEnabled_state
			);
		},
		computed_data_notifications_treatments_isEnabled_local: {
			get(): boolean {
				return this.notifications.input.switch.treatment.isEnabled;
			},
			set(newValue: boolean): void {
				this.notifications.input.switch.treatment.isEnabled = newValue;
			},
		},
		computed_data_notifications_store_isEnabled_local: {
			get(): boolean {
				return this.notifications.input.switch.store.isEnabled;
			},
			set(newValue: boolean): void {
				this.notifications.input.switch.store.isEnabled = newValue;
			},
		},
		computed_data_notifications_promotions_isEnabled_local: {
			get(): boolean {
				return this.notifications.input.switch.promotion.isEnabled;
			},
			set(newValue: boolean): void {
				this.notifications.input.switch.promotion.isEnabled = newValue;
			},
		},
		computed_data_notifications_unsubscribeToAll_isEnabled_local: {
			get(): boolean {
				return this.notifications.input.switch.unsubscribeToAll.isEnabled;
			},
			set(newValue: boolean): void {
				this.notifications.input.switch.unsubscribeToAll.isEnabled = newValue;
			},
		},
		computed_data_notifications_treatments_isEnabled_state: {
			get(): boolean {
				return this.storeFirebase.get_userNotifications_treatments_isEnabled_state;
			},
			set(newValue: boolean): void {
				this.storeFirebase.set_userNotifications_treatments_isEnabled_state(newValue);
			},
		},
		computed_data_notifications_store_isEnabled_state: {
			get(): boolean {
				return this.storeFirebase.get_userNotifications_store_isEnabled_state;
			},
			set(newValue: boolean): void {
				this.storeFirebase.set_userNotifications_store_isEnabled_state(newValue);
			},
		},
		computed_data_notifications_promotions_isEnabled_state: {
			get(): boolean {
				return this.storeFirebase.get_userNotifications_promotions_isEnabled_state;
			},
			set(newValue: boolean): void {
				this.storeFirebase.set_userNotifications_promotions_isEnabled_state(newValue);
			},
		},
		computed_data_notifications_unsubscribeToAll_isEnabled_state: {
			get(): boolean {
				return this.storeFirebase.get_userNotifications_unsubscribeToAll_isEnabled_state;
			},
			set(newValue: boolean): void {
				this.storeFirebase.set_userNotifications_unsubscribeToAll_isEnabled_state(newValue);
			},
		},

		local_data(): any {
			return {};
		},
		state_data(): any {
			return this.storeFirebase.get_userNotifications_state;
		},
	},
	methods: {
		method_event_saveSettings_clickHandler(): void {
			this.notifications.actions.btn.save.isLoading = true;
			this.method_utils_matchLocalDataToStateAndUploadIfRequired()
				.then(() =>
					this.storeCommon.setSnackbar_success_state("Successfully saved your account notification settings.")
				)
				.catch((errorMessage: string) => this.storeCommon.setSnackbar_error_state(errorMessage))
				.finally(() => {
					setTimeout(() => {
						this.storeCommon.setSnackbar_reset_state();
						this.notifications.actions.btn.save.isLoading = false;
					}, this.storeCommon.getSnackbar_timeout_state);
				});
		},

		method_utils_matchLocalDataToStateAndUploadIfRequired(): Promise<void> {
			return new Promise((resolve, reject) => {
				let treatments_isEnabled_local: boolean = this.computed_data_notifications_treatments_isEnabled_local!;
				let treatments_isEnabled_state: boolean = this.computed_data_notifications_treatments_isEnabled_state!;
				let store_isEnabled_local: boolean = this.computed_data_notifications_store_isEnabled_local!;
				let store_isEnabled_state: boolean = this.computed_data_notifications_store_isEnabled_state!;
				let promotions_isEnabled_local: boolean = this.computed_data_notifications_promotions_isEnabled_local!;
				let promotions_isEnabled_state: boolean = this.computed_data_notifications_promotions_isEnabled_state!;
				let unsubscribeToAll_isEnabled_local: boolean =
					this.computed_data_notifications_unsubscribeToAll_isEnabled_local!;
				let unsubscribeToAll_isEnabled_state: boolean =
					this.computed_data_notifications_unsubscribeToAll_isEnabled_state!;

				if (!this.computed_data_doesTreatmentsLocal_matchState) {
					treatments_isEnabled_state = treatments_isEnabled_local;
				}

				if (!this.computed_data_doesStoreLocal_matchState) {
					store_isEnabled_state = store_isEnabled_local;
				}

				if (!this.computed_data_doesPromotionsLocal_matchState) {
					promotions_isEnabled_state = promotions_isEnabled_local;
				}

				if (!this.computed_data_doesUnsubscribeToAllLocal_matchState) {
					unsubscribeToAll_isEnabled_state = unsubscribeToAll_isEnabled_local;
				}

				resolve();
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
