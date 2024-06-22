// Vuetify
import { createVuetify } from "vuetify";
import {
	VLayout,
	VSystemBar,
	VSnackbar,
	VAppBar,
	VAppBarNavIcon,
	VAppBarTitle,
	VAvatar,
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
	VSlideGroup,
	VSlideGroupItem,
	VWindow,
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
	VSwitch,
	VDatePicker,
	VDialog,
	VToolbar,
	VChip,
	VChipGroup,
	VItem,
	VItemGroup,
	VFooter,
} from "vuetify/components";
import ContainerBtn from "@components/common/button/common-btn.vue";
import ContainerCard from "@components/common/card/common-card.vue";
import ContainerNavigation from "@components/common/navigation/common-navigation.vue";
import ContainerCanvas from "@components/common/canvas/common-canvas.vue";
import ContainerDivider from "@components/common/divider/common-divider.vue";
import ContainerSection from "@components/common/section/common-section.vue";
import ContainerDialog from "@components/common/dialog/common-dialog.vue";
import ContainerMenu from "@components/common/menu/common-menu.vue";
import ContainerForm from "@components/common/form/common-form.vue";
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
		variations: {
			colors: ["primary", "secondary"],
			lighten: 1,
			darken: 2,
		},
		themes: { light },
	},
	components: {
		// Components
		VLayout,
		VSystemBar,
		VSnackbar,
		VAppBar,
		VAppBarNavIcon,
		VAppBarTitle,
		VAvatar,
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
		VSlideGroup,
		VSlideGroupItem,
		VWindow,
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
		VSwitch,
		VDatePicker,
		VDialog,
		VToolbar,
		VChip,
		VChipGroup,
		VItem,
		VItemGroup,
		VFooter,
		// Custom components
		ContainerBtn,
		ContainerCard,
		ContainerNavigation,
		ContainerCanvas,
		ContainerDivider,
		ContainerSection,
		ContainerDialog,
		ContainerMenu,
		ContainerForm,

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
