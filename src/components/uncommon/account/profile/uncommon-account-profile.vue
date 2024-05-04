<template>
	<v-card elevation="0" class="h-100 bg-accent">
		<v-container fluid>
			<v-row dense>
				<!-- Title -->
				<v-col cols="12">
					<h3 v-text="profile.title"></h3>
				</v-col>

				<!-- Avatar -->
				<v-col cols="12" md="4" class="d-flex flex-column justify-center align-center">
					<v-hover>
						<template v-slot:default="{ isHovering, props }">
							<div class="h-100" style="position: relative" v-bind="props">
								<v-card
									hover
									class="rounded-circle d-flex justify-center align-center"
									:style="isHovering ? 'background-color: rgba(0, 0, 0, 0.75)' : ''"
									:image="computed_data_user_photoURL"
									width="150"
									height="150"
								>
									<span
										class="text-inverted text-h3"
										style="cursor: pointer"
										v-show="!isHovering"
										v-text="computed_data_user_initials"
									></span>
									<v-expand-transition>
										<div
											class="w-100 h-100 d-flex justify-center align-center rounded-circle"
											style="position: absolute"
											v-show="isHovering"
										>
											<v-tooltip location="bottom" :text="profile.icon.editImage.tooltip">
												<template v-slot:activator="{ props }">
													<v-btn
														variant="flat"
														class="bg-transparent"
														:icon="computed_icon_editImage"
														v-bind="props"
														v-show="isHovering"
													>
														<template v-slot:default>
															<v-icon size="32"></v-icon>
														</template>
													</v-btn>
												</template>
											</v-tooltip>
										</div>
									</v-expand-transition>
								</v-card>
							</div>
						</template>
					</v-hover>
				</v-col>

				<!-- Profile info -->
				<v-col cols="12" md="8">
					<v-row dense>
						<v-col cols="12" sm="6" md="4" class="d-flex justify-center align-center">
							<v-text-field
								clearable
								variant="outlined"
								:label="profile.input.displayName.label"
								v-model="computed_data_user_displayName_local"
							></v-text-field>
						</v-col>
						<v-col cols="12" sm="6" md="4" class="d-flex justify-center align-center">
							<v-text-field
								clearable
								variant="outlined"
								:label="profile.input.firstname.label"
								v-model="computed_data_user_firstname_local"
							></v-text-field>
						</v-col>
						<v-col cols="12" sm="6" md="4" class="d-flex justify-center align-center">
							<v-text-field
								clearable
								variant="outlined"
								:label="profile.input.lastname.label"
								v-model="computed_data_user_lastname_local"
							></v-text-field>
						</v-col>
						<v-col cols="12" sm="6" md="6" class="d-flex justify-center">
							<v-text-field
								clearable
								variant="outlined"
								:label="profile.input.email.label"
								v-model="computed_data_user_email_local"
							></v-text-field>
						</v-col>
						<v-col cols="12" sm="6" md="6" class="d-flex justify-center">
							<v-text-field
								clearable
								variant="outlined"
								:label="profile.input.phoneNumber.label"
								v-model="computed_data_user_phoneNumber_local"
							></v-text-field>
						</v-col>
					</v-row>
				</v-col>
			</v-row>
		</v-container>
		<v-card-actions class="pa-4">
			<v-spacer></v-spacer>
			<v-btn
				variant="outlined"
				class="px-4"
				:style="computed_css_btnWidth"
				:disabled="computed_data_doesAccountDataMatchState"
				@click.stop="method_event_saveProfileSettingsHandler"
			>
				<template #default>
					<small class="text-default" v-text="profile.actions.btn.save.text"></small>
				</template>
			</v-btn>
		</v-card-actions>
	</v-card>
</template>

<script lang="ts">
import { defineComponent } from "vue";

// Stores
import useFirebaseStore from "@stores/store-firebase.js";

// Declarations
import { IAccountProfileData } from "@declarations/common/account/profile/common-interface-account-profile.js";

// Icons
import { iconsAccountProfile } from "@constants/common/objects/common-constants-objects.js";

// IMGs
import CanvasPNG from "@assets/jpg/temp.jpg";

export default defineComponent({
	name: "uncommon-account-profile-component",
	data(): IAccountProfileData {
		return {
			profile: {
				title: "Profile",
				icon: {
					editImage: {
						tooltip: "Edit profile picture",
					},
				},
				input: {
					displayName: {
						label: "Display name",
						value: null,
					},
					firstname: {
						label: "First name",
						value: null,
					},
					lastname: {
						label: "Last name",
						value: null,
					},
					email: {
						label: "Email",
						value: null,
					},
					phoneNumber: {
						label: "Phone number",
						value: null,
					},
				},
				actions: {
					btn: {
						save: {
							text: "Save",
						},
					},
				},
			},
		};
	},
	computed: {
		computed_icon_editImage(): string {
			return iconsAccountProfile.editImage;
		},

		computed_img_canvas(): string {
			return CanvasPNG;
		},

		computed_css_btnWidth(): string {
			return `min-width: 100px`;
		},

		computed_data_user_photoURL(): string | undefined {
			return this.storeFirebase.getUserPhotoURL ?? undefined;
		},
		computed_data_user_initials(): string | null {
			let retval: string | null = null;
			if (this.computed_data_user_displayName_state !== null) {
				const [firstname, lastname] = this.computed_data_user_displayName_state.split(" ");
				retval = `${firstname[0]}${lastname[0]}`.toUpperCase();
			}
			return retval;
		},
		computed_data_doesAccountDataMatchState(): boolean {
			return (
				this.computed_data_doesDisplayNameLocal_matchState &&
				this.computed_data_doesFirstnameLocal_matchState &&
				this.computed_data_doesLastnameLocal_matchState &&
				this.computed_data_doesEmailLocal_matchState &&
				this.computed_data_doesPhoneNumberLocal_matchState
			);
		},
		computed_data_doesDisplayNameLocal_matchState(): boolean {
			return this.computed_data_user_displayName_local === this.computed_data_user_displayName_state;
		},
		computed_data_doesFirstnameLocal_matchState(): boolean {
			return this.computed_data_user_firstname_local === this.computed_data_user_firstname_state;
		},
		computed_data_doesLastnameLocal_matchState(): boolean {
			return this.computed_data_user_lastname_local === this.computed_data_user_lastname_state;
		},
		computed_data_doesEmailLocal_matchState(): boolean {
			return this.computed_data_user_email_local === this.computed_data_user_email_state;
		},
		computed_data_doesPhoneNumberLocal_matchState(): boolean {
			return this.computed_data_user_phoneNumber_local === this.computed_data_user_phoneNumber_state;
		},
		computed_data_user_displayName_local: {
			get(): string | null {
				return this.profile.input.displayName.value;
			},
			set(newValue: string | null): void {
				this.profile.input.displayName.value = newValue;
			},
		},
		computed_data_user_firstname_local: {
			get(): string | null {
				return this.profile.input.firstname.value;
			},
			set(newValue: string | null): void {
				this.profile.input.firstname.value = newValue;
			},
		},
		computed_data_user_lastname_local: {
			get(): string | null {
				return this.profile.input.lastname.value;
			},
			set(newValue: string | null): void {
				this.profile.input.lastname.value = newValue;
			},
		},
		computed_data_user_email_local: {
			get(): string | null {
				return this.profile.input.email.value;
			},
			set(newValue: string | null): void {
				this.profile.input.email.value = newValue;
			},
		},
		computed_data_user_phoneNumber_local: {
			get(): string | null {
				return this.profile.input.phoneNumber.value;
			},
			set(newValue: string | null): void {
				this.profile.input.phoneNumber.value = newValue;
			},
		},
		computed_data_user_displayName_state: {
			get(): string | null {
				return this.storeFirebase.getUserDisplayName;
			},
			set(newValue: string | null): void {
				this.storeFirebase.setUserDisplayName({ displayName: newValue });
			},
		},
		computed_data_user_firstname_state: {
			get(): string | null {
				return this.storeFirebase.getUserFirstname;
			},
			set(newValue: string | null): void {
				this.storeFirebase.setUserFirstname({ firstname: newValue });
			},
		},
		computed_data_user_lastname_state: {
			get(): string | null {
				return this.storeFirebase.getUserLastname;
			},
			set(newValue: string | null): void {
				this.storeFirebase.setUserLastname({ lastname: newValue });
			},
		},
		computed_data_user_email_state: {
			get(): string | null {
				return this.storeFirebase.getUserEmail;
			},
			set(newValue: string | null): void {
				this.storeFirebase.setUserEmail({ email: newValue });
			},
		},
		computed_data_user_phoneNumber_state: {
			get(): string | null {
				return this.storeFirebase.getUserPhoneNumber;
			},
			set(newValue: string | null): void {
				this.storeFirebase.setUserPhoneNumber({ phoneNumber: newValue });
			},
		},
	},
	methods: {
		method_event_saveProfileSettingsHandler(): void {
			const displayName: boolean = this.computed_data_doesDisplayNameLocal_matchState;
			const firstname: boolean = this.computed_data_doesFirstnameLocal_matchState;
			const lastname: boolean = this.computed_data_doesLastnameLocal_matchState;
			const email: boolean = this.computed_data_doesEmailLocal_matchState;
			const phoneNumber: boolean = this.computed_data_doesPhoneNumberLocal_matchState;

			if (displayName) {
			}

			if (firstname && lastname) {
			} else {
				if (firstname) {
				}

				if (lastname) {
				}
			}

			if (email) {
			}

			if (phoneNumber) {
			}
		},
	},
	setup() {
		const storeFirebase = useFirebaseStore();
		return { storeFirebase };
	},
});
</script>
