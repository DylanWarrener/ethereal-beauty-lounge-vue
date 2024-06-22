<template>
	<v-form
		validate-on="input lazy"
		@submit.prevent="$emit('submit')"
	>
		<v-container fluid class="d-flex flex-column">
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
