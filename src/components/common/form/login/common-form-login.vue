<template>
	<v-container fluid style="border: 2px solid black">
		<v-row dense style="border: 2px solid red">
			<v-col cols="12" xl="5" style="border: 2px solid blue">
				<v-form
					class="w-100 d-flex flex-column justify-space-evenly"
					:class="`${$vuetify.display.xlAndUp ? 'align-end' : 'align-center'}`"
					v-model="data_dialogLogin.valid"
				>
					<v-text-field
						clearable
						variant="outlined"
						type="email"
						:style="dynamicWidth_dialogFormInput"
						:rules="[rules.isNotEmpty]"
					>
						<template #label>
							<span class="text-inverted">{{ data_dialogLogin.email.label }}</span>
						</template>
					</v-text-field>
					<div class="w-100 mb-1 d-flex justify-end" :style="dynamicWidth_dialogFormInput">
						<a
							class="text-decoration-none text-accent"
							href="#"
							@click="emit_handler('forgotten-password-container-component')"
						>
							Forgot the login password?
						</a>
					</div>
					<v-text-field
						clearable
						persistent-hint
						variant="outlined"
						:style="dynamicWidth_dialogFormInput"
						:hint="data_dialogLogin.password.hint"
						:type="data_dialogLogin.password.show ? 'text' : 'password'"
						:rules="[rules.isNotEmpty]"
					>
						<template #label>
							<span class="text-inverted">{{ data_dialogLogin.password.label }}</span>
						</template>
						<template #append-inner>
							<v-icon
								:icon="
									data_dialogLogin.password.show
										? data_dialogLogin.password.icon.show
										: data_dialogLogin.password.icon.hide
								"
								@click.stop="data_dialogLogin.password.show = !data_dialogLogin.password.show"
							></v-icon>
						</template>
					</v-text-field>
					<v-btn
						height="50"
						class="mt-4 px-8 bg-accent"
						:style="dynamicWidth_dialogFormInput"
						:disabled="!data_dialogLogin.valid"
						@click.stop=""
					>
						Log in
					</v-btn>
				</v-form>
			</v-col>
			<v-col cols="12" xl="2" class="d-flex" style="border: 2px solid green">
				<v-row dense class="d-flex" :class="`${$vuetify.display.xlAndUp ? 'flex-column' : 'flex-row'}`">
					<v-col class="d-flex flex-column justify-center">
						<v-divider
							vertical
							class="align-self-center"
							style="opacity: 1"
							color="accent"
							thickness="2"
							v-if="$vuetify.display.xlAndUp"
						></v-divider>
						<v-divider style="opacity: 1" color="accent" v-else></v-divider>
					</v-col>
					<v-col cols="1" xl="auto" class="d-flex flex-column justify-center">
						<small class="text-center text-inverted">OR</small>
					</v-col>
					<v-col class="d-flex flex-column justify-center">
						<v-divider
							vertical
							class="align-self-center"
							style="opacity: 1"
							color="accent"
							thickness="2"
							v-if="$vuetify.display.xlAndUp"
						></v-divider>
						<v-divider style="opacity: 1" color="accent" v-else></v-divider>
					</v-col>
				</v-row>
			</v-col>
			<v-col
				cols="12"
				xl="5"
				class="ga-4 d-flex flex-column justify-center"
				style="border: 2px solid orange"
				:class="`${$vuetify.display.xlAndUp ? 'align-start' : 'align-center'}`"
			>
				<v-btn
					variant="outlined"
					class="px-8 bg-transparent"
					height="50"
					:style="dynamicWidth_dialogFormInput"
					:key="index"
					v-for="(btn, index) in data_dialogLogin.btn"
					@click.stop=""
				>
					<template v-slot:prepend>
						<v-icon class="mr-4">
							<template #default>
								<v-img :src="btn.icon"></v-img>
							</template>
						</v-icon>
					</template>
					<template v-slot:default>
						<span class="text-inverted">{{ btn.text }}</span>
					</template>
				</v-btn>
			</v-col>
			<v-col class="pa-2">
				<p class="d-flex justify-center text-button font-weight-bold">
					<a
						class="pa-2 text-decoration-none text-inverted"
						href="#"
						@click="emit_handler('create-account-container-component')"
					>
						Create an account?
					</a>
				</p>
			</v-col>
		</v-row>
	</v-container>
</template>

<script lang="ts">
import { defineComponent } from "vue";

// Icons
import GoogleIcon from "@assets/svg/authentication/google.svg";
import { iconsFormPassword } from "@constants/common/objects/common-constants-objects.js";

export default defineComponent({
	name: "login-container-component",
	data() {
		return {
			data_dialogLogin: {
				valid: false,
				email: {
					label: "Email address",
				},
				password: {
					show: false,
					icon: {
						show: iconsFormPassword.show,
						hide: iconsFormPassword.hide,
					},
					label: "Password",
					hint: "At least 8 characters.",
				},
				btn: {
					google: {
						text: "Continue with Google",
						icon: GoogleIcon,
					},
				},
			},
			rules: {
				isNotEmpty: (value: string) => !!value || "A value must be entered.",
			},
		};
	},
	computed: {
		/* CSS */
		dynamicWidth_dialogFormInput(): string {
			let retVal: string = "width: 100%; max-width: 400px";
			return retVal;
		},
		dynamicMaxWidth_dialog(): string {
			let retVal: string = "";
			if (this.$vuetify.display.mdAndUp) retVal = "50%";
			return retVal;
		},
		dynamicWidth_dialogBtn(): string {
			let retVal: string = "200";
			if (this.$vuetify.display.mdAndUp) retVal = "250";
			if (this.$vuetify.display.lgAndUp) retVal = "300";
			return retVal;
		},
		dynamicHeight_dialogBtn(): string {
			let retVal: string = "50";
			return retVal;
		},
	},
	methods: {
		emit_handler(value: string): void {
			this.$emit("change", value);
		},
	},
});
</script>
