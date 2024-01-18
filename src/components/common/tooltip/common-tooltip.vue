<template>
	<v-tooltip v-model="tooltipOpen">
		<template #activator="{ props }">
			<v-btn variant="text" :id="id" :class="classBtn" :icon="icon" v-bind="props" @click.left="drawerClickHander"></v-btn>
		</template>
		<span>{{ tooltip }}</span>
	</v-tooltip>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
	name: 'tooltip-container-component',
	props: {
		id: { type: String, required: false },
		classBtn: { type: String, required: false },
		icon: { type: String, required: true },
		tooltip: { type: String, required: false },
		tooltipOpened: { type: Boolean, required: true },
	},
	data() {
		return {
			tooltipOpen: false,
		};
	},
	methods: {
		drawerClickHander(): void {
			this.$emit('toggle-drawer');
		},
	},
});
</script>
