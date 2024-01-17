export const convertArrayToObjectCondensed = (array: Array<any>, key: string) => {
	const initialValue = {};

	return array.reduce((objectForInserts: any, objectForUse: any) => {
		const title: string = objectForUse[key];
		const titleLowercased: string = objectForUse[key].toLowerCase();

		if (title === "" || title === "" || title === "") {
			return {
				...objectForInserts,
				[titleLowercased]: objectForUse,
			};
		}
	}, initialValue);
};
