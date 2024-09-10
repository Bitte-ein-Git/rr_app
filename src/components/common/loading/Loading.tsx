import { Loader, Stack, StackProps, Text } from "@mantine/core";

interface Props extends StackProps {}

const Loading = ({ children, ...props }: Props) => {
	return (
		<Stack
			h="100dvh"
			w="100vw"
			pos="fixed"
			top={0}
			left={0}
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
