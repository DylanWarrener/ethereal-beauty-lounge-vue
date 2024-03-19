<template>
	<v-list nav>
		<v-list-item :key="index" v-for="(item, index) in items">
			<span class="text-uppercase" v-text="item."></span>
		</v-list-item>
	</v-list>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
	name: "list-container-component",
	props: ["items"]
});
</script>
