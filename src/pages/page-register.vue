<template>
	<common-section-container-component
		class-title="text-inverted"
		class-subtitle="text-inverted font-weight-regular"
		style-container="margin-top: 64px"
		title="Register your account"
		subtitle="By creating an account you agree to our Terms of Service, and have read and understood the Privacy Policy."
	>
		<template #section-content>
			<v-container fluid>
				<v-row dense>
					<v-col class="d-flex flex-column justify-center align-center">
						<v-card elevation="0" class="w-100 d-flex flex-column justify-center">
							<common-form-register-container-component></common-form-register-container-component>
						</v-card>
					</v-col>
				</v-row>
			</v-container>
		</template>
	</common-section-container-component>
</template>

<script lang="ts">
import { defineComponent } from "vue";

// Components
import SectionContainerComp from "@components/common/section/common-section.vue";
import RegisterContainerComp from "@components/common/form/register/common-form-register.vue";

export default defineComponent({
	name: "register-page-container-component",
	components: {
		"common-section-container-component": SectionContainerComp,
		"common-form-register-container-component": RegisterContainerComp,
	},
});
</script>
