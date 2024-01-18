<template>
	<v-dialog transition="dialog-top-transition" width="auto">
		<template #:activator="{ props }">
			<v-btn variant="text" v-bind="props">From the top</v-btn>
		</template>
		<template #:default="{ isActive }">
			<v-card>
				<v-toolbar color="primary" title="Opening from the top"></v-toolbar>
				<v-card-text>
					<div class="text-h2 pa-12">Hello world!</div>
				</v-card-text>
				<v-card-actions class="justify-end">
					<v-btn variant="text" @click="isActive.value = false">Close</v-btn>
				</v-card-actions>
			</v-card>
		</template>
	</v-dialog>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
	name: 'dialog-component',
});
</script>
