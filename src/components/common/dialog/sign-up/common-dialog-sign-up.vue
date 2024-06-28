<template>
	<container-dialog
		:toolbar-title="computed_data_dialog_signUpCard_content_signUpForm_toolbarTitle_state"
		@close="computed_data_appbar_btnSignUp_show_state = false"
		v-model="computed_data_appbar_btnSignUp_show_state"
	>
		<template #dialog-card-content>
			<component :is="computed_data_dialog_signUpCard_content_signUpForm_selectedComponent_state"></component>
		</template>
		<template #dialog-card-actions>
			<v-spacer></v-spacer>
			<container-btn
				variant="flat"
				type="submit"
				:text="computed_text_dialog_btnSubmitForm_local"
				:disabled="!computed_data_dialog_signUpCard_content_signUpForm_valid_state"
				:loading="computed_data_dialog_signUpCard_content_signUpForm_btnSignUp_isLoading_state"
				@click="method_event_dialog_signUpCard_actions_signUpForm_btnSignUp_clickHandler"
			></container-btn>
		</template>
	</container-dialog>
</template>

<script lang="ts">
import { defineComponent, mergeProps } from "vue";

// Stores
import useCommonStore from "@stores/store-common.js";
import useHeaderStore from "@stores/store-header.js";
import useFirebaseStore from "@stores/store-firebase.js";

export default defineComponent({
	name: "dialog-sign-in-container-component",
	components: {},
	data(): any {
		return {};
	},
	computed: {},
	methods: {},
	setup() {
		const storeFirebase = useFirebaseStore();
		const storeCommon = useCommonStore();
		const storeHeader = useHeaderStore();

		return { storeFirebase, storeCommon, storeHeader };
	},
});
</script>
