<template>
	<v-layout>
		<dialog-login-component></dialog-login-component>
		<!-- <header-container-component></header-container-component> -->
		<v-main>
			<router-view></router-view>
		</v-main>
		<footer-container-component></footer-container-component>
	</v-layout>
</template>

<script lang="ts">
import { defineComponent } from "vue";

// Components
import DialogLoginComp from "@components/uncommon/dialog/uncommon-dialog-login.vue";
import HeaderComp from "@components/common/header/common-header.vue";
import FooterComp from "@components/common/footer/common-footer.vue";

export default defineComponent({
	name: "app-component",
	components: {
		"dialog-login-component": DialogLoginComp,
		"header-container-component": HeaderComp,
		"footer-container-component": FooterComp,
	},
});
</script>
