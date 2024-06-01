<template>
	<v-snackbar
		location="top"
		:color="computed_data_color_state"
		:timeout="computed_data_timeout_state"
		v-model="computed_data_show_state"
	>
		<template v-slot:text>
			<span class="text-default" v-text="computed_data_message_state"></span>
		</template>
		<template v-slot:actions>
			<v-btn
				variant="text"
				:text="feedback.btnText"
				:color="computed_data_btnColor_state"
				@click="method_event_closeSnackbar"
			></v-btn>
		</template>
	</v-snackbar>
</template>

<script lang="ts">
import { defineComponent } from "vue";

// Stores
import useCommonStore from "@stores/store-common.js";

export default defineComponent({
	name: "user-feedback-container-component",
	data() {
		return {
			feedback: {
				btnText: "Close",
			},
		};
	},
	computed: {
		computed_data_show_state: {
			get(): boolean {
				return this.storeCommon.getSnackbar_show_state;
			},
			set(newValue: boolean): void {
				this.storeCommon.setSnackbar_show_state(newValue);
			},
		},
		computed_data_timeout_state: {
			get(): number {
				return this.storeCommon.getSnackbar_timeout_state;
			},
			set(newValue: number): void {
				this.storeCommon.setSnackbar_timeout_state(newValue);
			},
		},
		computed_data_color_state: {
			get(): string {
				return this.storeCommon.getSnackbar_color_state;
			},
			set(newValue: string): void {
				this.storeCommon.setSnackbar_color_state(newValue);
			},
		},
		computed_data_btnColor_state: {
			get(): string {
				return this.storeCommon.getSnackbar_btnColor_state;
			},
			set(newValue: string): void {
				this.storeCommon.setSnackbar_btnColor_state(newValue);
			},
		},
		computed_data_message_state: {
			get(): string {
				return this.storeCommon.getSnackbar_message_state;
			},
			set(newValue: string): void {
				this.storeCommon.setSnackbar_message_state(newValue);
			},
		},
	},
	methods: {
		method_event_closeSnackbar(): void {
			this.computed_data_show_state = false;
		},
	},
	setup() {
		const storeCommon = useCommonStore();
		return { storeCommon };
	},
});
</script>
