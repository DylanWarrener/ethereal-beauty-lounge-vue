import { createPinia, defineStore } from "pinia";

const pinia = createPinia();

// Main store
export const useCommonStore = defineStore("common-store", {
	state: () => ({}),
	getters: {},
	actions: {},
});

export default pinia;
