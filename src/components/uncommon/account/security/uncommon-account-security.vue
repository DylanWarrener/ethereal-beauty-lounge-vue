<template>
	<v-card elevation="0" class="h-100 bg-accent" style="border: 2px solid green">
		<v-container fluid style="border: 2px solid black">
			<v-row dense style="border: 2px solid red">
				<!-- Title -->
				<v-col cols="12" style="border: 2px solid orange">
					<h3 v-text="security.title"></h3>
				</v-col>

				<v-col cols="12" class="d-flex align-center" style="border: 2px solid orange">
					<v-text-field
						readonly
						variant="outlined"
						:label="security.input.accountID.label"
						:style="computed_data_dynamicWidth_input"
						:model-value="computed_data_userID"
					></v-text-field>
				</v-col>
				<v-col cols="12" class="d-flex align-center" style="border: 2px solid orange">
					<v-switch density="compact" color="default">
						<template v-slot:label>
							<span class="text-default" v-text="security.input.twoFactorAuth.label"></span>
						</template>
					</v-switch>
				</v-col>
			</v-row>
		</v-container>
		<v-card-actions class="pa-4">
			<v-spacer></v-spacer>
			<v-btn variant="outlined" @click="">
				<template #default>
					<small class="text-default" v-text="security.actions.btn.deleteAccount.text"></small>
				</template>
			</v-btn>
			<v-btn variant="outlined" @click="">
				<template #default>
					<small class="text-default" v-text="security.actions.btn.save.text"></small>
				</template>
			</v-btn>
		</v-card-actions>
		{{ temp_user_data }}
	</v-card>
</template>

<script lang="ts">
import { defineComponent } from "vue";

// Stores
import useFirebaseStore from "@stores/store-firebase.js";

export default defineComponent({
	name: "uncommon-account-security-component",
	data() {
		return {
			security: {
				title: "Security",
				input: {
					accountID: {
						label: "Account ID",
					},
					twoFactorAuth: {
						label: "Enable two-factor authentication",
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
		computed_data_dynamicWidth_input(): string {
			let retVal: string = "width: 100%; max-width: 400px";
			return retVal;
		},
		computed_data_userID(): string | null {
			return this.storeFirebase.getUserID;
		},

		temp_user_data() {
			return this.storeFirebase.getUserData;
		},
	},
	setup() {
		const storeFirebase = useFirebaseStore();
		return { storeFirebase };
	},
});
</script>
