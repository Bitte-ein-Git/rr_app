import { Loader, Stack, Text } from "@mantine/core";

const Loading = () => {
	return (
		<Stack h="100dvh" w="100vw" pos="fixed" top={0} left={0} justify="center" align="center" gap="lg">
			<Loader type="dots" size="xl" />
			<Text ta="center" c="dimmed">
				Fetching rooms..
			</Text>
		</Stack>
	);
};

export default Loading;
