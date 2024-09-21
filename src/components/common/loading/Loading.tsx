import { Loader, Stack, StackProps, Text } from "@mantine/core";

interface Props extends StackProps {}

const Loading = ({ children, ...props }: Props) => {
	return (
		<Stack
			mt="xl"
			justify="center"
			align="center"
			gap="lg"
			{...props}
		>
			<Loader
				type="dots"
				size="xl"
			/>
			<Text
				ta="center"
				c="dimmed"
			>
				{children}
			</Text>
		</Stack>
	);
};

export default Loading;
