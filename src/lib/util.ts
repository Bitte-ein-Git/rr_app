export const average = (values: number[]): number => {
	if (values.length === 0) return 0;

	return values.reduce((a, b) => a + b, 0) / values.length;
};

// Modified version of Papi and Peter Mortensen's SO answer (https://stackoverflow.com/a/54037351)
export const base64ToBlob = (str: string) =>
	new Blob([
		Uint8Array.from(
			atob(str)
				.split("")
				.map(c => c.charCodeAt(0))
		),
	]);
