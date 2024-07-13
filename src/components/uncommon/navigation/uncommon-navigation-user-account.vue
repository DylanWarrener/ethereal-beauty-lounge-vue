<template>
	<v-navigation-drawer
		expand-on-hover
		disable-route-watcher
		location="right"
		class="bg-accent"
		:rail="navigation.rail"
		v-if="computed_data_isLoggedIn"
	>
		<!-- <div class="close-rail d-flex" style="border: 2px solid red">
			<v-tooltip location="left" text="Close account bar">
				<template>
					<v-btn></v-btn>
				</template>
			</v-tooltip>
		</div> -->

		<v-list>
			<v-list-item class="pl-3">
				<template #prepend>
					<v-avatar color="secondary" size="32">
						<span class="text-h5 text-inverted">{{ computed_data_user_initials }}</span>
					</v-avatar>
				</template>
				<template #title>
					<span class="text-h5" v-text="computed_data_user_displayName"></span>
				</template>
				<template #subtitle>
					<em class="text-h6" v-text="computed_data_user_email"></em>
				</template>
			</v-list-item>
		</v-list>

		<divider-container-component color="default" thickness="1"></divider-container-component>

		<v-list nav density="compact" class="pl-1">
			<v-list-item class="px-4 text-inverted text-capitalize" to="/account" :value="navigation.items.account.value">
				<template #prepend>
					<v-icon class="text-default" :icon="navigation.items.account.icon"></v-icon>
				</template>
				<template #default>
					<span class="text-default" v-text="navigation.items.account.text"></span>
				</template>
			</v-list-item>
			<v-list-item class="px-4 text-inverted text-capitalize" to="/basket" :value="navigation.items.basket.value">
				<template #prepend>
					<v-icon class="text-default" :icon="navigation.items.basket.icon"></v-icon>
				</template>
				<template #default>
					<span class="text-default" v-text="navigation.items.basket.text"></span>
				</template>
			</v-list-item>
			<!-- <v-list-item prepend-icon="mdi-account-multiple" title="Shared with me" value="shared"></v-list-item> -->
			<!-- <v-list-item prepend-icon="mdi-star" title="Starred" value="starred"></v-list-item> -->
		</v-list>

		<template v-slot:append>
			<div class="pa-2 d-flex justify-center">
				<v-tooltip location="left" :text="navigation.items.logout.tooltip">
					<template v-slot:activator="{ props }">
						<v-btn
							variant="flat"
							class="bg-transparent overflow-hidden"
							:icon="navigation.items.logout.icon"
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
import { mdiAccount, mdiBasket, mdiLogout } from "@mdi/js";

export default defineComponent({
	name: "navigation-user-account-component",
	components: {
		"divider-container-component": DividerContainerComp,
	},
	data() {
		return {
			navigation: {
				rail: true,
				items: {
					account: {
						text: "Account",
						value: "account",
						icon: mdiAccount,
					},
					basket: {
						text: "Basket",
						value: "basket",
						icon: mdiBasket,
					},
					logout: {
						tooltip: "Log out",
						icon: mdiLogout,
					},
				},
			},
		};
	},
	computed: {
		computed_data_user_displayName(): string {
			return this.storeFirebase.get_userAuth_displayName_state ?? "Loading display name...";
		},
		computed_data_user_email(): string {
			return this.storeFirebase.get_userAuth_email_state?.toLowerCase() ?? "Loading email...";
		},
		computed_data_user_initials(): string {
			const [firstname, lastname] = this.computed_data_user_displayName.split(" ");
			return `${firstname[0]}${lastname[0]}`.toUpperCase();
		},
		computed_data_isLoggedIn(): boolean {
			return this.storeFirebase.get_userAuth_isLoggedIn_state;
		},
	},
	methods: {
		method_event_logout(): void {
			this.storeFirebase.logout_userAuth();
			//* Show login dialog.
		},
	},
	setup() {
		const storeFirebase = useFirebaseStore();
		const storeCommon = useCommonStore();
		return { storeFirebase, storeCommon };
	},
});
</script>
