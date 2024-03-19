<template>
	<v-btn class="nav-text__underline d-none d-md-flex" :to="navigation.home.link">
		{{ navigation.home.text }}
	</v-btn>
	<v-btn class="nav-text__underline d-none d-md-flex" :to="navigation.treatments.link">
		{{ navigation.treatments.text }}
	</v-btn>
	<v-btn class="nav-text__underline d-none d-md-flex" :to="navigation.store.link">
		{{ navigation.store.text }}
	</v-btn>
	<button-text-menu-container-component
		btn-class="d-none d-md-flex"
		menu-transition="slide-y-transition"
		:btn-append-icon="navigation.information.drawer ? iconArrowUp : iconArrowDown"
		:btn-text="navigation.information.text"
		@toggle-menu-drawer="navigation.information.drawer = !navigation.information.drawer"
	>
		<template #menu-items>
			<v-list nav variant="text" bg-color="accent" base-color="white" color="black">
				<v-list-item class="text-inverted text-uppercase" :to="navigation.information.items.contact.link">
					<span class="text-uppercase" v-text="navigation.information.items.contact.text"></span>
				</v-list-item>
				<v-list-item class="text-inverted text-uppercase" :to="navigation.information.items.reviews.link">
					<span class="text-uppercase" v-text="navigation.information.items.reviews.text"></span>
				</v-list-item>
				<v-list-item class="text-inverted text-uppercase" :to="navigation.information.items.about.link">
					<span class="text-uppercase" v-text="navigation.information.items.about.text"></span>
				</v-list-item>
			</v-list>
		</template>
	</button-text-menu-container-component>
</template>

<script lang="ts">
import { defineComponent } from "vue";

// Components
import BtnTextMenuContainerComp from "@components/common/button/menu/common-button-text-menu.vue";

// Constants
import { txtRouteNames, txtRouteLinks } from "@constants/common/objects/common-constants-objects.js";

// Icons
import { mdiMenu, mdiMenuUp, mdiMenuDown } from "@constants/common/primitives/icons/common-constants-primative-icons.js";

export default defineComponent({
	name: "navigation-pages-non-mobile-menu-container-component",
	components: {
		"button-text-menu-container-component": BtnTextMenuContainerComp,
	},
	data() {
		return {
			navigation: {
				home: {
					text: txtRouteNames.home,
					link: txtRouteLinks.home,
				},
				treatments: {
					text: txtRouteNames.treatments,
					link: txtRouteLinks.treatments,
				},
				store: {
					text: txtRouteNames.store,
					link: txtRouteLinks.store,
				},
				information: {
					drawer: false,
					text: "Information",
					icon: mdiMenuDown,
					items: {
						contact: {
							text: txtRouteNames.contact,
							link: txtRouteLinks.contact,
						},
						reviews: {
							text: txtRouteNames.reviews,
							link: txtRouteLinks.reviews,
						},
						about: {
							text: txtRouteNames.about,
							link: txtRouteLinks.about,
						},
					},
				},
			},
		};
	},
	computed: {
		iconArrowUp(): string {
			return mdiMenuUp;
		},
		iconArrowDown(): string {
			return mdiMenuDown;
		},
	},
});
</script>
