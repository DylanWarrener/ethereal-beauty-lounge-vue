export default interface IAccountProfileState {
	displayName: string | null;
	title: string | null;
	firstname: string | null;
	lastname: string | null;
	email: string | null;
	phoneNumber: string | null;
	photoURL: string | null;
}

export interface IAccountProfileData {
	profile: {
		title: string;
		icon: {
			editImage: {
				tooltip: string;
			};
		};
		input: {
			displayName: {
				label: string;
				value: string | null;
			};
			firstname: {
				label: string;
				value: string | null;
			};
			lastname: {
				label: string;
				value: string | null;
			};
			email: {
				label: string;
				value: string | null;
			};
			phoneNumber: {
				label: string;
				value: number | null;
			};
		};
		actions: {
			btn: {
				save: {
					text: string;
					isLoading: boolean;
				};
			};
		};
	};
}
