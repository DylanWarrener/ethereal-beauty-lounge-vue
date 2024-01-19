<template>
	<v-dialog transition="dialog-top-transition" :max-width="maxWidth" :max-height="maxHeight" v-model="dialogDrawer">
		<card-container-component>
			<template #header>
				<v-toolbar color="accent" style="position: fixed; z-index: 1">
					<v-spacer></v-spacer>
					<slot name="toolbar-items"></slot>
				</v-toolbar>
			</template>
		</card-container-component>
	</v-dialog>
</template>

<script lang="ts">
/*
<v-card>
			<v-toolbar color="accent" style="position: fixed; z-index: 1">
				<v-spacer></v-spacer>
				<slot name="toolbar-items"></slot>
			</v-toolbar>
			<v-card-text class="mt-16" style="border: 2px solid red">
				<v-container style="border: 2px solid blue">
					<v-row dense class="ga-4" style="border: 2px solid green">
						<slot name="content"></slot>
					</v-row>
				</v-container>
			</v-card-text>
		</v-card>
*/
import { defineComponent } from "vue";

// Stores
import useEventStore from "@stores/store-events.js";

// Components
import ImgComp from "@components/common/img/common-img.vue";

export default defineComponent({
	name: "dialog-component",
	components: {
		"img-container-component": ImgComp,
	},
	props: {
		dialogState: { type: Boolean, required: true },
	},
	data() {
		return {
			dialogDrawer: false,
		};
	},
	computed: {
		/* CSS */
		maxWidth(): string {
			let retVal: string = "";
			switch (this.$vuetify.display.name) {
				case "xs":
				case "sm":
					retVal = "80%";
					break;
				case "md":
				case "lg":
				case "xl":
				case "xxl":
					retVal = "50%";
					break;
			}
			return retVal;
		},
		maxHeight(): string {
			let retVal: string = "";
			switch (this.$vuetify.display.name) {
				case "xs":
				case "sm":
				case "md":
				case "lg":
				case "xl":
				case "xxl":
					retVal = "80%";
					break;
			}
			return retVal;
		},
	},
	watch: {
		dialogState(): void {
			this.dialogDrawer = this.dialogState;
		},
	},
	setup() {
		const storeEvent = useEventStore();
		return { storeEvent };
	},
});
</script>
