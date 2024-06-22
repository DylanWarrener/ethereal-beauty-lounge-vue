<template>
	<container-section
		id="section-account"
		style-container="margin-top: 64px; min-height: calc(100vh - 64px)"
		class-title="text-inverted"
		class-subtitle="text-inverted"
		:title="accountPage.section.title"
		:subtitle="accountPage.section.subtitle"
	>
		<template #section-content>
			<v-container fluid>
				<v-row dense>
					<!-- Mobile side navigation -->
					<v-col cols="12" v-if="computed_display_isMobile">
						<v-sheet class="mx-auto bg-accent">
							<v-slide-group mandatory show-arrows>
								<v-slide-group-item v-slot="{ isSelected, toggle }">
									<v-btn
										rounded
										class="ma-2"
										variant="outlined"
										:color="isSelected ? 'accent' : undefined"
										@click.stop="
											accountPage.content.selectedComponent = 'uncommon-account-profile-component'
										"
									>
										<template v-slot:prepend>
											<v-icon :icon="accountPage.navigation.profile.icon"></v-icon>
										</template>
										<template v-slot:default>
											<span v-text="accountPage.navigation.profile.text"></span>
										</template>
									</v-btn>
									<v-btn
										rounded
										class="ma-2"
										variant="outlined"
										:text="accountPage.navigation.security.text"
										:color="isSelected ? 'accent' : undefined"
										@click.stop="
											accountPage.content.selectedComponent = 'uncommon-account-security-component'
										"
									>
										<template v-slot:prepend>
											<v-icon :icon="accountPage.navigation.security.icon"></v-icon>
										</template>
									</v-btn>
									<v-btn
										rounded
										class="ma-2"
										variant="outlined"
										:text="accountPage.navigation.notifications.text"
										:color="isSelected ? 'accent' : undefined"
										@click.stop="
											accountPage.content.selectedComponent =
												'uncommon-account-notifications-component'
										"
									>
										<template v-slot:prepend>
											<v-icon :icon="accountPage.navigation.notifications.icon"></v-icon>
										</template>
									</v-btn>
								</v-slide-group-item>
							</v-slide-group>
						</v-sheet>
					</v-col>

					<!-- Desktop side navigation -->
					<v-col cols="3" v-else>
						<v-card>
							<v-list nav class="pl-1 bg-accent">
								<v-list-item
									:title="accountPage.navigation.profile.text"
									:value="accountPage.navigation.profile.value"
									@click.stop="
										accountPage.content.selectedComponent = 'uncommon-account-profile-component'
									"
								>
									<template #prepend>
										<v-icon :icon="accountPage.navigation.profile.icon"></v-icon>
									</template>
								</v-list-item>
								<v-list-item
									:title="accountPage.navigation.security.text"
									:value="accountPage.navigation.security.value"
									@click.stop="
										accountPage.content.selectedComponent = 'uncommon-account-security-component'
									"
								>
									<template #prepend>
										<v-icon :icon="accountPage.navigation.security.icon"></v-icon>
									</template>
								</v-list-item>
								<v-list-item
									:title="accountPage.navigation.notifications.text"
									:value="accountPage.navigation.notifications.value"
									@click.stop="
										accountPage.content.selectedComponent = 'uncommon-account-notifications-component'
									"
								>
									<template #prepend>
										<v-icon :icon="accountPage.navigation.notifications.icon"></v-icon>
									</template>
								</v-list-item>
							</v-list>
						</v-card>
					</v-col>
					<v-col :cols="computed_dynamicWidth">
						<component :is="accountPage.content.selectedComponent"></component>
					</v-col>
				</v-row>
			</v-container>
		</template>
	</container-section>
</template>

<script lang="ts">
import { defineComponent } from "vue";

// Components
import AccountProfileComp from "@components/uncommon/account/profile/uncommon-account-profile.vue";
import AccountSecurityComp from "@components/uncommon/account/security/uncommon-account-security.vue";
import AccountNotificationsComp from "@components/uncommon/account/notifications/uncommon-account-notifications.vue";

// Icons
import { CONST_OBJECT_ICONS_LIST_GROUPS } from "@constants/common/objects/common-constants-objects.js";

export default defineComponent({
	name: "common-account-page-container-component",
	components: {
		"uncommon-account-profile-component": AccountProfileComp,
		"uncommon-account-security-component": AccountSecurityComp,
		"uncommon-account-notifications-component": AccountNotificationsComp,
	},
	data() {
		return {
			accountPage: {
				section: {
					title: "Account",
					subtitle: "Update your account settings here.",
				},
				navigation: {
					openedGroup: ["profile"],
					profile: {
						text: "Profile",
						value: "profile",
						icon: CONST_OBJECT_ICONS_LIST_GROUPS.profile,
					},
					security: {
						text: "Security",
						value: "security",
						icon: CONST_OBJECT_ICONS_LIST_GROUPS.security,
					},
					notifications: {
						text: "Notifications",
						value: "notifications",
						icon: CONST_OBJECT_ICONS_LIST_GROUPS.notifications,
					},
				},
				content: {
					selectedComponent: "uncommon-account-profile-component",
				},
			},
		};
	},
	computed: {
		computed_display_isMobile(): boolean {
			return this.$vuetify.display.mdAndDown;
		},
		computed_dynamicWidth(): string {
			return this.$vuetify.display.lgAndUp ? "9" : "12";
		},
	},
});
</script>
