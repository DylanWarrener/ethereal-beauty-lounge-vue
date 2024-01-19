import { defineStore } from "pinia";

const useEventStore = defineStore("event-store", {
	state: () => ({
		/* Dialogs */
		dialog: {
			login: {
				showDialog: false,
			},
		},
	}),
	getters: {},
	actions: {},
});

export default useEventStore;
