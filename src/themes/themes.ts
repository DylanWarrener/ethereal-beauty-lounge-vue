// Colours
//import colors from "vuetify/lib/util/colors.mjs";

const colours = {
	primary: "#8E898D",
	secondary: "#3C354E",
	accent: "#BA7791",
	white: "#FFFFFF",
	black: "#000000",
	red: "#FF0000",
	green: "#00FF00",
	blue: "#0000FF",
	yellow: "#FFFF00",
	orange: "#FFA500",
};

export const light = {
	dark: false,
	colors: {
		default: colours.white,
		inverted: colours.black,
		primary: colours.black,
		secondary: colours.white,
		accent: colours.accent,
		white: colours.white,
		black: colours.black,
		error: colours.red,
		warning: colours.orange,
		success: colours.green,
	},
};
