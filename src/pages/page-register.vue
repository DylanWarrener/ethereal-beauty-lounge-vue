<template>
	<container-canvas :src="computed_data_canvas_img">
		<template #canvas-content>
			<v-container fluid class="pa-4 fill-height">
				<v-row dense class="d-flex justify-center">
					<v-col cols="12" md="8">
						<container-card variant="flat" style="background-color: rgba(0, 0, 0, 0.3)">
							<template #card-headings>
								<v-card-item class="pa-4">
									<v-card-title class="text-wrap">
										<h1>Register</h1>
									</v-card-title>
									<v-card-subtitle class="text-wrap">
										<h3>Register for Ethereal Beauty Lounge.</h3>
									</v-card-subtitle>
								</v-card-item>
							</template>
							<template #card-actions>
								<v-card-actions class="pa-4">
									<v-spacer></v-spacer>
									<v-btn
										variant="flat"
										size="large"
										color="accent"
										text="register now?"
										@click="method_event_scrollToElement('section-register')"
									></v-btn>
								</v-card-actions>
							</template>
						</container-card>
					</v-col>
				</v-row>
			</v-container>
		</template>
	</container-canvas>

	<container-divider></container-divider>

	<container-section
		id="section-register"
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
	</container-section>
</template>

<script lang="ts">
import { defineComponent } from "vue";

/* Components */
import RegisterContainerComp from "@components/common/form/register/common-form-register.vue";

/* IMGs */
import CanvasPNG from "@assets/jpg/temp.jpg";

export default defineComponent({
	name: "register-page-container-component",
	components: {
		"common-form-register-container-component": RegisterContainerComp,
	},
	computed: {
		computed_data_canvas_img(): string {
			return CanvasPNG;
		},
	},
	methods: {
		/* Events */
		method_event_scrollToElement(targetElement: string): void {
			const targetElementID: HTMLDivElement = document.getElementById(targetElement) as HTMLDivElement;

			if (targetElementID) {
				window.scrollTo({
					top: targetElementID.offsetTop,
					behavior: "smooth",
				});
			}
		},
	},
});
</script>
