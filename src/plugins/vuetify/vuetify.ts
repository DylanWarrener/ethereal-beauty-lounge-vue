// Vuetify
import { createVuetify } from "vuetify";
import {
	VLayout,
	VSystemBar,
	VAppBar,
	VAppBarNavIcon,
	VAppBarTitle,
	VBtn,
	VNavigationDrawer,
	VMenu,
	VList,
	VListItem,
	VListSubheader,
	VMain,
	VContainer,
	VRow,
	VCol,
	VSheet,
	VParallax,
	VCard,
	VCardItem,
	VCardTitle,
	VCardSubtitle,
	VCardText,
	VCardActions,
	VHover,
	VSpacer,
	VSelect,
	VDivider,
	VCarousel,
	VCarouselItem,
	VTextField,
	VIcon,
	VRating,
	VProgressLinear,
	VTooltip,
	VImg,
	VForm,
	VTextarea,
	VDatePicker,
	VDialog,
	VToolbar,
	VFooter,
} from "vuetify/components";
import { VExpandTransition } from "vuetify/components/transitions";
import { Resize, Ripple } from "vuetify/directives";

// Material design icons
import { aliases, mdi } from "vuetify/iconsets/mdi-svg";

// Themes
import { light } from "@themes/themes.js";

// Styles
import "vuetify/styles";
import "@styles/scss/main.scss";

const vuetify = createVuetify({
	icons: {
		defaultSet: "mdi",
		aliases,
		sets: { mdi },
	},
	theme: {
		defaultTheme: "light",
		themes: { light },
	},
	components: {
		// Components
		VLayout,
		VSystemBar,
		VAppBar,
		VAppBarNavIcon,
		VAppBarTitle,
		VBtn,
		VNavigationDrawer,
		VMenu,
		VList,
		VListItem,
		VListSubheader,
		VMain,
		VContainer,
		VRow,
		VCol,
		VSheet,
		VParallax,
		VCard,
		VCardItem,
		VCardTitle,
		VCardSubtitle,
		VCardText,
		VCardActions,
		VHover,
		VSpacer,
		VSelect,
		VDivider,
		VCarousel,
		VCarouselItem,
		VTextField,
		VIcon,
		VRating,
		VProgressLinear,
		VTooltip,
		VImg,
		VForm,
		VTextarea,
		VDatePicker,
		VDialog,
		VToolbar,
		VFooter,

		// Transitions
		VExpandTransition,
	},
	directives: {
		Resize,
		Ripple,
	},
});

export default vuetify;
