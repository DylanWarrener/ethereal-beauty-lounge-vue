<template>
	<v-navigation-drawer
		rail
		expand-on-hover
		disable-route-watcher
		location="right"
		class="bg-accent"
		v-if="computed_data_isUserLoggedIn === true"
	>
		<v-list>
			<v-list-item
				prepend-avatar="https://randomuser.me/api/portraits/women/85.jpg"
				title="No data for first name"
				subtitle="No data for last name"
			></v-list-item>
		</v-list>

		<v-divider></v-divider>

		<v-list nav density="compact">
			<v-list-item prepend-icon="mdi-folder" title="My Files" value="myfiles"></v-list-item>
			<v-list-item prepend-icon="mdi-account-multiple" title="Shared with me" value="shared"></v-list-item>
			<v-list-item prepend-icon="mdi-star" title="Starred" value="starred"></v-list-item>
		</v-list>

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

// Icons
import { iconsSidebarNavigation } from "@constants/common/objects/common-constants-objects.js";

export default defineComponent({
	name: "navigation-user-account-component",
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
		computed_data_user(): any {
			//{ firstname: string; lastname: string; email: string }
			//return this.storeCommon.getUser();
		},
		computed_data_isUserLoggedIn(): boolean {
			return this.storeFirebase.getIsUserLoggedIn;
		},
	},
	methods: {
		method_event_logout(): void {
			this.storeCommon.logout();
		},
	},
	setup() {
		const storeFirebase = useFirebaseStore();
		const storeCommon = useCommonStore();
		return { storeFirebase, storeCommon };
	},
});
</script>
