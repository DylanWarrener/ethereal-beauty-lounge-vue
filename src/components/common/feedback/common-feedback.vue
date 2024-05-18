<template>
	<v-snackbar
		location="top"
		:color="computed_data_color_value"
		:timeout="computed_data_timeout_value"
		v-model="computed_data_show_value"
	>
		<template v-slot:text>
			<span class="text-default" v-text="computed_data_message_value"></span>
		</template>
		<template v-slot:actions>
			<v-btn
				variant="text"
				:text="feedback.btnText"
				:color="computed_data_btnColor_value"
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
		computed_data_show_value: {
			get(): boolean {
				return this.storeCommon.getSnackbar_show_value;
			},
			set(newValue: boolean): void {
				this.storeCommon.setSnackbar_show_value(newValue);
			},
		},
		computed_data_timeout_value: {
			get(): number {
				return this.storeCommon.getSnackbar_timeout_value;
			},
			set(newValue: number): void {
				this.storeCommon.setSnackbar_timeout_value(newValue);
			},
		},
		computed_data_color_value: {
			get(): string {
				return this.storeCommon.getSnackbar_color_value;
			},
			set(newValue: string): void {
				this.storeCommon.setSnackbar_color_value(newValue);
			},
		},
		computed_data_btnColor_value: {
			get(): string {
				return this.storeCommon.getSnackbar_btnColor_value;
			},
			set(newValue: string): void {
				this.storeCommon.setSnackbar_btnColor_value(newValue);
			},
		},
		computed_data_message_value: {
			get(): string {
				return this.storeCommon.getSnackbar_message_value;
			},
			set(newValue: string): void {
				this.storeCommon.setSnackbar_message_value(newValue);
			},
		},
	},
	methods: {
		method_event_closeSnackbar(): void {
			this.computed_data_show_value = false;
		},
	},
	setup() {
		const storeCommon = useCommonStore();
		return { storeCommon };
	},
});
</script>
