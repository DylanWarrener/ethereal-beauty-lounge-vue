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
	VListItemTitle,
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
	VSvgIcon,
	VForm,
	VTextarea,
	VDatePicker,
	VDialog,
	VToolbar,
	VChip,
	VChipGroup,
	VItem,
	VItemGroup,
	VFooter,
} from "vuetify/components";
import { VExpandTransition } from "vuetify/components/transitions";
import { Resize, Ripple, Scroll } from "vuetify/directives";

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
		VListItemTitle,
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
		VSvgIcon,
		VForm,
		VTextarea,
		VDatePicker,
		VDialog,
		VToolbar,
		VChip,
		VChipGroup,
		VItem,
		VItemGroup,
		VFooter,

		// Transitions
		VExpandTransition,
	},
	directives: {
		Resize,
		Ripple,
		Scroll,
	},
});

export default vuetify;
