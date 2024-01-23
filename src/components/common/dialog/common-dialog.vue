<template>
	<v-dialog transition="dialog-top-transition" :max-width="maxWidth" :max-height="maxHeight" v-model="dialogDrawer">
		<slot name="dialog-content"></slot>
	</v-dialog>
</template>

<script lang="ts">
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
