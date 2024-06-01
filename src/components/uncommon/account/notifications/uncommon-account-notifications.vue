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
					<v-switch color="default">
						<template v-slot:label>
							<span class="text-default" v-text="notifications.input.switch.treatmentUpdates.label"></span>
						</template>
					</v-switch>
				</v-col>
				<v-col cols="12" md="6">
					<v-switch color="default">
						<template v-slot:label>
							<span class="text-default" v-text="notifications.input.switch.storeUpdates.label"></span>
						</template>
					</v-switch>
				</v-col>
				<v-col cols="12" md="6">
					<v-switch color="default">
						<template v-slot:label>
							<span class="text-default" v-text="notifications.input.switch.promotionUpdates.label"></span>
						</template>
					</v-switch>
				</v-col>
				<v-col cols="12" md="6">
					<v-switch color="default">
						<template v-slot:label>
							<span class="text-default" v-text="notifications.input.switch.unsubscribeToAll.label"></span>
						</template>
					</v-switch>
				</v-col>
			</v-row>
		</v-container>
		<v-card-actions class="pa-4">
			<v-spacer></v-spacer>
			<v-btn variant="outlined" v-text="notifications.actions.btn.save.text"></v-btn>
		</v-card-actions>
	</v-card>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
	name: "uncommon-account-notifications-component",
	data() {
		return {
			notifications: {
				title: "Notifications",
				subtitles: {
					emailPreferences: "Email preferences"
				},
				input: {
					switch: {
						treatmentUpdates: {
							label: "Enable treatment updates",
							isEnabled: true
						},
						storeUpdates: {
							label: "Enable product/store updates",
							isEnabled: true
						},
						promotionUpdates: {
							label: "Enable promotions",
							isEnabled: true
						},
						unsubscribeToAll: {
							label: "Unsubscribe to all",
							isEnabled: false
						}
					}
				},
				actions: {
					btn: {
						save: {
							text: "Save",
						},
					},
				},
			}
		}
	},
	computed: {
		computed_data_notifications_treatments_isEnabled_local: {
			get(): boolean {
				return this.notifications.input.switch.treatmentUpdates.isEnabled;
			},
			set(newValue: boolean): void {
				this.notifications.input.switch.treatmentUpdates.isEnabled = newValue;
			},
		},
		computed_data_notifications_store_isEnabled_local: {
			get(): boolean {
				return this.notifications.input.switch.storeUpdates.isEnabled;
			},
			set(newValue: boolean): void {
				this.notifications.input.switch.storeUpdates.isEnabled = newValue;
			},
		},
		computed_data_notifications_promotions_isEnabled_local: {
			get(): boolean {
				return this.notifications.input.switch.promotionUpdates.isEnabled;
			},
			set(newValue: boolean): void {
				this.notifications.input.switch.promotionUpdates.isEnabled = newValue;
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
	}
});
</script>
