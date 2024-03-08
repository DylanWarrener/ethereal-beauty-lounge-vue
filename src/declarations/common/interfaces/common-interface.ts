import IDialogState from "@declarations/common/dialog/interfaces/common-interface-dialog.js";

export default interface ICommonState {
	user: {
		id: string | null,
		token: string | null,
		tokenExpiration: string | null;
	};
	appBar: {};
	appBarHeight: number;
	appBarDrawer: boolean;
	dialog: IDialogState;
}

export interface IValidate {
	validate: () => boolean;
}