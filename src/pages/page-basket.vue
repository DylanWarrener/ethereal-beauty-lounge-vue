<template>
    <section-container-component
        id="section-basket"
        style-container="margin-top: 64px; min-height: calc(100vh - 64px)"
        class-title="text-inverted"
        title="Basket"
    >
        <template #section-content>
            <v-container fluid style="border: 2px solid black">
                <v-row dense style="border: 2px solid red">
                    <v-col style="border: 2px solid blue">Content goes here</v-col>
                </v-row>
            </v-container>
        </template>
    </section-container-component>
</template>

<script lang="ts">
import { defineComponent } from "vue";

// Components
import SectionContainerComp from "@components/common/section/common-section.vue";

export default defineComponent({
	name: "basket-page-container-component",
    components: {
		"section-container-component": SectionContainerComp
	},
});
</script>
