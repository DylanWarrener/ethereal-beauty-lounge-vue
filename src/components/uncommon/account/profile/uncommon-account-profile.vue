<template>
	<v-card elevation="0" class="h-100 bg-accent">
		<v-container fluid class="pa-0">
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
								:style="computed_data_dynamicWidth_input"
								:model-value="computed_data_userDisplayName"
							></v-text-field>
						</v-col>
						<v-col cols="12" sm="6" md="4" class="d-flex justify-center align-center">
							<v-text-field
								clearable
								variant="outlined"
								:label="profile.input.firstname.label"
								:style="computed_data_dynamicWidth_input"
								:model-value="computed_data_userFirstname"
							></v-text-field>
						</v-col>
						<v-col cols="12" sm="6" md="4" class="d-flex justify-center align-center">
							<v-text-field
								clearable
								variant="outlined"
								:label="profile.input.lastname.label"
								:style="computed_data_dynamicWidth_input"
								:model-value="computed_data_userLastname"
							></v-text-field>
						</v-col>
						<v-col cols="12" sm="6" md="6" class="d-flex justify-center">
							<v-text-field
								clearable
								variant="outlined"
								:label="profile.input.email.label"
								:style="computed_data_dynamicWidth_input"
								:model-value="computed_data_userEmail"
							></v-text-field>
						</v-col>
						<v-col cols="12" sm="6" md="6" class="d-flex justify-center">
							<v-text-field
								clearable
								variant="outlined"
								:label="profile.input.phoneNumber.label"
								:style="computed_data_dynamicWidth_input"
								:model-value="computed_data_userPhoneNumber"
							></v-text-field>
						</v-col>
					</v-row>
				</v-col>
			</v-row>
		</v-container>
		<v-card-actions class="pa-4">
			<v-spacer></v-spacer>
			<v-btn variant="outlined">
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

// Icons
import { iconsAccountProfile } from "@constants/common/objects/common-constants-objects.js";

// IMGs
import CanvasPNG from "@assets/jpg/temp.jpg";

export default defineComponent({
	name: "uncommon-account-profile-component",
	data() {
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
					},
					firstname: {
						label: "First name",
					},
					lastname: {
						label: "Last name",
					},
					email: {
						label: "Email",
					},
					phoneNumber: {
						label: "Phone number",
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
		computed_data_dynamicWidth_input(): string {
			let retVal: string = "width: 100%; max-width: 400px";
			return retVal;
		},
		computed_data_user_photoURL(): string | undefined {
			return this.storeFirebase.getUserPhotoURL ?? undefined;
		},
		computed_data_user_initials(): string | null {
			let retval: string | null = null;
			if (this.computed_data_userDisplayName !== null) {
				const [firstname, lastname] = this.computed_data_userDisplayName.split(" ");
				retval = `${firstname[0]}${lastname[0]}`.toUpperCase();
			}
			return retval;
		},
		// computed_data_userDisplayName(): string | null {
		// 	return this.storeFirebase.getUserDisplayName ?? "No data";
		// },
		// computed_data_userFirstname(): string | null {
		// 	return this.storeFirebase.getUserFirstname ?? "No data";
		// },
		// computed_data_userLastname(): string | null {
		// 	return this.storeFirebase.getUserLastname ?? "No data";
		// },
		// computed_data_userEmail(): string | null {
		// 	return this.storeFirebase.getUserEmail ?? "No data";
		// },
		// computed_data_userPhoneNumber(): string | null {
		// 	return this.storeFirebase.getUserPhoneNumber ?? "No data";
		// },

		computed_data_userDisplayName: {
			get(): string {
				return this.storeFirebase.getUserDisplayName ?? "No data";
			},
			set(newValue: string | null): void {
				this.storeFirebase.setUserDisplayName({ displayName: newValue });
			},
		},
		computed_data_userFirstname: {
			get(): string {
				return this.storeFirebase.getUserFirstname ?? "No data";
			},
			set(newValue: string | null): void {
				this.storeFirebase.setUserFirstname({ firstname: newValue });
			},
		},
		computed_data_userLastname: {
			get(): string {
				return this.storeFirebase.getUserLastname ?? "No data";
			},
			set(newValue: string | null): void {
				this.storeFirebase.setUserLastname({ lastname: newValue });
			},
		},
		computed_data_userEmail: {
			get(): string {
				return this.storeFirebase.getUserEmail ?? "No data";
			},
			set(newValue: string | null): void {
				this.storeFirebase.setUserEmail({ email: newValue });
			},
		},
		computed_data_userPhoneNumber: {
			get(): string {
				return this.storeFirebase.getUserPhoneNumber ?? "No data";
			},
			set(newValue: string | null): void {
				this.storeFirebase.setUserPhoneNumber({ phoneNumber: newValue });
			},
		},
	},
	setup() {
		const storeFirebase = useFirebaseStore();
		return { storeFirebase };
	},
});
</script>
