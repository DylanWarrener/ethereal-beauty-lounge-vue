<template>
    <v-card elevation="0" class="h-100 d-flex" style="border: 2px solid green">
        <v-container fluid style="border: 2px solid black">
            <v-row dense style="border: 2px solid red">
                <v-col cols="12" style="border: 2px solid blue">
                    <!-- Avatar -->
                    <v-img></v-img>
                </v-col>
            </v-row>
        </v-container>
    </v-card>
</template>

<script lang="ts">
import { defineComponent } from "vue";


export default defineComponent({
	name: "uncommon-account-profile-component"
});
</script>
