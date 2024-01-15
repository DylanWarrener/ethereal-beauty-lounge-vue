<template>
	<v-layout style="border: 2px solid red">
		<header-component style="border: 2px solid blue"></header-component>
		<v-main style="border: 2px solid black">
			<router-view style="border: 2px solid orange"></router-view>
		</v-main>
		<footer-component style="border: 2px solid green"></footer-component>
	</v-layout>
</template>

<script lang="ts">
import { defineComponent } from "vue";

// Components
import HeaderComp from "@components/common/header/common-header.vue";
import FooterComp from "@components/common/footer/common-footer.vue";

export default defineComponent({
	name: "app-component",
	components: {
		"header-component": HeaderComp,
		"footer-component": FooterComp,
	},
});
</script>
