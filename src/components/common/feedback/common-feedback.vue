<template>
	<v-snackbar 
		location="top" 
		:timeout="computed_data_timeout_state" 
		:color="computed_data_backgroundColour_state" 
		v-model="computed_data_show_state">
		<template #text>
			<span class="text-default" v-text="computed_data_message_state"></span>
		</template>
		<template #actions>
			<container-btn
				:color="computed_data_btnColor_state"
				:text="computed_text_btnText"
				@click="computed_data_show_state = false"
			></container-btn>
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
		return {};
	},
	computed: {
		computed_text_btnText(): string {
			return this.storeCommon.getSnackbar_btnText_state;
		},

		computed_data_timeout_state(): number {
			return this.storeCommon.getSnackbar_timeout_state;
		},
		computed_data_backgroundColour_state(): string {
			return this.storeCommon.getSnackbar_backgroundColour_state;
		},
		computed_data_message_state(): string {
			return this.storeCommon.getSnackbar_message_state;
		},
		computed_data_btnColor_state(): string {
			return this.storeCommon.getSnackbar_btnColour_state;
		},
		computed_data_show_state: {
			get(): boolean {
				return this.storeCommon.getSnackbar_show_state;
			},
			set(newValue: boolean): void {
				this.storeCommon.setSnackbar_show_state(newValue);
			},
		}
	},
	setup() {
		const storeCommon = useCommonStore();
		return { storeCommon };
	},
});
</script>
