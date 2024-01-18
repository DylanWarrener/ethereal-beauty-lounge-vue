export default interface IDialogState {
	default: IDialogDefaultState;
	login: IDialogLoginState;
}
export interface IDialogDefaultState {
	icons: {
		close: {
			icon: string;
			tooltip: string;
		};
	};
}
export interface IDialogLoginState {
	showTooltip: boolean;
	showDialog: boolean;
}
