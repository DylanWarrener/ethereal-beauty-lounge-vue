<template>
	<v-card elevation="0" class="h-100 bg-accent" style="border: 2px solid green">
		<v-container fluid style="border: 2px solid black">
			<v-row dense style="border: 2px solid red">
				<!-- Title -->
				<v-col style="border: 2px solid orange">
					<h3>Notifications</h3>
				</v-col>

				<v-col cols="12" style="border: 2px solid orange">
					<span>Email preferences</span>
				</v-col>
				<v-col cols="12" style="border: 2px solid orange">
					<v-switch density="compact" color="default">
						<template v-slot:label>
							<span class="text-default">Enable treatment updates</span>
						</template>
					</v-switch>
				</v-col>
				<v-col cols="12" style="border: 2px solid orange">
					<v-switch density="compact" color="default">
						<template v-slot:label>
							<span class="text-default">Enable product/store updates</span>
						</template>
					</v-switch>
				</v-col>
				<v-col cols="12" style="border: 2px solid orange">
					<v-switch density="compact" color="default">
						<template v-slot:label>
							<span class="text-default">Enable promotions</span>
						</template>
					</v-switch>
				</v-col>
				<v-col cols="12" style="border: 2px solid orange">
					<v-switch density="compact" color="default">
						<template v-slot:label>
							<span class="text-default">Unsubscribe to all</span>
						</template>
					</v-switch>
				</v-col>
			</v-row>
		</v-container>
		<v-card-actions class="pa-4">
			<v-spacer></v-spacer>
			<v-btn variant="outlined">Save</v-btn>
		</v-card-actions>
	</v-card>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
	name: "uncommon-account-notifications-component",
});
</script>
