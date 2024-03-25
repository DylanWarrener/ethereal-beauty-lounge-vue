<template>
	<v-card elevation="0" class="h-100" style="border: 2px solid green">
		<v-container fluid style="border: 2px solid black">
			<v-row dense style="border: 2px solid red">
				<v-col cols="12" class="d-flex flex-column justify-center align-center" style="border: 2px solid blue">
					<!-- Avatar -->
					<v-hover>
						<template v-slot:default="{ isHovering, props }">
							<v-card
								hover
								elevation="0"
								class="rounded-circle"
								style="position: relative"
								width="150"
								height="150"
								:image="computed_img_canvas"
								v-bind="props"
							></v-card>
							<v-icon id="edit-img" :class="isHovering ? '' : ''" :icon="computed_icon"></v-icon>
						</template>
					</v-hover>
				</v-col>
			</v-row>
		</v-container>
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

<style lang="scss">
#edit-img {
	position: absolute;
}
</style>
