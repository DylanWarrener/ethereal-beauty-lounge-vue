<template>
	<v-card elevation="0" class="h-100 bg-accent" v-if="computed_data_isUserLoggedIn">
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
															<v-icon
																size="32"
																@click="method_event_changeAvatarPicture_clickHandler"
															></v-icon>
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
								type="text"
								:label="profile.input.textField.displayName.label"
								:rules="computed_data_validation_displayNameRules"
								v-model="computed_data_user_displayName_local"
							></v-text-field>
						</v-col>
						<v-col cols="12" sm="6" md="4" class="d-flex justify-center align-center">
							<v-text-field
								clearable
								variant="outlined"
								type="text"
								:label="profile.input.textField.firstname.label"
								:rules="computed_data_validation_nameRules"
								v-model="computed_data_user_firstname_local"
							></v-text-field>
						</v-col>
						<v-col cols="12" sm="6" md="4" class="d-flex justify-center align-center">
							<v-text-field
								clearable
								variant="outlined"
								type="text"
								:label="profile.input.textField.lastname.label"
								:rules="computed_data_validation_nameRules"
								v-model="computed_data_user_lastname_local"
							></v-text-field>
						</v-col>
						<v-col cols="12" sm="6" md="6" class="d-flex justify-center">
							<v-text-field
								clearable
								variant="outlined"
								type="email"
								:label="profile.input.textField.email.label"
								:rules="computed_data_validation_emailRules"
								v-model="computed_data_user_email_local"
							></v-text-field>
						</v-col>
						<v-col cols="12" sm="6" md="6" class="d-flex justify-center">
							<v-text-field
								clearable
								variant="outlined"
								type="number"
								:label="profile.input.textField.phoneNumber.label"
								:rules="computed_data_validation_phoneNumberRules"
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
				style="min-width: 100px"
				size="large"
				:disabled="computed_data_doesAccountDataMatchState"
				:loading="profile.actions.btn.save.isLoading"
				@click="method_event_saveSettings_clickHandler"
			>
				<template #default>
					<small class="text-default" v-text="profile.actions.btn.save.text"></small>
				</template>
			</v-btn>
		</v-card-actions>
	</v-card>

	<!-- <dialog-container-component
		props-toolbar-title="Update avatar"
		v-model="computed_data_dialog_accountProfile_updateAvatar_show_state"
	>
		<template #dialog-content> Content </template>
	</dialog-container-component> -->
</template>

<script lang="ts">
import { defineComponent } from "vue";

// Stores
import useFirebaseStore from "@stores/store-firebase.js";
import useCommonStore from "@stores/store-common.js";

// Components
//import DialogContainerComp from "@components/common/dialog/common-dialog.vue";

// Declarations
import { IAccountProfileData } from "@declarations/common/account/profile/common-interface-account-profile.js";

// Icons
import { mdiImageEdit } from "@mdi/js";

// IMGs
import CanvasPNG from "@assets/jpg/temp.jpg";

export default defineComponent({
	name: "uncommon-account-profile-component",
	components: {
		//"dialog-container-component": DialogContainerComp,
	},
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
					textField: {
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
		computed_icon_editImage(): string {
			return mdiImageEdit;
		},
		computed_icon_dialog_closeBtn_state(): string {
			return this.storeCommon.getDialog_default_btnClose_icon_state;
		},

		computed_tooltip_dialog_closeBtn_state(): string {
			return this.storeCommon.getDialog_default_btnClose_tooltip_state;
		},

		computed_img_canvas(): string {
			return CanvasPNG;
		},

		computed_data_validation_displayNameRules(): any {
			return [this.method_validation_isNotEmpty];
		},
		computed_data_validation_nameRules(): any {
			return [this.method_validation_isNotEmpty, this.method_validation_isNameMinLength];
		},
		computed_data_validation_emailRules(): any {
			return [this.method_validation_isNotEmpty, this.method_validation_isEmailFormatValid];
		},
		computed_data_validation_phoneNumberRules(): any {
			return [];
		},
		computed_data_isUserLoggedIn(): boolean {
			return this.storeFirebase.get_userAuth_isLoggedIn_state;
		},
		computed_data_user_photoURL(): string | undefined {
			return this.storeFirebase.get_userAuth_photoUrl_state ?? undefined;
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
			return [
				this.computed_data_doesDisplayNameLocal_matchState,
				this.computed_data_doesFirstnameLocal_matchState,
				this.computed_data_doesLastnameLocal_matchState,
				this.computed_data_doesEmailLocal_matchState,
				this.computed_data_doesPhoneNumberLocal_matchState,
			].every((data) => data === true);
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
		computed_data_dialog_accountProfile_updateAvatar_show_state: {
			get(): boolean {
				return this.storeCommon.getDialog_accountProfile_updateAvatar_show_state;
			},
			set(newValue: boolean): void {
				this.storeCommon.setDialog_accountProfile_updateAvatar_show_state(newValue);
			},
		},
		computed_data_user_displayName_local: {
			get(): string | null {
				return this.profile.input.textField.displayName.value;
			},
			set(newValue: string | null): void {
				this.profile.input.textField.displayName.value = newValue;
			},
		},
		computed_data_user_firstname_local: {
			get(): string | null {
				return this.profile.input.textField.firstname.value;
			},
			set(newValue: string | null): void {
				this.profile.input.textField.firstname.value = newValue;
			},
		},
		computed_data_user_lastname_local: {
			get(): string | null {
				return this.profile.input.textField.lastname.value;
			},
			set(newValue: string | null): void {
				this.profile.input.textField.lastname.value = newValue;
			},
		},
		computed_data_user_email_local: {
			get(): string | null {
				return this.profile.input.textField.email.value;
			},
			set(newValue: string | null): void {
				this.profile.input.textField.email.value = newValue;
			},
		},
		computed_data_user_phoneNumber_local: {
			get(): number | null {
				return this.profile.input.textField.phoneNumber.value;
			},
			set(newValue: number | null): void {
				this.profile.input.textField.phoneNumber.value = newValue;
			},
		},
		computed_data_user_displayName_state: {
			get(): string | null {
				return this.storeFirebase.get_userAuth_displayName_state;
			},
			set(newValue: string | null): void {
				this.storeFirebase.set_userAuth_displayName_state(newValue);
			},
		},
		computed_data_user_firstname_state: {
			get(): string | null {
				return this.storeFirebase.get_userFirestore_firstname_state;
			},
			set(newValue: string | null): void {
				this.storeFirebase.set_userFirestore_firstname_state(newValue);
			},
		},
		computed_data_user_lastname_state: {
			get(): string | null {
				return this.storeFirebase.get_userFirestore_lastname_state;
			},
			set(newValue: string | null): void {
				this.storeFirebase.set_userFirestore_lastname_state(newValue);
			},
		},
		computed_data_user_email_state: {
			get(): string | null {
				return this.storeFirebase.get_userAuth_email_state;
			},
			set(newValue: string | null): void {
				this.storeFirebase.set_userAuth_email_state(newValue);
			},
		},
		computed_data_user_phoneNumber_state: {
			get(): number | null {
				return this.storeFirebase.get_userFirestore_phoneNumber_state;
			},
			set(newValue: number | null): void {
				this.storeFirebase.set_userFirestore_phoneNumber_state(newValue);
			},
		},
	},
	methods: {
		method_event_saveSettings_clickHandler(): void {
			this.profile.actions.btn.save.isLoading = true;
			this.method_utils_matchLocalDataToStateAndUploadIfRequired()
				.then(() => this.storeCommon.setSnackbar_success_state("Successfully saved your account profile settings."))
				.catch((errorMessage: string) => this.storeCommon.setSnackbar_error_state(errorMessage))
				.finally(() => {
					setTimeout(() => {
						this.storeCommon.setSnackbar_reset_state();
						this.profile.actions.btn.save.isLoading = false;
					}, this.storeCommon.getSnackbar_timeout_state);
				});
		},
		method_event_changeAvatarPicture_clickHandler(): void {
			// Change avatar picture. Might want to consider using a v-file-input element.
			//this.computed_data_dialog_accountProfile_updateAvatar_show_state = true;
		},
		method_event_updateUserData(newValue: boolean): void {
			if (newValue) {
				this.computed_data_user_displayName_local = this.computed_data_user_displayName_state;
				this.computed_data_user_firstname_local = this.computed_data_user_firstname_state;
				this.computed_data_user_lastname_local = this.computed_data_user_lastname_state;
				this.computed_data_user_email_local = this.computed_data_user_email_state;
				this.computed_data_user_phoneNumber_local = this.computed_data_user_phoneNumber_state;
			}
		},

		method_utils_matchLocalDataToStateAndUploadIfRequired(): Promise<void> {
			return new Promise((resolve, reject) => {
				this.method_utils_matchAuthLocalDataToStateAndUploadIfRequired()
					.then(() => this.method_utils_matchFirestoreLocalDataToStateAndUploadIfRequired())
					.then(() => resolve())
					.catch((errorMessage: string) => reject(errorMessage));
			});
		},
		method_utils_matchAuthLocalDataToStateAndUploadIfRequired(): Promise<void> {
			return new Promise((resolve, reject) => {
				let displayNameLocal: string = this.computed_data_user_displayName_local!;
				let displayNameState: string = this.computed_data_user_displayName_state!;
				let emailLocal: string = this.computed_data_user_email_local!;
				let emailState: string = this.computed_data_user_email_state!;

				if (!this.computed_data_doesDisplayNameLocal_matchState) {
					this.storeFirebase
						.update_userAuth_profile_displayNameAndPhotoUrl({ displayName: displayNameLocal })
						.then(() => {
							displayNameState = displayNameLocal;
							resolve();
						})
						.catch((errorMessage: string) => reject(errorMessage));
				}

				if (!this.computed_data_doesEmailLocal_matchState) {
					this.storeFirebase
						.update_userAuth_email(emailLocal)
						.then(() => {
							emailState = emailLocal;
							resolve();
						})
						.catch((errorMessage: string) => reject(errorMessage));
				}

				resolve();
			});
		},
		method_utils_matchFirestoreLocalDataToStateAndUploadIfRequired(): Promise<void> {
			return new Promise((resolve, reject) => {
				let firstname: { local: string | null; state: string | null } = {
					local: this.computed_data_user_firstname_local,
					state: this.computed_data_user_firstname_state,
				};
				let lastname: { local: string | null; state: string | null } = {
					local: this.computed_data_user_lastname_local,
					state: this.computed_data_user_lastname_state,
				};
				let phoneNumber: { local: number | null; state: number | null } = {
					local: this.computed_data_user_phoneNumber_local,
					state: this.computed_data_user_phoneNumber_state,
				};

				let userCredentials = { firstname, lastname, phoneNumber };
				let valuesThatHaveChanged: any = {};
				for (const [key, value] of Object.entries(userCredentials)) {
					if (value.local !== value.state) {
						valuesThatHaveChanged[key] = value.local;
					}
				}

				this.storeFirebase
					.update_userFirestore_user(valuesThatHaveChanged)
					.then(() => {
						this.computed_data_user_firstname_state = this.computed_data_user_firstname_local;
						this.computed_data_user_lastname_state = this.computed_data_user_lastname_local;
						this.computed_data_user_phoneNumber_state = this.computed_data_user_phoneNumber_local;
						resolve();
					})
					.catch((errorMessage: string) => reject(errorMessage));
			});
		},

		method_validation_isNotEmpty(newValue: string): boolean | string {
			let retVal: boolean | string = false;
			// Checks for null & undefined
			if (newValue) {
				// Gets rid of whitespace
				let val = newValue.trim();

				// Checks the length
				retVal = val.length > 0 || "A value must be entered.";
			} else {
				retVal = "A value must be entered.";
			}
			return retVal;
		},
		method_validation_isNameMinLength(newValue: string): boolean | string {
			const isNewValueValid: boolean = !!newValue && newValue.length > 0;

			let retVal: boolean | string = false;
			if (isNewValueValid) {
				retVal = newValue.length >= 3 || "At least 3 characters.";

				if (retVal !== true) {
					retVal = retVal as string;
				}
			}
			return retVal;
		},
		method_validation_isEmailFormatValid(newValue: string): boolean | string {
			const isNewValueValid: boolean = !!newValue && newValue.length > 0;

			let retVal: boolean | string = false;
			if (isNewValueValid) {
				retVal = /^([^\s@]+@[^\s@]+\.[^\s@]+)$/g.test(newValue) || "Email must be valid.";

				if (retVal !== true) {
					retVal = retVal as string;
				}
			}
			return retVal;
		},
	},
	watch: {
		computed_data_isUserLoggedIn(newValue: boolean): void {
			if (newValue) {
				this.method_event_updateUserData(newValue);
			}
		},
	},
	setup() {
		const storeFirebase = useFirebaseStore();
		const storeCommon = useCommonStore();
		return { storeFirebase, storeCommon };
	},
	mounted(): void {
		if (this.computed_data_isUserLoggedIn) {
			this.method_event_updateUserData(this.computed_data_isUserLoggedIn);
		}
	},
});
</script>
