<template>
	<common-btn-container-component
		class="d-none d-md-flex"
		:text="computed_text_appBar_btnHome"
		:to="computed_link_appBar_homeBtn"
	></common-btn-container-component>
	<common-btn-container-component
		class="d-none d-md-flex"
		:text="computed_text_appBar_btnTreatments"
		:to="computed_link_appBar_treatmentBtn"
	></common-btn-container-component>
	<common-btn-container-component
		class="d-none d-md-flex"
		:text="computed_text_appBar_btnStore"
		:to="computed_link_appBar_storeBtn"
	></common-btn-container-component>
	<common-btn-menu-container-component>
		<template #menu-btn="{ menuProps, tooltipProps }">
			<common-btn-container-component
				class="d-flex d-md-flex"
				:text="computed_text_appBar_btnInformation"
				v-bind="mergeProps(menuProps, tooltipProps)"
				@click="navigation.information.drawer = !navigation.information.drawer"
			></common-btn-container-component>
		</template>
		<template #menu-items>
			<v-list nav variant="text" bg-color="accent" base-color="white" color="black">
				<v-list-item class="text-inverted text-capitalize" :to="computed_link_appBar_contactBtn">
					<span class="text-default" v-text="computed_text_appBar_btnContact"></span>
				</v-list-item>
				<v-list-item class="text-inverted text-capitalize" :to="computed_link_appBar_reviewBtn">
					<span class="text-default" v-text="computed_text_appBar_btnReviews"></span>
				</v-list-item>
				<v-list-item class="text-inverted text-capitalize" :to="computed_link_appBar_aboutBtn">
					<span class="text-default" v-text="computed_text_appBar_btnAbout"></span>
				</v-list-item>
			</v-list>
		</template>
	</common-btn-menu-container-component>
</template>

<script lang="ts">
import { defineComponent, mergeProps } from "vue";

// Components
import BtnContainerComp from "@components/common/button/common-btn.vue";
import BtnMenuContainerComp from "@components/common/menu/common-menu.vue";

// Constants
import { CONST_OBJECT_TEXT_ROUTE_NAMES, CONST_OBJECT_TEXT_ROUTE_LINKS } from "@constants/common/objects/common-constants-objects.js";

// Icons
import { mdiMenuUp, mdiMenuDown } from "@constants/common/primitives/icons/common-constants-primative-icons.js";

export default defineComponent({
	name: "navigation-pages-non-mobile-menu-container-component",
	components: {
		"common-btn-container-component": BtnContainerComp,
		"common-btn-menu-container-component": BtnMenuContainerComp,
	},
	data() {
		return {
			navigation: {
				home: {
					text: CONST_OBJECT_TEXT_ROUTE_NAMES.home,
					link: CONST_OBJECT_TEXT_ROUTE_LINKS.home,
				},
				treatments: {
					text: CONST_OBJECT_TEXT_ROUTE_NAMES.treatments,
					link: CONST_OBJECT_TEXT_ROUTE_LINKS.treatments,
				},
				store: {
					text: CONST_OBJECT_TEXT_ROUTE_NAMES.store,
					link: CONST_OBJECT_TEXT_ROUTE_LINKS.store,
				},
				information: {
					drawer: false,
					text: "Information",
					icon: mdiMenuDown,
					items: {
						contact: {
							text: CONST_OBJECT_TEXT_ROUTE_NAMES.contact,
							link: CONST_OBJECT_TEXT_ROUTE_LINKS.contact,
						},
						reviews: {
							text: CONST_OBJECT_TEXT_ROUTE_NAMES.reviews,
							link: CONST_OBJECT_TEXT_ROUTE_LINKS.reviews,
						},
						about: {
							text: CONST_OBJECT_TEXT_ROUTE_NAMES.about,
							link: CONST_OBJECT_TEXT_ROUTE_LINKS.about,
						},
					},
				},
			},
		};
	},
	computed: {
		computed_text_appBar_btnHome(): string {
			return this.navigation.home.text;
		},
		computed_text_appBar_btnTreatments(): string {
			return this.navigation.treatments.text;
		},
		computed_text_appBar_btnStore(): string {
			return this.navigation.store.text;
		},
		computed_text_appBar_btnInformation(): string {
			return this.navigation.information.text;
		},
		computed_text_appBar_btnContact(): string {
			return this.navigation.information.items.contact.text;
		},
		computed_text_appBar_btnReviews(): string {
			return this.navigation.information.items.reviews.text;
		},
		computed_text_appBar_btnAbout(): string {
			return this.navigation.information.items.about.text;
		},

		computed_link_appBar_homeBtn(): string {
			return this.navigation.home.link;
		},
		computed_link_appBar_treatmentBtn(): string {
			return this.navigation.treatments.link;
		},
		computed_link_appBar_storeBtn(): string {
			return this.navigation.store.link;
		},
		computed_link_appBar_contactBtn(): string {
			return this.navigation.information.items.contact.link;
		},
		computed_link_appBar_reviewBtn(): string {
			return this.navigation.information.items.reviews.link;
		},
		computed_link_appBar_aboutBtn(): string {
			return this.navigation.information.items.about.link;
		},

		computed_icon_arrowUp(): string {
			return mdiMenuUp;
		},
		computed_icon_arrowDown(): string {
			return mdiMenuDown;
		},
	},
	methods: {
		mergeProps,
	},
});
</script>
