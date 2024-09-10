import { Badge, BadgeProps } from "@mantine/core";

import styles from "./Badge.module.css";

interface Props extends Omit<BadgeProps, "children"> {
	mode: string;
}

const RoomModeBadge = ({ mode, ...props }: Props) => {
	return (
		<Badge
			classNames={styles}
			variant="light"
			radius="sm"
			py="sm"
			autoContrast
			{...props}
		>
			{mode}
		</Badge>
	);
};

export default RoomModeBadge;
