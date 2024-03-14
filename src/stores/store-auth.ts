import { defineStore } from "pinia";

// Firebase
import { onAuthStateChanged } from "firebase/auth";
import type { Auth, User } from "firebase/auth";

const useAuthStore = defineStore("auth-store", {
	state: (): { isUserLoggedIn: boolean } => ({
		isUserLoggedIn: false,
	}),
	getters: {
		getIsUserLoggedIn: (state): boolean => {
			return state.isUserLoggedIn;
		},
	},
	actions: {
		monitorAuthState(payload: { auth: Auth }): void {
			onAuthStateChanged(payload.auth, (user: User | null) => {
				const isUserValid: boolean = !!user;
				this.setLoginStatus(isUserValid);
			});
		},
		setLoginStatus(newValue: boolean): void {
			this.isUserLoggedIn = newValue;
		},
	},
});

export default useAuthStore;
