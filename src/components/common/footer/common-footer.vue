<template><p>Footer</p></template>

<script lang="ts">
import { defineComponent } from "vue";

import useFooterStore from "@stores/store-footer.js";

export default defineComponent({
	name: "footer-component",
	setup() {
		const storeHeader = useFooterStore();
		return { storeHeader };
	},
});
</script>
