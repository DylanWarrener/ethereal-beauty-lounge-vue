// Colours
//import colors from "vuetify/lib/util/colors.mjs";
import { type ThemeDefinition } from "vuetify";

const colours = {
	primary: "#5a5a54",
	secondary: "#202020",
	accent: "#cc9090",
	white: "#FFFFFF",
	black: "#000000",
	red: "#FF0000",
	green: "#00FF00",
	blue: "#0000FF",
	yellow: "#FFFF00",
	orange: "#FFA500",
};

export const light: ThemeDefinition = {
	dark: false,
	colors: {
		default: colours.white,
		inverted: colours.black,
		primary: colours.primary,
		'primary-shade-1': "#43433F",
		'primary-shade-2': "#2D2D2A",
		'primary-shade-3': "#161615",
		'primary-tone-1': "#64645F",
		'primary-tone-2': "#6D6D6A",
		'primary-tone-3': "#777775",
		'primary-tint-1': "#85857D",
		'primary-tint-2': "#ADADA8",
		'primary-tint-3': "#D6D6D4",
		secondary: colours.secondary,
		'secondary-shade-1': "#191919",
		'secondary-shade-2': "#111111",
		'secondary-shade-3': "#080808",
		'secondary-tone-1': "#383838",
		'secondary-tone-2': "#505050",
		'secondary-tone-3': "#686868",
		'secondary-tint-1': "#595959",
		'secondary-tint-2': "#909090",
		'secondary-tint-3': "#C8C8C8",
		accent: colours.accent,
		white: colours.white,
		black: colours.black,
		error: colours.red,
		warning: colours.orange,
		success: colours.green,
	},
	variables: {
		
	}
};
