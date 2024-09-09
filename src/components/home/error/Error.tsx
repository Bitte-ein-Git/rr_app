import { Button, Image, Stack, StackProps, Text } from "@mantine/core";
import { QueryObserverResult, RefetchOptions } from "@tanstack/react-query";

import { IconReload } from "@tabler/icons-react";
import { Room } from "@/lib/types";
import { useState } from "react";

interface Props extends Omit<StackProps, "children"> {
	refetch: (options?: RefetchOptions) => Promise<QueryObserverResult<Room[], Error>>;
}

const Error = ({ refetch, ...props }: Props) => {
	const [retries, setRetries] = useState<number>(0);

	const handleRetryClick = () => {
		refetch();
		setRetries(retries => retries + 1);
	};

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
			<Image
				w="60vw"
				maw={512}
				src="/undraw_bug.svg"
				alt="Error"
			/>
			<Text
				ta="center"
				c="dimmed"
			>
				We encountered an issue fetching the rooms.
			</Text>
			<Text
				ta="center"
				c="dimmed"
			></Text>
			{retries > 2 && (
				<Text
					ta="center"
					c="dimmed"
				>
					It appears there is an ongoing network issue, please try again later.
				</Text>
			)}
			<Button
				variant="light"
				leftSection={<IconReload size={18} />}
				onClick={handleRetryClick}
			>
				Retry
			</Button>
		</Stack>
	);
};

export default Error;
