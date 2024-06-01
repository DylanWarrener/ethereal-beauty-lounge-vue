export default interface ICommon_firebase_state {
	user: ICommon_firebase_user_state;
	dialogs: ICommon_firebase_dialogs_state
};

/* User */
export interface ICommon_firebase_user_state {
	isLoggedIn: boolean;
	notifications: ICommon_firebase_user_notifications_state;
	authData: ICommon_firebase_user_auth_state;
	firestoreData: ICommon_firebase_user_firestore_state;
};
// Notifications
export interface ICommon_firebase_user_notifications_state {
	treatments: {
		isEnabled: boolean;
	};
	store: {
		isEnabled: boolean;
	};
	promotions: {
		isEnabled: boolean;
	};
	unsubscribeToAll: {
		isEnabled: boolean;
	};
};
// Auth
export interface ICommon_firebase_user_auth_state {
	uid: string | null;
	displayName: string | null;
	email: string | null;
	emailVerified: boolean;
	photoURL?: string | null | undefined;
	isAnonymous: boolean;
	joinedOn: string | null;
};
// Firestore
export interface ICommon_firebase_user_firestore_state {
	title: string | null;
	firstname: string | null;
	lastname: string | null;
	phoneNumber: number | null;
};

/* Dialogs */
export interface ICommon_firebase_dialogs_state {};