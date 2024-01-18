<template>
	<v-dialog transition="dialog-top-transition" width="auto" v-model="loginDrawer">
		<v-card>
			<v-toolbar color="accent">
				<img-container-component style-container="width: 200px"></img-container-component>
				<tooltip-container-component
					location="bottom"
					:id="IDDialogCloseBtn"
					:icon="appBarIcons.menu.icon"
					:tooltip="appBarIcons.menu.tooltip"
					:tooltip-opened="appBarIcons.menu.showTooltip"
					@toggle-drawer="menuDrawer = !menuDrawer"
				></tooltip-container-component>
			</v-toolbar>
			<v-card-text>
				<div class="text-h2 pa-12">Hello world!</div>
			</v-card-text>
			<v-card-actions class="justify-end">
				<v-btn variant="text" @click.left="loginDrawer = !loginDrawer">Close</v-btn>
			</v-card-actions>
		</v-card>
	</v-dialog>
</template>

<script lang="ts">
/*
<dialog-container-component>
		<template #btn>
			<template></template>
		</template>
		<tooltip-container-component
			location="bottom"
			class-btn="d-none d-sm-flex"
			:id="IDAppbarLoginBtn"
			:icon="appBarIcons.login.icon"
			:tooltip="appBarIcons.login.tooltip"
			:tooltip-opened="appBarIcons.login.showTooltip"
			@toggle-drawer="loginDrawer = !loginDrawer"
		></tooltip-container-component>
	</dialog-container-component>
*/
import { defineComponent } from 'vue';

// Stores
import useHeaderStore from '@stores/store-header.js';

// Components
import DialogContainerComp from '@components/common/dialog/common-dialog.vue';
import ImgComp from '@components/common/img/common-img.vue';

// Enums
import { ElementIDs } from '@enums/enums.js';

export default defineComponent({
	name: 'dialog-component',
	components: {
		'dialog-container-component': DialogContainerComp,
		'img-container-component': ImgComp,
		'tooltip-container-component': TooltipComp,
	},
	computed: {
		// IDs
		IDDialogCloseBtn(): string {
			return ElementIDs.DIALOG_LOGIN_CLOSE_BTN;
		},

		// Data

		// Conditional
		loginDrawer: {
			get(): boolean {
				return this.storeHeader.getAppBarLoginDrawer;
			},
			set(newValue: boolean): void {
				this.storeHeader.setAppBarLoginDrawer(newValue);
			},
		},
	},
	setup() {
		const storeHeader = useHeaderStore();
		return { storeHeader };
	},
});
</script>
