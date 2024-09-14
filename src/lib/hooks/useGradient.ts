import { useComputedColorScheme, useMantineTheme } from "@mantine/core";

const useGradient = (): { from: string; to: string } => {
	const theme = useMantineTheme();
	const computedColorScheme = useComputedColorScheme("light", { getInitialValueInEffect: true });

	const colors = Object.keys(theme.colors).slice(2);
	const primaryShade = (theme.primaryShade as { light: number; dark: number })[computedColorScheme];

	const primaryColorIndex = colors.indexOf(theme.primaryColor);

	return {
		from: theme.colors[theme.primaryColor][primaryShade],
		to: theme.colors[primaryColorIndex === colors.length - 1 ? colors[0] : colors[primaryColorIndex + 1]][primaryShade],
	};
};

export default useGradient;
