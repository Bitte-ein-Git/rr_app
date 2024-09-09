import { Box, Group, Paper, PaperProps, Text } from "@mantine/core";

import React from "react";
import styles from "./CompoundInput.module.css";

interface Props extends PaperProps {
	children: React.ReactNode;
	description: string;
	label: string;
	onClick?: React.MouseEventHandler<HTMLDivElement> | undefined;
}

const CompoundInput = ({ children, description, label, onClick, ...props }: Props) => {
	return (
		<Paper
			className={styles.root}
			onClick={onClick}
			{...props}
		>
			<Group
				className={styles.layout}
				justify="space-between"
				align="center"
			>
				<Box style={{ flexGrow: 1 }}>
					<Text fw={600}>{label}</Text>
					<Text
						size="xs"
						c="dimmed"
					>
						{description}
					</Text>
				</Box>
				<Box className={styles.input}>{children}</Box>
			</Group>
		</Paper>
	);
};

export default CompoundInput;
