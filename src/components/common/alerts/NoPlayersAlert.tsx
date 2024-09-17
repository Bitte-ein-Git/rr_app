import { Alert, AlertProps, Stack, Text } from "@mantine/core";

import { IconInfoCircle } from "@tabler/icons-react";

interface Props extends AlertProps {}

const NoPlayersAlert = ({ ...props }: Props) => {
	return (
		<Alert
			variant="light"
			title="No matches found"
			icon={<IconInfoCircle />}
			color="gray"
			{...props}
		>
			<Stack gap="xs">
				<Text inherit>It appears there are no players online matching the search query.</Text>
				<Text inherit>Please try a different search.</Text>
			</Stack>
		</Alert>
	);
};

export default NoPlayersAlert;
