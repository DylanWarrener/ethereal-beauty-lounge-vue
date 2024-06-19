<template>
	<common-btn-container-component
		class="d-none d-md-flex"
		:id="computed_id_appBar_homeBtn"
		:text="computed_text_appBar_homeBtn"
		:to="navigation.home.link"
	></common-btn-container-component>
	<common-btn-container-component
		class="d-none d-md-flex"
		:id="computed_id_appBar_treatmentBtn"
		:text="computed_text_appBar_treatmentBtn"
		:to="navigation.treatments.link"
	></common-btn-container-component>
	<common-btn-container-component
		class="d-none d-md-flex"
		:id="computed_id_appBar_storeBtn"
		:text="computed_text_appBar_storeBtn"
		:to="navigation.store.link"
	></common-btn-container-component>
	<common-btn-menu-container-component>
		<template #menu-btn="{ menuProps, tooltipProps }">
			<common-btn-container-component
				class="d-flex d-md-flex"
				:id="computed_id_appBar_informationBtn"
				:text="computed_text_appBar_informationBtn"
				v-bind="mergeProps(menuProps, tooltipProps)"
				@click="navigation.information.drawer = !navigation.information.drawer"
			></common-btn-container-component>
		</template>
		<template #menu-items>
			<v-list nav variant="text" bg-color="accent" base-color="white" color="black">
				<v-list-item class="text-inverted text-capitalize" :to="navigation.information.items.contact.link">
					<span class="text-default" v-text="navigation.information.items.contact.text"></span>
				</v-list-item>
				<v-list-item class="text-inverted text-capitalize" :to="navigation.information.items.reviews.link">
					<span class="text-default" v-text="navigation.information.items.reviews.text"></span>
				</v-list-item>
				<v-list-item class="text-inverted text-capitalize" :to="navigation.information.items.about.link">
					<span class="text-default" v-text="navigation.information.items.about.text"></span>
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
import { btnIDs, txtRouteNames, txtRouteLinks } from "@constants/common/objects/common-constants-objects.js";

// Icons
import { mdiMenu, mdiMenuUp, mdiMenuDown } from "@constants/common/primitives/icons/common-constants-primative-icons.js";

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
					id: btnIDs.appbar.home,
					text: txtRouteNames.home,
					link: txtRouteLinks.home,
				},
				treatments: {
					id: btnIDs.appbar.treatments,
					text: txtRouteNames.treatments,
					link: txtRouteLinks.treatments,
				},
				store: {
					id: btnIDs.appbar.store,
					text: txtRouteNames.store,
					link: txtRouteLinks.store,
				},
				information: {
					drawer: false,
					id: btnIDs.appbar.information,
					text: "Information",
					icon: mdiMenuDown,
					items: {
						contact: {
							id: btnIDs.appbar.contact,
							text: txtRouteNames.contact,
							link: txtRouteLinks.contact,
						},
						reviews: {
							id: btnIDs.appbar.reviews,
							text: txtRouteNames.reviews,
							link: txtRouteLinks.reviews,
						},
						about: {
							id: btnIDs.appbar.about,
							text: txtRouteNames.about,
							link: txtRouteLinks.about,
						},
					},
				},
			},
		};
	},
	computed: {
		computed_id_appBar_homeBtn(): string {
			return this.navigation.home.id;
		},
		computed_id_appBar_treatmentBtn(): string {
			return this.navigation.treatments.id;
		},
		computed_id_appBar_storeBtn(): string {
			return this.navigation.store.id;
		},
		computed_id_appBar_informationBtn(): string {
			return this.navigation.information.id;
		},
		computed_id_appBar_contactBtn(): string {
			return this.navigation.information.items.contact.id;
		},
		computed_id_appBar_reviewBtn(): string {
			return this.navigation.information.items.reviews.id;
		},
		computed_id_appBar_aboutBtn(): string {
			return this.navigation.information.items.about.id;
		},

		computed_text_appBar_homeBtn(): string {
			return this.navigation.home.text;
		},
		computed_text_appBar_treatmentBtn(): string {
			return this.navigation.treatments.text;
		},
		computed_text_appBar_storeBtn(): string {
			return this.navigation.store.text;
		},
		computed_text_appBar_informationBtn(): string {
			return this.navigation.information.text;
		},
		computed_text_appBar_contactBtn(): string {
			return this.navigation.information.items.contact.text;
		},
		computed_text_appBar_reviewBtn(): string {
			return this.navigation.information.items.reviews.text;
		},
		computed_text_appBar_aboutBtn(): string {
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
