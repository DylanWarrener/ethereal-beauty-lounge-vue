<template>
	<common-section-container-component
		id="section-account"
		style-container="margin-top: 64px; min-height: calc(100vh - 64px)"
		class-title="text-inverted"
		class-subtitle="text-inverted"
		:title="account.section.title"
		:subtitle="account.section.subtitle"
	>
		<template #section-content>
			<v-container fluid>
				<v-row dense>
					<!-- Mobile side navigation -->
					<v-col cols="12" v-if="computed_display_isMobile">
						<v-sheet class="mx-auto bg-accent" style="border: 4px solid orange">
							<v-slide-group mandatory show-arrows class="" style="border: 4px solid grey">
								<v-slide-group-item v-slot="{ isSelected, toggle }">
									<v-btn
										rounded
										class="ma-2"
										variant="outlined"
										:color="isSelected ? 'accent' : undefined"
										@click.stop="method_event_setSelectedComponent('uncommon-account-profile-component')"
									>
										<template v-slot:prepend>
											<v-icon :icon="account.navigation.profile.icon"></v-icon>
										</template>
										<template v-slot:default>
											<span v-text="account.navigation.profile.text"></span>
										</template>
									</v-btn>
									<v-btn
										rounded
										class="ma-2"
										variant="outlined"
										:text="account.navigation.security.text"
										:color="isSelected ? 'accent' : undefined"
										@click.stop="
											method_event_setSelectedComponent('uncommon-account-security-component')
										"
									>
										<template v-slot:prepend>
											<v-icon :icon="account.navigation.security.icon"></v-icon>
										</template>
									</v-btn>
									<v-btn
										rounded
										class="ma-2"
										variant="outlined"
										:text="account.navigation.notifications.text"
										:color="isSelected ? 'accent' : undefined"
										@click.stop="
											method_event_setSelectedComponent('uncommon-account-notifications-component')
										"
									>
										<template v-slot:prepend>
											<v-icon :icon="account.navigation.notifications.icon"></v-icon>
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
									:title="account.navigation.profile.text"
									:value="account.navigation.profile.value"
									@click.stop="method_event_setSelectedComponent('uncommon-account-profile-component')"
								>
									<template #prepend>
										<v-icon :icon="account.navigation.profile.icon"></v-icon>
									</template>
								</v-list-item>
								<v-list-item
									:title="account.navigation.security.text"
									:value="account.navigation.security.value"
									@click.stop="method_event_setSelectedComponent('uncommon-account-security-component')"
								>
									<template #prepend>
										<v-icon :icon="account.navigation.security.icon"></v-icon>
									</template>
								</v-list-item>
								<v-list-item
									:title="account.navigation.notifications.text"
									:value="account.navigation.notifications.value"
									@click.stop="
										method_event_setSelectedComponent('uncommon-account-notifications-component')
									"
								>
									<template #prepend>
										<v-icon :icon="account.navigation.notifications.icon"></v-icon>
									</template>
								</v-list-item>
							</v-list>
						</v-card>
					</v-col>
					<v-col :cols="computed_dynamicWidth">
						<component
							:is="account.content.selectedComponent"
							@change.self="method_event_setSelectedComponent"
						></component>
					</v-col>
				</v-row>
			</v-container>
		</template>
	</common-section-container-component>
</template>

<script lang="ts">
import { defineComponent } from "vue";

// Components
import SectionContainerComp from "@components/common/section/common-section.vue";
import AccountProfileComp from "@components/uncommon/account/profile/uncommon-account-profile.vue";
import AccountSecurityComp from "@components/uncommon/account/security/uncommon-account-security.vue";
import AccountNotificationsComp from "@components/uncommon/account/notifications/uncommon-account-notifications.vue";

// Icons
import { iconsAccountNavigation } from "@constants/common/objects/common-constants-objects.js";

export default defineComponent({
	name: "common-account-page-container-component",
	components: {
		"common-section-container-component": SectionContainerComp,
		"uncommon-account-profile-component": AccountProfileComp,
		"uncommon-account-security-component": AccountSecurityComp,
		"uncommon-account-notifications-component": AccountNotificationsComp,
	},
	data() {
		return {
			account: {
				section: {
					title: "Account",
					subtitle: "Update your account settings here.",
				},
				navigation: {
					openedGroup: ["profile"],
					profile: {
						text: "Profile",
						value: "profile",
						icon: iconsAccountNavigation.profile,
					},
					security: {
						text: "Security",
						value: "security",
						icon: iconsAccountNavigation.security,
					},
					notifications: {
						text: "Notifications",
						value: "notifications",
						icon: iconsAccountNavigation.notifications,
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
	methods: {
		/* Events */
		method_event_setSelectedComponent(comp: string): void {
			this.account.content.selectedComponent = comp;
		},
	},
});
</script>
