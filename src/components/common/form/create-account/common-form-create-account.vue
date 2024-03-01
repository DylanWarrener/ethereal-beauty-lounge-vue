<template>
	<v-container fluid style="border: 2px solid black">
		<v-row dense style="border: 2px solid red">
			<v-col cols="12">
				<p class="pa-4 text-center flex-wrap text-inverted">
					By creating an account, you agree to our Terms of Service and have read and understood the Privacy
					Policy.
				</p>
			</v-col>
			<v-col class="pa-2">
				<p class="d-flex justify-center text-button font-weight-bold">
					<a class="pa-2 text-decoration-none text-inverted" href="#"> Back to login? </a>
				</p>
			</v-col>
		</v-row>
	</v-container>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
	name: "create-account-container-component",
});
</script>
