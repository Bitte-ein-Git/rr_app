import { Alert, AlertProps, Stack, Text } from "@mantine/core";

import { IconAlertCircle } from "@tabler/icons-react";

interface Props extends AlertProps {}

const ServerUnreachableAlert = ({ ...props }: Props) => {
	return (
		<Alert
			variant="light"
			title="Server error"
			icon={<IconAlertCircle />}
			color="red"
			{...props}
		>
			<Stack gap="xs">
				<Text inherit>It appears that Retro Rewind is unavailable. It may be undergoing maintenance.</Text>
				<Text inherit>Please check back in again soon.</Text>
			</Stack>
		</Alert>
	);
};

export default ServerUnreachableAlert;
