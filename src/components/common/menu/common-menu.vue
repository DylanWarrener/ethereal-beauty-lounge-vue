<template>
	<v-menu :location="location" :transition="transition">
		<template #activator="{ props }">
			<v-btn :class="classBtn" :prepend-icon="prependIcon" :append-icon="icon" v-bind="props">
				{{ txtBtn }}
			</v-btn>
		</template>
		<v-list>
			<v-list-item>Item</v-list-item>
		</v-list>
	</v-menu>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
	name: "menu-container-component",
	props: {
		classBtn: { type: String, required: false },
		location: { type: String, required: false, default: "bottom" },
		transition: { type: String, required: false, default: "slide-y-transition" },
		prependIcon: { type: String, required: false },
		appendIcon: { type: String, required: false },
		txtBtn: { type: String, required: true },
	},
});
</script>
