import {
	ActionIcon,
	AspectRatio,
	Box,
	Button,
	Group,
	GroupProps,
	Image,
	Text,
	useComputedColorScheme,
	useMantineTheme,
} from "@mantine/core";
import { IconCopy, IconCopyCheck, IconInfoCircle } from "@tabler/icons-react";

import { Player } from "@/lib/types";
import Rating from "./Rating";
import { notifications } from "@mantine/notifications";
import { useClipboard } from "@mantine/hooks";
import useMii from "@/lib/hooks/queries/useMii";

interface Props extends Omit<GroupProps, "children"> {
	player: Player;
	filled: boolean;
}

const RoomPlayersItem = ({ player, filled, ...props }: Props) => {
	const theme = useMantineTheme();
	const computedColorScheme = useComputedColorScheme("light", { getInitialValueInEffect: true });

	const clipboard = useClipboard({ timeout: 2400 });

	const { url } = useMii(player);

	const handleCopyToClipboard = (type: string, value: string) => {
		clipboard.copy(value);
		notifications.clean();
		notifications.show({
			title: `Copied ${type}`,
			message: `Copied ${value} to clipboard.`,
			autoClose: 2000,
			withBorder: true,
		});
	};

	const hasName: boolean = !player.name.trim() || player.name === "no name";

	return (
		<Group
			px="md"
			py="sm"
			bg={filled ? (computedColorScheme === "light" ? theme.colors.gray[0] : theme.colors.dark[6]) : undefined}
			align="center"
			{...props}
		>
			{url && (
				<AspectRatio>
					<Image
						h={42}
						mt={-4}
						mr={-12}
						src={url}
						alt={`${player.name}'s mii`}
					/>
				</AspectRatio>
			)}
			<Box style={{ flexGrow: 1 }}>
				<Text
					fs={hasName ? "italic" : undefined}
					fw={600}
					truncate="end"
					c={hasName ? "dimmed" : undefined}
				>
					{hasName ? "No name found" : player.name}
				</Text>
				<Button
					variant="transparent"
					px={0}
					size="compact-xs"
					color="gray"
					fw={400}
					rightSection={clipboard.copied ? <IconCopyCheck size={12} /> : <IconCopy size={12} />}
					onClick={() => handleCopyToClipboard("friend code", player.fc)}
				>
					{player.fc}
				</Button>
			</Box>
			{!player.ev ? (
				<ActionIcon
					variant="subtle"
					size="lg"
					color="gray"
				>
					<IconInfoCircle />
				</ActionIcon>
			) : (
				<Rating values={[`${player.ev} VR`, `${player.eb} BR`]} />
			)}
		</Group>
	);
};

export default RoomPlayersItem;
