<template>
	<v-app-bar elevation="0" scroll-behavior="hide" color="accent" density="comfortable">
		<!-- APP BAR LEFT -->
		<common-card-container-component
			hover
			exact
			elevation="0"
			variant="flat"
			color="transparent"
			width="150"
			height="100%"
			style="background: linear-gradient(90deg, rgba(255, 255, 255, 0.75) 0%, rgba(186, 119, 145, 1) 100%)"
			:to="computed_link_appBar_btnHome_local"
			v-ripple="{ class: 'text-accent' }"
		>
			<template #card-img>
				<v-col cols="12" class="pa-0" style="height: 100%">
					<v-img cover src="logo-transparent.png" width="100%" height="100%"></v-img>
				</v-col>
			</template>
		</common-card-container-component>
		<v-tooltip location="bottom" :text="computed_tooltip_appBar_btnMobileMenu_local">
			<template #activator="{ props }">
				<common-btn-container-component
					varient="flat"
					class="d-flex d-md-none"
					:id="computed_id_appBar_btnMobileMenu_local"
					:icon="computed_icon_appBar_btnMobileMenu_local"
					v-bind="props"
					@click="computed_data_appBar_btnMobileMenu_show_state = !computed_data_appBar_btnMobileMenu_show_state"
				></common-btn-container-component>
			</template>
		</v-tooltip>
		<v-spacer></v-spacer>

		<!-- APP BAR MIDDLE - Text navs -->
		<common-btn-container-component
			class="d-none d-md-flex"
			:id="computed_id_appBar_btnHome_local"
			:text="computed_text_appBar_btnHome_local"
			:to="computed_link_appBar_btnHome_local"
		></common-btn-container-component>
		<common-btn-container-component
			class="d-none d-md-flex"
			:id="computed_id_appBar_btnTreatments_local"
			:text="computed_text_appBar_btnTreatments_local"
			:to="computed_link_appBar_btnTreatments_local"
		></common-btn-container-component>
		<common-btn-container-component
			class="d-none d-md-flex"
			:id="computed_id_appBar_btnStore_local"
			:text="computed_text_appBar_btnStore_local"
			:to="computed_link_appBar_btnStore_local"
		></common-btn-container-component>
		<common-btn-menu-container-component>
			<template #menu-btn="{ menuProps, tooltipProps }">
				<common-btn-container-component
					class="d-flex d-md-flex"
					:id="computed_id_appBar_btnInformation_local"
					:text="computed_text_appBar_btnInformation_local"
					v-bind="mergeProps(menuProps, tooltipProps)"
					@click="computed_data_appBar_btnInformation_show_state = !computed_data_appBar_btnInformation_show_state"
				></common-btn-container-component>
			</template>
			<template #menu-items>
				<v-list nav variant="text" bg-color="accent" base-color="white" color="black">
					<v-list-item class="text-inverted text-capitalize" :to="computed_link_appBar_btnContact_local">
						<span class="text-default" v-text="computed_text_appBar_btnContact_local"></span>
					</v-list-item>
					<v-list-item class="text-inverted text-capitalize" :to="computed_link_appBar_btnReviews_local">
						<span class="text-default" v-text="computed_text_appBar_btnReviews_local"></span>
					</v-list-item>
					<v-list-item class="text-inverted text-capitalize" :to="computed_link_appBar_btnAbout_local">
						<span class="text-default" v-text="computed_text_appBar_btnAbout_local"></span>
					</v-list-item>
				</v-list>
			</template>
		</common-btn-menu-container-component>

		<v-divider vertical inset class="mx-2 d-flex d-lg-none border-opacity-100"></v-divider>

		<!-- APP BAR RIGHT - Icon navs -->
		<common-btn-menu-container-component :tooltip-text="computed_tooltip_appBar_btnBasket_local">
			<template #menu-btn="{ menuProps, tooltipProps }">
				<common-btn-container-component
					class="d-flex d-md-flex"
					:id="computed_id_appBar_btnBasket_local"
					:icon="computed_icon_appBar_btnBasket_local"
					v-bind="mergeProps(menuProps, tooltipProps)"
					@click="computed_data_appBar_btnBasketShow_show_state = !computed_data_appBar_btnBasketShow_show_state"
				></common-btn-container-component>
			</template>
		</common-btn-menu-container-component>
		<common-btn-menu-container-component
			:tooltip-text="computed_tooltip_appBar_btnAccount_local"
			v-if="!computed_data_user_isLoggedIn"
		>
			<template #menu-btn="{ menuProps, tooltipProps }">
				<common-btn-container-component
					class="d-flex d-md-flex"
					:id="computed_id_appBar_btnAccount_local"
					:icon="computed_icon_appBar_btnAccount_local"
					v-bind="mergeProps(menuProps, tooltipProps)"
					@click="computed_data_appBar_btnAccountShow_show_state = !computed_data_appBar_btnAccountShow_show_state"
				></common-btn-container-component>
			</template>
			<template #menu-items>
				<v-list nav variant="text" bg-color="accent" base-color="white" color="black">
					<v-list-item class="text-inverted text-uppercase" to="/login">
						<span class="text-uppercase">Log in</span>
					</v-list-item>
					<v-list-item class="text-inverted text-uppercase" to="/register">
						<span class="text-uppercase">Register</span>
					</v-list-item>
				</v-list>
			</template>
		</common-btn-menu-container-component>
		<v-tooltip location="bottom" :text="computed_tooltip_appBar_btnAccount" v-else>
			<template #activator="{ props }">
				<v-btn
					icon
					variant="flat"
					density="compact"
					class="bg-white d-flex d-lg-none"
					:to="computed_link_pageAccount"
					v-text="computed_data_user_initials"
					v-bind="props"
				></v-btn>
			</template>
		</v-tooltip>
	</v-app-bar>

	<common-navigation-container-component
		location="bottom"
		:navigation="computed_data_navigation_mobileMenu"
		v-model="computed_data_appBar_btnMobileMenu"
	></common-navigation-container-component>
</template>

<script lang="ts">
import { defineComponent, mergeProps } from "vue";

// Stores
import useCommonStore from "@stores/store-common.js";
import useHeaderStore from "@stores/store-header.js";
import useFirebaseStore from "@stores/store-firebase.js";

// Components
import CardContainerComp from "@components/common/card/common-card.vue";
import BtnContainerComp from "@components/common/button/common-btn.vue";
import BtnMenuContainerComp from "@components/common/menu/common-menu.vue";
import NavigationPagesNonMobileMenuContainerComp from "@components/uncommon/navigation/pages/non-mobile-menu/uncommon-navigation-pages-non-mobile-menu.vue";
import NavigationContainerComp from "@components/common/navigation/common-navigation.vue";

// Enums
import { ElementIDs } from "@enums/enums.js";

// Constants
import { txtRouteLinks } from "@constants/common/objects/common-constants-objects.js";

// Icons
import { mdiAccount, mdiBasket, mdiMenu } from "@constants/common/primitives/icons/common-constants-primative-icons.js";

export default defineComponent({
	name: "header-container-component",
	components: {
		"common-card-container-component": CardContainerComp,
		"common-btn-container-component": BtnContainerComp,
		"common-navigation-pages-non-mobile-menu": NavigationPagesNonMobileMenuContainerComp,
		"common-btn-menu-container-component": BtnMenuContainerComp,
		"common-navigation-container-component": NavigationContainerComp,
	},
	data(): any {
		return {
			header: {
				appbar: {
					buttons: {
						icons: {
							mobileMenu: {
								id: "header_appbar_btnMobileMenu_id",
								icon: mdiMenu,
								tooltip: "Menu",
							},
							basket: {
								id: "header_appbar_btnBasket_id",
								icon: mdiBasket,
								tooltip: "Basket",
								link: "",
							},
							account: {
								id: "header_appbar_btnAccount_id",
								icon: mdiAccount,
								tooltip: "Account",
								link: "",
							},
						},
						text: {
							home: {
								id: "header_appbar_btnHome_id",
								text: "Home",
								link: "",
							},
							treatments: {
								id: "header_appbar_btnTreatments_id",
								text: "Treatments",
								link: "",
							},
							store: {
								id: "header_appbar_btnStore_id",
								text: "Store",
								link: "",
							},
							information: {
								id: "header_appbar_btnInformation_id",
								text: "Information",
							},
							contact: {
								id: "header_appbar_btnContact_id",
								text: "Contact",
								link: "",
							},
							reviews: {
								id: "header_appbar_btnReviews_id",
								text: "Reviews",
								link: "",
							},
							about: {
								id: "header_appbar_btnAbout_id",
								text: "About",
								link: "",
							},
							login: {
								id: "header_appbar_btnLogin_id",
								text: "Login",
								link: "",
							},
							register: {
								id: "header_appbar_btnRegister_id",
								text: "Register",
								link: "",
							},
						},
					},
				},
			},
		};
	},
	computed: {
		computed_id_appBar_btnMobileMenu_local(): string {
			return this.header.appbar.buttons.icons.mobileMenu.id;
		},
		computed_id_appBar_btnHome_local(): string {
			return this.header.appbar.buttons.text.home.id;
		},
		computed_id_appBar_btnTreatments_local(): string {
			return this.header.appbar.buttons.text.treatments.id;
		},
		computed_id_appBar_btnStore_local(): string {
			return this.header.appbar.buttons.text.store.id;
		},
		computed_id_appBar_btnInformation_local(): string {
			return this.header.appbar.buttons.text.information.id;
		},
		computed_id_appBar_btnBasket_local(): string {
			return this.header.appbar.buttons.icons.basket.id;
		},
		computed_id_appBar_btnAccount_local(): string {
			return this.header.appbar.buttons.icons.account.id;
		},

		computed_text_appBar_btnHome_local(): string {
			return this.header.appbar.buttons.text.home.text;
		},
		computed_text_appBar_btnTreatments_local(): string {
			return this.header.appbar.buttons.text.treatments.text;
		},
		computed_text_appBar_btnStore_local(): string {
			return this.header.appbar.buttons.text.store.text;
		},
		computed_text_appBar_btnInformation_local(): string {
			return this.header.appbar.buttons.text.information.text;
		},
		computed_text_appBar_btnContact_local(): string {
			return this.header.appbar.buttons.text.contact.text;
		},
		computed_text_appBar_btnReviews_local(): string {
			return this.header.appbar.buttons.text.reviews.text;
		},
		computed_text_appBar_btnAbout_local(): string {
			return this.header.appbar.buttons.text.about.text;
		},

		computed_link_appBar_btnHome_local(): string {
			return this.header.appbar.buttons.text.home.link;
		},
		computed_link_appBar_btnTreatments_local(): string {
			return this.header.appbar.buttons.text.treatments.link;
		},
		computed_link_appBar_btnStore_local(): string {
			return this.header.appbar.buttons.text.store.link;
		},
		computed_link_appBar_btnContact_local(): string {
			return this.header.appbar.buttons.text.contact.link;
		},
		computed_link_appBar_btnReviews_local(): string {
			return this.header.appbar.buttons.text.reviews.link;
		},
		computed_link_appBar_btnAbout_local(): string {
			return this.header.appbar.buttons.text.about.link;
		},
		computed_link_appBar_btnBasket_local(): string {
			return this.header.appbar.buttons.icons.basket.link;
		},
		computed_link_appBar_btnAccount_local(): string {
			return this.header.appbar.buttons.icons.account.link;
		},

		computed_tooltip_appBar_btnMobileMenu_local(): string {
			return this.header.appbar.buttons.icons.mobileMenu.tooltip;
		},
		computed_tooltip_appBar_btnBasket_local(): string {
			return this.header.appbar.buttons.icons.basket.tooltip;
		},
		computed_tooltip_appBar_btnAccount_local(): string {
			return this.header.appbar.buttons.icons.account.tooltip;
		},

		computed_icon_appBar_btnMobileMenu_local(): string {
			return this.header.appbar.buttons.mobileMenu.icon;
		},
		computed_icon_appBar_btnBasket_local(): string {
			return this.header.appbar.buttons.basket.icon;
		},
		computed_icon_appBar_btnAccount_local(): string {
			return this.header.appbar.buttons.account.icon;
		},

		computed_data_user_initials(): string | null {
			let retval: string | null = null;
			if (this.computed_data_user_displayName !== null) {
				const [firstname, lastname] = this.computed_data_user_displayName.split(" ");
				retval = `${firstname[0]}${lastname[0]}`.toUpperCase();
			}
			return retval;
		},
		computed_data_user_displayName(): string | null {
			return this.storeFirebase.get_userAuth_displayName_state;
		},
		computed_data_user_isLoggedIn(): boolean {
			return this.storeFirebase.get_userAuth_isLoggedIn_state;
		},
		computed_data_navigation_mobileMenu(): any[] {
			return this.storeHeader.get_navigation_mobileMenu_state;
		},
		computed_data_navigation_pcMenu(): any[] {
			return this.storeHeader.get_navigation_pcMenu_state;
		},

		computed_data_appBar_btnMobileMenu_show_state: {
			get(): boolean {
				return this.storeHeader.get_appBar_mobileMenu_show_state;
			},
			set(newValue: boolean): void {
				this.storeHeader.set_appBar_mobileMenu_show_state(newValue);
			},
		},
		computed_data_appBar_btnInformation_show_state: {
			get(): boolean {
				return this.storeHeader.get_appBar_information_show_state;
			},
			set(newValue: boolean): void {
				this.storeHeader.set_appBar_information_show_state(newValue);
			},
		},
		computed_data_appBar_btnBasketShow_show_state: {
			get(): boolean {
				return this.storeHeader.get_appBar_basket_show_state;
			},
			set(newValue: boolean): void {
				this.storeHeader.set_appBar_basket_show_state(newValue);
			},
		},
		computed_data_appBar_btnAccountShow_show_state: {
			get(): boolean {
				return this.storeHeader.get_appBar_account_show_state;
			},
			set(newValue: boolean): void {
				this.storeHeader.set_appBar_account_show_state(newValue);
			},
		},
	},
	methods: {
		mergeProps,
		method_event_logout(): void {
			this.storeFirebase.logout_userAuth();
		},
	},
	setup() {
		const storeFirebase = useFirebaseStore();
		const storeCommon = useCommonStore();
		const storeHeader = useHeaderStore();
		return { storeFirebase, storeCommon, storeHeader };
	},
});
</script>
