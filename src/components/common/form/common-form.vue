<template>
	<v-form validate-on="input lazy" class="w-100 h-100 d-flex flex-column justify-center">
		<v-container fluid class="pa-1 d-flex flex-column">
			<slot name="form-content"></slot>
		</v-container>
	</v-form>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
	name: "form-container-component",
});
</script>
