<template>
    <common-section-container-component
        id="section-account"
        style-container="margin-top: 64px; min-height: calc(100vh - 64px)"
        class-title="text-inverted"
        title="Account"
    >
        <template #section-content>
            <v-container fluid style="border: 2px solid black">
                <v-row dense style="border: 2px solid red">
                    <v-col cols="3" style="border: 2px solid blue">
                        <v-list nav density="compact" class="pl-1 bg-accent" style="border: 2px solid black">
                            <v-list-item :title="account.navigation.profile.text" :value="account.navigation.profile.value" style="border: 2px solid green">
                                <template #prepend>
                                    <v-icon :icon="account.navigation.profile.icon"></v-icon>
                                </template>
                            </v-list-item>
                            <v-list-item :title="account.navigation.security.text" :value="account.navigation.security.value" style="border: 2px solid green">
                                <template #prepend>
                                    <v-icon :icon="account.navigation.security.icon"></v-icon>
                                </template>
                            </v-list-item>
                            <v-list-item :title="account.navigation.notifications.text" :value="account.navigation.notifications.value" style="border: 2px solid green">
                                <template #prepend>
                                    <v-icon :icon="account.navigation.notifications.icon"></v-icon>
                                </template>
                            </v-list-item>
                        </v-list>
                    </v-col>
                    <v-col style="border: 2px solid blue">
                        <v-card elevation="0" style="border: 2px solid green">
							<component
								:is="account.content.selectedComponent"
								@change.self="method_event_setSelectedComponent"
							></component>
						</v-card>
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

// Icons
import { iconsAccountNavigation } from "@constants/common/objects/common-constants-objects.js";

export default defineComponent({
	name: "common-account-page-container-component",
    components: {
		"common-section-container-component": SectionContainerComp
	},
    data() {
        return {
            account: {
                navigation: {
                    openedGroup: ['profile'],
                    profile: {
                        text: "Profile",
                        value: "profile",
                        icon: iconsAccountNavigation.profile
                    },
                    security: {
                        text: "Security",
                        value: "security",
                        icon: iconsAccountNavigation.security
                    },
                    notifications: {
                        text: "Notifications",
                        value: "notifications",
                        icon: iconsAccountNavigation.notifications
                    }
                },
                content: {
                    selectedComponent: ''
                }
            }
        };
    },
    methods: {
        /* Events */
        method_event_setSelectedComponent(comp: string): void {
			this.account.content.selectedComponent = comp;
		},
    }
});
</script>
