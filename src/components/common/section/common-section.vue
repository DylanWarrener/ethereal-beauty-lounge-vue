<template>
    <v-container fluid style="border: 4px solid red">
        <v-row dense style="border: 4px solid green">
            <v-col cols="12" style="border: 4px solid blue">
                <h2 style="border: 4px solid purple">{{ title }}</h2>
            </v-col>
            <v-col cols="12" style="border: 4px solid black">

            </v-col>
        </v-row>
    </v-container>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
	name: "section-container-component",
    props: {
        title: { type: String, required: true }
    }
});
</script>