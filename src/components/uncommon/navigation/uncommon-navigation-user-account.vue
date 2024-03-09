<template>
    <v-navigation-drawer rail expand-on-hover location="right" v-model="">
        <v-list>
          <v-list-item
            prepend-avatar="https://randomuser.me/api/portraits/women/85.jpg"
            title="Sandra Adams"
            subtitle="sandra_a88@gmailcom"
          ></v-list-item>
        </v-list>

        <v-divider></v-divider>

        <v-list nav density="compact">
          <v-list-item prepend-icon="mdi-folder" title="My Files" value="myfiles"></v-list-item>
          <v-list-item prepend-icon="mdi-account-multiple" title="Shared with me" value="shared"></v-list-item>
          <v-list-item prepend-icon="mdi-star" title="Starred" value="starred"></v-list-item>
        </v-list>
      </v-navigation-drawer>
    </v-navigation-drawer>
</template>

<script lang="ts">
import { defineComponent } from "vue";

// Stores
import { useCommonStore } from "@plugins/pinia/pinia.js";

export default defineComponent({
    name: "navigation-user-account-component",
    data() {
        return {
            user: {}
        };
    },
    computed: {
        isUserLoggedIn(): boolean {
            debugger;
            return this.storeCommon.isUserLoggedIn;
        }
    },
    setup() {
		return { 
            storeCommon: useCommonStore()
        };
	}
});
</script>