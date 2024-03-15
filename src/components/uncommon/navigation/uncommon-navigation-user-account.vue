<template>
	<v-navigation-drawer
		rail
		expand-on-hover
		disable-route-watcher
		location="right"
		class="bg-accent"
		v-if="computed_data_isUserLoggedIn"
	>
		<v-list>
			<v-list-item class="pl-3" :title="computed_data_user_displayName" :subtitle="computed_data_user_email">
				<template #prepend>
					<v-avatar color="secondary" size="32">
						<span class="text-h5 text-inverted">{{ computed_data_user_initials }}</span>
					</v-avatar>
				</template>
			</v-list-item>
		</v-list>

		<divider-container-component color="default" thickness="1"></divider-container-component>

		<!-- <v-list nav density="compact">
			<v-list-item prepend-icon="mdi-folder" title="My Files" value="myfiles"></v-list-item>
			<v-list-item prepend-icon="mdi-account-multiple" title="Shared with me" value="shared"></v-list-item>
			<v-list-item prepend-icon="mdi-star" title="Starred" value="starred"></v-list-item>
		</v-list> -->

		<template v-slot:append>
			<div class="pa-2 d-flex justify-center">
				<v-tooltip location="bottom" text="Logout">
					<template v-slot:activator="{ props }">
						<v-btn
							variant="flat"
							class="bg-transparent overflow-hidden"
							:icon="navigation.btn.icon"
							v-bind="props"
							@click.stop="method_event_logout"
						></v-btn>
					</template>
				</v-tooltip>
			</div>
		</template>
	</v-navigation-drawer>
</template>

<script lang="ts">
import { defineComponent } from "vue";

// Stores
import useCommonStore from "@stores/store-common.js";
import useFirebaseStore from "@stores/store-firebase.js";

// Components
import DividerContainerComp from "@components/common/divider/common-divider.vue";

// Icons
import { iconsSidebarNavigation } from "@constants/common/objects/common-constants-objects.js";

export default defineComponent({
	name: "navigation-user-account-component",
	components: {
		"divider-container-component": DividerContainerComp,
	},
	data() {
		return {
			navigation: {
				btn: {
					icon: iconsSidebarNavigation.logout,
				},
			},
		};
	},
	computed: {
		computed_data_user_displayName(): string {
			return this.storeFirebase.getUserDisplayName?.toLowerCase() ?? "Loading display name...";
		},
		computed_data_user_email(): string {
			return this.storeFirebase.getUserEmail?.toLowerCase() ?? "Loading email...";
		},
		computed_data_user_initials(): string {
			const [firstname, lastname] = this.computed_data_user_displayName.split(" ");
			return `${firstname[0]}${lastname[0]}`.toUpperCase();
		},
		computed_data_isUserLoggedIn(): boolean {
			return this.storeFirebase.getIsUserLoggedIn;
		},
	},
	methods: {
		method_event_logout(): void {
			this.storeFirebase.logout();
		},
	},
	setup() {
		const storeFirebase = useFirebaseStore();
		const storeCommon = useCommonStore();
		return { storeFirebase, storeCommon };
	},
});
</script>
