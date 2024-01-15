<template>
	<v-layout>
		<header-component></header-component>
		<v-main>
			<router-view></router-view>
		</v-main>
		<footer-component></footer-component>
	</v-layout>
</template>

<script lang="ts">
import { defineComponent } from "vue";

// Components
import HeaderComp from "@components";

export default defineComponent({
	name: "app-component",
	components: {
		"header-component": HeaderComp,
	},
});
</script>
