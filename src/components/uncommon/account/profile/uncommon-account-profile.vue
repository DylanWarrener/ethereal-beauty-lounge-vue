<template>
	<v-card elevation="0" class="h-100 bg-accent" style="border: 2px solid green">
		<v-container fluid style="border: 2px solid black">
			<v-row dense style="border: 2px solid red">
				<v-col cols="12" class="d-flex flex-column justify-center align-center" style="border: 2px solid blue">
					<!-- Avatar -->
					<v-hover>
						<template v-slot:default="{ isHovering, props }">
							<div class="h-100" style="position: relative; border: 2px solid red" v-bind="props">
								<v-card
									hover
									class="rounded-circle d-flex justify-center align-center"
									:style="isHovering ? 'background-color: rgba(0, 0, 0, 0.75)' : ''"
									width="150"
									height="150"
								>
									<span class="text-inverted text-h3" style="cursor: pointer" v-show="!isHovering">
										DW
									</span>
									<v-expand-transition>
										<div
											class="w-100 h-100 d-flex justify-center align-center rounded-circle"
											style="position: absolute; border: 2px solid red"
											v-show="isHovering"
										>
											<v-tooltip location="bottom" text="Edit picture">
												<template v-slot:activator="{ props }">
													<v-btn
														variant="flat"
														class="bg-transparent"
														:icon="computed_icon"
														v-bind="props"
														v-show="isHovering"
													>
														<template v-slot:default>
															<v-icon size="32"></v-icon>
														</template>
													</v-btn>
												</template>
											</v-tooltip>
										</div>
									</v-expand-transition>
								</v-card>
							</div>
						</template>
					</v-hover>
				</v-col>

				<!-- Profile info -->
				<v-col cols="12" style="border: 2px solid blue">
					<v-list>
						<v-list-subheader>Information</v-list-subheader>
						<v-list-item></v-list-item>
					</v-list>
				</v-col>
			</v-row>
		</v-container>
		<v-card-actions>
			<v-btn variant="flat" class="text-inverted">Save</v-btn>
		</v-card-actions>
	</v-card>
</template>

<script lang="ts">
import { defineComponent } from "vue";

// Icons
import { iconsAccountProfile } from "@constants/common/objects/common-constants-objects";

// IMGs
import CanvasPNG from "@assets/jpg/temp.jpg";

export default defineComponent({
	name: "uncommon-account-profile-component",
	data() {
		return {
			profile: {
				info: {},
			},
		};
	},
	computed: {
		computed_icon(): string {
			return iconsAccountProfile.editImage;
		},
		computed_img_canvas(): string {
			return CanvasPNG;
		},
	},
});
</script>
