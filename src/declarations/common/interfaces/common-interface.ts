// Interfaces
import IDialogState from "@declarations/common/dialog/interfaces/common-interface-dialog.js";
import type { UserCredential, User } from "firebase/auth";

export default interface ICommonState {
	appBarDrawer: boolean;
	dialog: IDialogState;
	navigation: {};
}
