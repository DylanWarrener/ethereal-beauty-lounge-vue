<template>
	<dialog-container-component :dialog-state="data_dialogLoginDrawerState">
		<template #dialog-content>
			<card-container-component title-class="text-h2" subtitle-class="text-h3">
				<template #card-header>
					<v-toolbar color="accent" style="position: sticky; z-index: 1">
						<v-spacer></v-spacer>
						<tooltip-container-component
							location="bottom"
							:id="id_dialogCloseBtn"
							:icon="icon_dialogCloseBtn"
							:tooltip="tooltip_dialogCloseBtn"
							@toggle-tooltip-drawer-state="toggleTooltipDrawerState"
							@toggle-drawer-state="data_dialogLoginDrawerState = false"
						></tooltip-container-component>
					</v-toolbar>
				</template>
				<template #card-title>Log In</template>
				<template #card-subtitle>Sign in with Google or Email, to save your preferences; including health forms, bank details and more.</template>
				<template #card-content>
					<v-btn class="bg-blue" variant="text" color="accent">Log in with Google</v-btn>
					<v-btn class="bg-blue" variant="text" color="accent">Log in with Email</v-btn>
				</template>
			</card-container-component>
		</template>
	</dialog-container-component>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

// Stores
import { useCommonStore } from '@plugins/pinia/pinia.js';

// Components
import DialogContainerComp from '@components/common/dialog/common-dialog.vue';
import CardContainerComp from '@components/common/card/common-card.vue';
import TooltipContainerComp from '@components/common/tooltip/common-tooltip.vue';

// Interfaces
import { IDialogDefaultState, IDialogLoginState } from '@declarations/common/dialog/interfaces/common-interface-dialog.js';

// Enums
import { ElementIDs } from '@enums/enums.js';

export default defineComponent({
	name: 'dialog-component',
	components: {
		'dialog-container-component': DialogContainerComp,
		'card-container-component': CardContainerComp,
		'tooltip-container-component': TooltipContainerComp,
	},
	computed: {
		/* Text */
		// IDs
		id_dialogCloseBtn(): string {
			return ElementIDs.DIALOG_LOGIN_CLOSE_BTN;
		},
		// Tags
		tag_dialogTitle(): string {
			let retVal: string = '';
			switch (this.$vuetify.display.name) {
				case 'xs':
				case 'sm':
					retVal = 'h4';
					break;
				case 'md':
				case 'lg':
				case 'xl':
				case 'xxl':
					retVal = 'h3';
					break;
			}
			return retVal;
		},
		// Tooltips
		tooltip_dialogCloseBtn(): string {
			return this.data_dialogDefaultState.icons.close.tooltip;
		},

		/* Icons */
		icon_dialogCloseBtn(): string {
			return this.data_dialogDefaultState.icons.close.icon;
		},

		/* CSS */
		css_dialogTitle(): string {
			let retVal: string = '';
			switch (this.$vuetify.display.name) {
				case 'xs':
				case 'sm':
					retVal = 'd-flex d-md-none text-h4';
					break;
				case 'md':
				case 'lg':
				case 'xl':
				case 'xxl':
					retVal = 'd-none d-md-flex text-h3';
					break;
			}
			return retVal;
		},

		/* Data */
		// Read only
		data_dialogDefaultState(): IDialogDefaultState {
			return this.storeCommon.getDialogDefaultState;
		},
		data_dialogLogin(): IDialogLoginState {
			return this.storeCommon.getDialogLoginState;
		},
		// Read & Write
		data_dialogLoginDrawerState: {
			get(): boolean {
				return this.storeCommon.getDialogLoginDrawerState;
			},
			set(newValue: boolean): void {
				this.storeCommon.setDialogLoginDrawerState(newValue);
			},
		},
	},
	methods: {
		toggleTooltipDrawerState(newValue: boolean): void {
			this.storeCommon.setDialogLoginBtnCloseTooltipDrawerState(newValue);
		},
	},
	setup() {
		const storeCommon = useCommonStore();
		return { storeCommon };
	},
});
</script>
