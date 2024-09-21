import { Badge, BadgeProps } from "@mantine/core";
import { IconLock, IconLockOpen } from "@tabler/icons-react";

import styles from "./Badge.module.css";

interface Props extends Omit<BadgeProps, "children"> {
	locked?: boolean;
}

const RoomTypeBadge = ({ locked = false, ...props }: Props) => {
	const Icon = locked ? IconLock : IconLockOpen;

	return (
		<Badge
			classNames={styles}
			variant="light"
			radius="sm"
			pl={30}
			py="sm"
			color={locked ? "red" : "green"}
			autoContrast
			leftSection={<Icon size={14} />}
			{...props}
		>
			{locked ? "Private" : "Public"}
		</Badge>
	);
};

export default RoomTypeBadge;
