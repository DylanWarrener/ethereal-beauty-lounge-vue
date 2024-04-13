<template>
	<v-snackbar :color="color" :timeout="computed_data_defaultTimeout">
		<template v-slot:text>
			<span class="text-default" v-text="text"></span>
		</template>
		<template v-slot:actions>
			<v-btn color="red" variant="text" text="Close" @click="method_event_emitSnackbarClose"></v-btn>
		</template>
	</v-snackbar>
</template>

<script lang="ts">
import { defineComponent } from "vue";

// Stores
import useCommonStore from "@stores/store-common.js";

export default defineComponent({
	name: "common-snackbar-container-component",
	props: {
		color: { type: String, required: true },
		text: { type: String, required: true },
		timeout: { type: Number, required: false },
	},
	computed: {
		computed_data_defaultTimeout(): number {
			return this.timeout ? this.timeout : this.method_utils_getSnackbarTimeoutDefaultValue();
		},
	},
	methods: {
		method_event_emitSnackbarClose(): void {
			this.$emit("close", false);
		},

		method_utils_getSnackbarTimeoutDefaultValue(): number {
			return this.storeCommon.getSnackbarTimeoutDefaultValue ?? 3000;
		},
	},
	setup() {
		const storeCommon = useCommonStore();
		return { storeCommon };
	},
});
</script>
