import { defineStore } from "pinia";

// Firebase
import { getAuth, onAuthStateChanged } from "firebase/auth";

const auth = getAuth();
const useAuthStore = defineStore("auth-store", {
	state: () => ({
        user: {
            id: ""
        }
    }),
	getters: {},
	actions: {
        trackAuthChanges(): void {
            onAuthStateChanged(auth, (user) => {
                this.user.id = user ? user.uid : "";
            });
        }
    },
});

export default useAuthStore;
